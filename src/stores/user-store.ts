// 로그인 한 사람을 포함한 모든 사람에 대한 정보를 모아두는 스토어.
import { action, observable } from 'mobx'
import { task } from 'mobx-task'
import { IUser } from '../models/user'
import { http } from '../utils/http-util'
import { Task } from './task.d'
import { GetUserTask, SetUserTask, UpdateUserTask } from './user-store.d'

const initState = {
  user: {} as IUser,
  currentUserId: null,
}

export class User {
  // @observable.struct don't notify if new value is equal to old value.
  // Like observable.deep, except that any assigned value that
  // is structurally equal to the current value will be ignored.
  @observable.struct user: IUser = initState.user

  // primitive value will be observable.box automatically
  @observable currentUserId: number | null = initState.currentUserId

  constructor() {
    // this.getCurrentUserId() // 일단 주석 로그인한 사람의 정보는 auth에 넣자.
  }

  @task
  getCurrentUserId = (async () => {
    console.log('current User ID------------')

    if (this.currentUserId != null) {
      return
    }

    await http.get<{ userId: number }>(`/users/current`).then(
      action(({ userId }) => {
        // TODO error handling - when userId not received from server
        this.setCurrentUserId(userId)
      })
    )
  }) as Task

  @action
  setCurrentUserId = (userId: number) => {
    this.currentUserId = userId
  }

  @task
  getCurrentUser = (async () => {
    await this.getCurrentUserId()
    this.getUser(this.currentUserId!)
  }) as Task

  // 모든 가입자들 가져오는 api
  @task
  getUsers = (async () => {
    await http.get(`/sys/users`).then(
      action((data) => {
        console.log('data', data)
      })
    )
  }) as Task
  @task
  getUser = (async (userId: number) => {
    await http.get<IUser>(`/sys/users/${userId}`).then(
      action((data) => {
        console.log(data)

        // this.setUser(data)
      })
    )
  }) as GetUserTask

  @task.resolved // resolved를 쓰면 처음에 pending상태가 아니라 resolved 상태로 시작함.
  setUser = (async (newUser: IUser) => {
    this.user = newUser
  }) as SetUserTask

  // TODO fix: type checking required for actual values inside data object
  @task.resolved
  updateUser = (async (userId: number, data: IUser) => {
    const { success } = await http.patch<IUser, { success: boolean }>(`/users/${userId}`, data)

    if (success) {
      this.getUser(userId)
    }

    return success
  }) as UpdateUserTask
}
