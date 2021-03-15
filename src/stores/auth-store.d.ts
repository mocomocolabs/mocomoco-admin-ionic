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
interface IAdminUsers {
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

interface ICommunityUsers {
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
export interface ICommunityInfoDto {
  id: number
  name: string
  locale: string
  userCount: number
  adminUsers: IAdminUsers[]
  users: ICommunityUsers[]
  atchFiles: IFileDto[]
  isUse: boolean
  createdAt: string
  updatedAt: string
  createdBy: string
  updatedBy: string
}
