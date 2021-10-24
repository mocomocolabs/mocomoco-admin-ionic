import Inko from 'inko'
import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up'
import { api } from '../services/api-service'
import { route } from '../services/route-service'
import { storage } from '../services/storage-service'
import { http } from '../utils/http-util'
import { isOfType } from '../utils/type-util'
import { IAuthUser, IAuthUserDto, SignInTask } from './auth-store.d'
import { ICommunityInfoDto } from './community-store.d'
import { TaskBy } from './task'

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

  @action
  setIsLogin(isLogin: boolean) {
    this.isLogin = isLogin
    
    if(isLogin) route.home()
    else route.signIn()
  }

  @action
  setIsAdmin(isAdmin: boolean) {
    this.isAdmin = isAdmin
    
    if(isAdmin) route.home()
    else route.signIn()
  }

  @task.resolved
  logOut = (async() => {
    const hasToken = await storage.getAccessToken()
    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      api.post<IAuthUserDto>(`/auth/sign-out`)
      await storage.clear()
      api.setAuthoriationBy('')
      this.setIsLogin(false)
      this.setUser({} as IAuthUser)
    }
  }) as TaskBy<void>

  @action
  setSignUpForm(form: Partial<ISignUpForm>) {
    this.signUpForm = {
      ...this.signUpForm,
      ...form,
    }
  }

  @action 
  signInCallback = async (user: IAuthUserDto, ignoreAuth?: boolean) => {
    console.log('signInCallback', user);
    !ignoreAuth && (await this.setAuth(user));
    this.setUser(user); 
    await this.checkAdmin(user);
    this.setIsLogin(true);
  }

  // 매 호출마다, 새로고침할 때마다. 왜 2번씩인지 확인 필요하다.
  @action
  async signInWithToken() {
    const hasToken = await storage.getAccessToken()
    console.log('🚀 token')

    if (hasToken) {
      api.setAuthoriationBy(hasToken)
      try {
        await api
          .get<IAuthUserDto>(`/auth/account`)
          .then(async (user) => await this.signInCallback(user, true))
      } catch (e) {
        if (isOfType<{ status: number }>(e, 'status') && e.status === 401) this.refreshToken();
      }
    } else {
      console.log('has no token')
      return;
    }
  }


  @action
  async refreshToken() {
    const refreshToken = await storage.getRefreshToken();
    api
      .setAuthoriationBy(refreshToken);
    api
      .post<IAuthUserDto>(`/auth/refresh-token`, {})
      .then((user) => this.setAuth(user));
  }

  // 지금 로그인 한 사람이 그 커뮤니티의 어드민인지 체크
  @task.resolved
  checkAdmin = async (user: IAuthUserDto) => {
    const { communities, id } = user
    await api.get<ICommunityInfoDto>(`/v1/communities/${communities[0].id}`)
      .then((communityInfo: ICommunityInfoDto) => {
        if (communityInfo.users.find(a => a.id === id)?.roles.includes('ROLE_ADMIN')) {
          console.log('💐 세상에, 당신은 어드민이군요?!')
          this.setIsAdmin(true)
          this.setCommunityInfo(communityInfo)
        } else {
          console.log('🙀 당신은 어드민이 아님 ')
          this.setIsAdmin(false);
          route.signIn();
          return
        }
      })
  }

  // 권한 셋: ID와 비번이 일치하면 권한(accessToken, refreshToken) 셋
  @action
  setAuth(user: IAuthUserDto) {
    const { accessToken, refreshToken } = user
    storage.setAccessToken(accessToken)
    storage.setRefreshToken(refreshToken)
    api.setAuthoriationBy(accessToken)
  }

  // 유저셋: ID와 비번이 일치했을 시, 매 호출시 user 정보를 담고 로그인 상태 = true로 바꾼다.
  @action
  setUser(user: IAuthUser) {
    const { profileAtchFiles, isPublicMobile, isPublicEmail, mobile, description, id, email, name, status, nickname, profileUrl, communities, locale, roles, isUse } = user
    console.log('!!!!!! 유저셋 $auth.setUser ====> ', user)

    this.user = {
      id,
      name,
      nickname,
      description,
      email,
      mobile,
      isPublicEmail,
      isPublicMobile,
      roles,
      status,
      profileAtchFiles,
      isUse,
      profileUrl,
      locale,
      communities: communities?.map((v) => ({
        id: v.id,
        name: v.name,
        adminUsers: v.adminUsers,
        users: v.users,
        profileAtchFiles: v.profileAtchFiles,
        isUse: v.isUse,
      })),
    }
  }

  // @로그인 화면
  @task.resolved
  signIn = (async (email: string, password: string) => {
    this.isAdmin = false;
    try {
      await http.post<IAuthUserDto>(`/auth/sign-in`, { 
          email,
          password: inko.ko2en(password),
        })
        .then(async (user: IAuthUserDto) => this.signInCallback(user))
    } catch (e) {
      if(isOfType<{ status: number }>(e, 'status')) console.log(`error: ${e.status}`);
    }
  }) as SignInTask

  @action
  setCommunityInfo(communityInfo: ICommunityInfoDto) {
    console.log('communityInfo:: ', communityInfo)
    const { userCount, createdAt, name, locale, id, users, adminUsers, profileAtchFiles, isUse } = communityInfo
    this.communityInfo = {
      id,
      name,
      locale,
      userCount,
      users,
      createdAt,
      adminUsers,
      profileAtchFiles,
      isUse
    }
  }

  @computed
  get getAuthInfo() {
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

  @computed
  get getIsLogin() {
    return this.isLogin
  }
}
