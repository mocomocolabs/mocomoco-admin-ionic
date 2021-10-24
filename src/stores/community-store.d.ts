import { ICommunity } from '../models/community';
import { SIGN_UP_STATUS, USER_ROLE } from '../models/constant.d';
import { IFileDto } from './common/file.d';
import { IAdminUsers } from './user-store.d';

export interface ICommunityInfoDto {
    adminUsers: IAdminUsers[]
    profileAtchFiles: IFileDto[]
    createdAt: string
    id: number
    isUse: boolean
    locale: string
    name: string
    userCount: number
    users: ICommunityUsers[]
    createdBy?: string
    updatedAt?: string
    updatedBy?: string
  }
  
  interface ICommunityUsers {
    profileAtchFiles: []
    communities: ICommunity[]
    createdAt: string
    createdBy: string
    fcmtoken: string
    id: number
    email: string
    fcmToken: string
    introduce: string
    isPublicMobile: boolean
    isPublicEmail: boolean
    isUse: boolean
    locale: string
    mobile: string 
    name: string
    nickname: string
    profileUrl: string
    roles: USER_ROLE
    status: SIGN_UP_STATUS
    updatedAt: string
    updatedBy: string
  }

export interface ICommunityDto {
    id: number
    name: string
    adminUsers: number[]
    users: []
    profileAtchFiles: IFileDto[]
    isUse: boolean
}