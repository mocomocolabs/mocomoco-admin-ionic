// 로그인을 한 사람에 대한 정보를 모아두는 스토어.
import Inko from 'inko'
import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up'
import { api } from '../services/api-service'
import { route } from '../services/route-service'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { IAuthUser, IAuthUserDto, ICommunityInfoDto, SignInTask, SignUpTask } from './auth-store.d'
import { TaskByString } from './task'

const inko = new Inko()

const initState = {
  signUpForm: {
    locale: 'ko_KR',
    roles: 'ROLE_USER',
  } as Partial<ISignUpForm>,
  user: {} as IAuthUser,
  isAdmin: true,
  communityInfo: {} as ICommunityInfoDto,
}

export class Auth {
  @observable.struct signUpForm: Partial<ISignUpForm> = initState.signUpForm
  @observable isLogin = false
  @observable.struct user: IAuthUser = initState.user
  @observable isAdmin = false
  @observable communityInfo = initState.communityInfo

  // constructor() {
    // 매번 지어질때마다 호출되는 함수들을 넣는 자리인가봄.
  // }

  @action
  setIsLogin() {
    console.log('로그인에성공')
    this.isLogin = true
  }

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
        api.post<IAuthUserDto>(`/auth/sign-out`, {})
      } catch (e) {
        // TODO: 에러코드 서버와 협의 필요
        // 실패시 얼럿을 띄운다.
        if (e.status === 405) {
        }
      }
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

  // 매 호출마다, 새로고침할 때마다
  @action
  async signInWithToken() {
    const hasToken = await storage.getAccessToken()
    console.log('access token이 있는지 확인*************', hasToken)

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      try {
        await api.get<IAuthUserDto>(`/auth/account`).then(async (user) => {
          await this.checkAdmin(user)
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
          api.post<IAuthUserDto>(`/auth/refresh-token`, {}).then((user) => {
            this.setAuth(user)
          })
        }
      }
    }
  }

  // 마을 일정 가져오기 테스트
  // http://localhost:8080/api/v1/clubs?community-id=1
  @action
  async getTownEvent() {
    await http.get(`/v1/clubs?community-id=1`)
    .then((res) => {
      console.log('get Town Event::', res);
    })
  }

  // 로그인 페이지에서 사용. 이메일과 비번을 보내면 인증정보와 개인 정보를 저장.
  @task.resolved
  signIn = (async (email: string, password: string) => {
    console.log('$auth.signIn ===> ', email, password, inko.ko2en(password))
    this.isAdmin = false
    try {
      await api.post<IAuthUserDto>(`/auth/sign-in`, {
          email,
          password: inko.ko2en(password),
        })
        .then(async (user: IAuthUserDto) => {
          // accessToken, refreshToken이 set이 되어야 api-service.setAuthoriationBy() 가 호출되고 그 이후에 api.get을 사용할 수 있음.
          this.setAuth(user)
          this.setUser(user)
          await this.checkAdmin(user)
        })
    } catch (e) {
      console.log('erros')
    }
  }) as SignInTask

  // 어드민 체크(로그인시, 매 호출시, 새로고침 시)
  @task.resolved
  checkAdmin = async (user: IAuthUserDto) => {
    const { communities, id } = user
    await api.get<ICommunityInfoDto>(`/v1/communities/${communities[0].id}`) // ex) https://hama.network/api/v1/communities/1
      .then((communityInfo: ICommunityInfoDto) => {
        if (communityInfo.users.find(a => a.id === id)?.roles.includes('ROLE_ADMIN')) {
          console.log('----------------세상에, 당신은 어드민이군요?! ---------------')
          this.isAdmin = true
          this.setCommunityInfo(communityInfo)
        } else {
          console.log('---------------- 당신은 어드민이 아님 -------------------- ')
          route.signIn()
          this.isAdmin = false
          return
        }
      })
  }

  // 권한 셋: ID와 비번이 일치하면 권한(accessToken, refreshToken) 셋
  @action
  setAuth(user: IAuthUserDto) {
    // if (!this.getIsAdmin) return // 이게 없으면 화면에서는 튕긴 것 같지만 권한을 셋함.
    const { accessToken, refreshToken } = user
    console.log('권한셋 setAuth ===> ', 'accessToken:', accessToken, 'refreshToken:', refreshToken)

    storage.setAccessToken(accessToken)
    storage.setRefreshToken(refreshToken)
    api.setAuthoriationBy(accessToken)
  }

  // 유저셋: ID와 비번이 일치했을 시, 매 호출시 user 정보를 담고 로그인 상태 = true로 바꾼다.
  @action
  setUser(user: IAuthUserDto) {
    // if (!this.getIsAdmin) return
    const { id, email, name, status, nickname, profileUrl, communities, locale, roles, isUse } = user
    console.log('유저셋 $auth.setUser ====> ', user)

    this.user = {
      id,
      email,
      name,
      nickname,
      profileUrl,
      status,
      communities: communities.map((v) => ({
        id: v.id,
        name: v.name,
        adminUsers: v.adminUsers,
        users: v.users,
        atchFiles: v.atchFiles,
        isUse: v.isUse,
        // count: v.count,
        // bannerUrl: v.atchFiles?.slice(-1)?.pop()?.url,
      })),
      locale,
      roles,
      isUse,
    }
    
    this.setIsLogin()
  }

  @action
  setCommunityInfo(communityInfo: ICommunityInfoDto) {
    console.log('communityInfo:: ', communityInfo)
    const { userCount, createdAt, name, locale, id, users, adminUsers, atchFiles } = communityInfo
    this.communityInfo = {
      id,
      name,
      locale,
      userCount,
      users,
      createdAt,
      adminUsers,
      atchFiles,
    }
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

  @computed
  get getAuthInfo() {
    // const hasToken = storage.getAccessToken()

    // if (!hasToken) return
    // else return this.user
    return this.user
  }

  @computed
  get getIsAdmin() {
    return this.isAdmin
  }

  @computed
  get getCommunityInfo() {
    return this.communityInfo
  }
}
