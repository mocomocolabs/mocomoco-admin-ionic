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
}

export interface ISearchResultDto {
    count: number,
    users: [
        createdAt: string,
        createdBy: string,
        email: string,
        fcmToken: string,
        id: number,
        isPublicEmail: boolean,
        isPublicMobile: boolean,
        isUser: boolean,
        locale: string,
        mobile: string,
        name: string,
        nickname: string,
        profileUrl: string,
        status: string
    ]
}