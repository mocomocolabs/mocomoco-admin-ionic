import Inko from 'inko'
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up'
import { api } from '../services/api-service'
import { route } from '../services/route-service'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { IAuthUser, IAuthUserDto, SignInTask, SignUpTask } from './auth-store.d'
import { TaskByString } from './task'

const inko = new Inko()

const initState = {
  signUpForm: {
    locale: 'ko_KR',
    roles: 'ROLE_USER',
  } as Partial<ISignUpForm>,
  user: {} as IAuthUser,
}

export class Auth {
  @observable.struct signUpForm: Partial<ISignUpForm> = initState.signUpForm
  @observable isLogin = false
  @observable.struct user: IAuthUser = initState.user

  constructor() {}

  @action
  setIsLogin() {
    console.log('로그인에성공')

    this.isLogin = true
  }

  // 로그인 페이지를 보기 위해서 임시로 만든 것.
  @action
  setIsNotLogin() {
    this.isLogin = false
  }

  @action
  async logout() {
    const hasToken = await storage.getAccessToken()

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      try {
        api.post<IAuthUserDto>(`http://localhost:8080/api/auth/sign-out`, {})
      } catch (e) {
        // TODO: 에러코드 서버와 협의 필요
        // 실패시 얼럿을 띄운다.
        if (e.status === 405) {
        }
      }
      console.log('여기서 찍히는데 this를 읽어들이지 못함.', this)
      // this.setIsNotLogin()
      // this.user = initState.user
      route.signIn()
    }
  }

  @action
  setSignUpForm(form: Partial<ISignUpForm>) {
    this.signUpForm = {
      ...this.signUpForm,
      ...form,
    }
  }

  // sign-in시 1: access token이 있으면 user정보를 set한다.
  @action
  async signInWithToken() {
    const hasToken = await storage.getAccessToken()
    console.log('access token이 있는지 확인', hasToken)

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      try {
        await api.post<IAuthUserDto>(`http://localhost:8080/api/auth/user`, {}).then((user) => {
          this.setUser(user)
        })
      } catch (e) {
        // TODO: 에러코드 서버와 협의 필요
        // 실패시 로그인 페이지로 redirect
        // accessToken이 만료되어서 405와 같은 에러코드가 올라오면
        // refreshToken을 가져와서 세팅한다.
        if (e.status === 405) {
          const refreshToken = await storage.getRefreshToken()
          api.setAuthoriationBy(refreshToken)
          api.post<IAuthUserDto>(`http://localhost:8080/api/auth/refresh-token`, {}).then((user) => {
            this.setAuth(user)
          })
        }
      }
    }
  }

  // 로그인 페이지에서 사용. 이메일과 비번을 보내면 user 정보를 보내줌.
  @task.resolved
  signIn = (async (email: string, password: string) => {
    console.log('$auth.signIn', email, password, inko.ko2en(password))

    // postman으로 community를 생성하고 user를 생성하고서 시도하면 됨.
    await http
      .post<IAuthUserDto>(`http://localhost:8080/api/auth/sign-in`, {
        email,
        password: inko.ko2en(password),
      })
      .then((user: IAuthUserDto) => {
        this.setAuth(user)
        this.setUser(user)
      })
  }) as SignInTask

  // 권한 셋: 로그인에 성공하고 나서 권한을 셋한다.
  // user의 access token과 refresh token을 set한다.
  @action
  setAuth(user: IAuthUserDto) {
    const { accessToken, refreshToken } = user
    console.log('권한셋 setAuth', 'accessToken:', accessToken, 'refreshToken:', refreshToken)

    storage.setAccessToken(accessToken)
    storage.setRefreshToken(refreshToken)
    api.setAuthoriationBy(accessToken)
  }

  // 유저셋: 로그인에 성공하고 나서 user 정보를 this.user에 담고 로그인 상태 = true로 바꾼다.
  @action
  setUser(user: IAuthUserDto) {
    const { id, email, name, nickname, profileUrl, communities } = user
    console.log('유저셋 $auth.setUser', user)

    this.user = {
      id,
      email,
      name,
      nickname,
      profileUrl,
      communities: communities.map((v) => ({
        id: v.id,
        name: v.name,
        // TODO: 추가필요
        // count: v.count,
        bannerUrl: v.atchFiles?.slice(-1)?.pop()?.url,
      })),
    }

    this.setIsLogin()
  }

  @task.resolved
  checkEmail = (async (email) => {
    return http.post(`http://localhost:8080/api/sys/users/exists`, { email })
  }) as TaskByString

  // sign-up은 어드민에서 지원 하지 않음.
  // 추후 삭제하거나 주석처리
  @task.resolved
  signUp = (async (form: any) => {
    // TODO: 서버팀과 논의후 제거 결정
    const param = { ...form }
    param.fcmToken = '_'
    param.profileUrl = '_'
    param.mobile = '0'
    //

    delete param.rePassword

    param.password = inko.ko2en(param.password!)
    if (!param.nickname) {
      param.nickname = param.name
    }

    await http.post(`http://localhost:8080/api/auth/sign-up`, param).then((r) => {
      console.log(r)
    })
  }) as SignUpTask
}
