import { Task as TaskType } from 'mobx-task'
import { IFileDto } from './common/file.d'
import { USER_ROLE, SIGN_UP_STATUS } from '../models/constant.d'
import { ICommunityDto } from './community-store'

export type SignInTask = TaskType<[string, string], void>

interface IUserDto {
  id: number
  name: string
  nickname: string
  description: string
  email: string
  mobile: string
  isPublicEmail: boolean
  isPublicMobile: boolean
  roles: USER_ROLE
  status: SIGN_UP_STATUS
  communities: ICommunityDto[]
  atchFiles: IFileDto[]
  isUse: boolean
  profileUrl: string
  locale: string
}

export interface IAuthUserDto extends IUserDto {
  accessToken: string
  refreshToken: string
}






// Pick
export interface IAuthUser extends Pick<IAuthUserDto,
  'id' | 
  'email' | 
  'name' | 
  'status' | 
  'nickname' | 
  'profileUrl' | 
  'communities' | 
  'locale' | 
  'roles' | 
  'description' |
  'isUse' |
  'mobile' |
  'isPublicEmail' |
  'isPublicMobile' |
  'atchFiles'
>{}






