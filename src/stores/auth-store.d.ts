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
