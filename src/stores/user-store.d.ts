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

export interface ISearchResultDto {
    count: number,
    users: ICommunityUsers[]
}