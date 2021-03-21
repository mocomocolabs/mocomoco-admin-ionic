import { Task as TaskType } from 'mobx-task'
import { ISignUpForm } from '../models/sign-up'
import { IFileDto } from './common/file.d'

export type SignUpTask = TaskType<[Partial<ISignUpForm>], void>
export type SignInTask = TaskType<[string, string], void>

export interface IAuthUserDto {
  accessToken: string
  refreshToken: string
  id: number
  name: string
  nickname: string
  email: string
  profileUrl: string
  status: string
  communities: [
    {
      id: number
      name: string
      adminUsers: number[]
      users: []
      atchFiles: IFileDto[]
      isUse: boolean
    }
  ]
  locale: string
  roles: string
  isUse: boolean
}

// TODO: 추후 IUser와 통합하는게 좋을지 논의 필요
export interface IAuthUser {
  id: number
  name: string
  nickname: string
  email: string
  profileUrl: string
  status: string
  communities: ICommunity[]
  locale: string
  roles: string
  isUse: boolean

  // TODO: 추가 필요
  // signUpStatus: string
  // showsEmail: boolean
}

//
export interface IAdminUsers {
  id: number
  email: string
  name: string
  nickname: string
  fcmToken: string
  profileUrl: string
  status: string
  isPublicMobile: boolean
  isPublicEmail: boolean
  communities: ICommunity[]
  locale: string
  roles: string
  isUse: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}

export interface ICommunityUsers {
  id: number
  email: string
  name: string
  nickname: string
  fcmToken: string
  profileUrl: string
  status: string
  isPublicMobile: boolean
  isPublicEmail: boolean
  communities: ICommunity[]
  locale: string
  roles: string
  isUse: boolean
  createdAt: string
  // updatedAt: string
  // createdBy: string
  // updatedBy: string
}
// TODO: Dto 의 타입과 보내주는 타입은 서버에서 정의하는건가?
// 아? network탭에서는 일단 서버에서 보내주는 정보는 모두 가져오지만
// 화면단에서 가져다가 쓸 때 아래처럼 타입을 미리 정해두지 않으면
// 가져다가 활용할 수가 없음.
export interface ICommunityInfoDto {
  id: number
  name: string
  locale: string
  userCount: number
  adminUsers: IAdminUsers[]
  users: ICommunityUsers[]
  atchFiles: IFileDto[]
  // isUse: boolean
  createdAt: string
  // updatedAt: string
  // createdBy: string
  // updatedBy: string
}
