import { Task as TaskType } from 'mobx-task'
import { IUser } from './../models/user.d'

export type GetUserTask = TaskType<[number], void>

export type SetUserTask = TaskType<[IUser], void>

export type UpdateUserTask = TaskType<[number, IUser], boolean>

export interface ISearchUserObj {
    communityId: number,
    inputName: string,
    inputNickname: string,
    inputEmail: string
    inputStatus: string
}

// 사용자 검색 - 모시러 갈 때
export interface ISearchResultDto {
    count: number,
    communityUsers: ICommunityUsersDto[]
}
interface ICommunityUsersDto {
    id: number,
    community: {},
    user: ISearchUser
}

// 사용자 검색 결과값 - 저장할 때
export interface ISaveVO {
    count: number,
    userList: ISearchUser[]
}
interface ISearchUser {
    createdAt: string,
    createdBy: string,
    email: string,
    fcmToken: string,
    id: number,
    introduce: string,
    isPublicEmail: boolean,
    isPublicMobile: boolean,
    isUse: boolean,
    locale: string,
    mobile: string,
    name: string,
    nickname: string,
    roles: string,
    status: string,
    updatedAt: string,
    updatedBy: string
}