// 로그인 한 사람을 포함한 모든 사람에 대한 정보를 모아두는 스토어.
import { action, computed, observable } from 'mobx'
import { task } from 'mobx-task'
import { IUser } from '../models/user'
import { http } from '../utils/http-util'
import { Task } from './task.d'
import { GetUserTask, ISearchResultDto, ISearchUserObj, SetUserTask, UpdateUserTask } from './user-store.d'

const initState = {
  user: {} as IUser,
  currentUserId: null,
  resultList: {} as ISearchResultDto
}

export class User {
  // @observable.struct don't notify if new value is equal to old value.
  // Like observable.deep, except that any assigned value that
  // is structurally equal to the current value will be ignored.
  @observable.struct user: IUser = initState.user

  // primitive value will be observable.box automatically
  @observable currentUserId: number | null = initState.currentUserId
  @observable resultList: ISearchResultDto = initState.resultList

  constructor() {
    // this.getCurrentUserId() // 일단 주석 로그인한 사람의 정보는 auth에 넣자.
  }

  // 가입승인
  @task.resolved
  updateCommunityUser = async (id: number, status: string) => {
    try {
      await http.patch(`/sys/users`, { id, status })
      return true
    } catch {
      return false
    }
  }

  // 사용자 검색 기능(로그인 이후)
  // http://localhost:8080/api/sys/users?community-id=1&nickname=like:37&name=sc372&email=sdf@asdf.com
  // email 하고 name 은 암호화해서 저장되기 때문에 like 검색은 안되고 풀네임 그대로  이퀄(eq) 조회 해야됨
  @task.resolved
  onSearchCommunityUser = async (searchObj: ISearchUserObj) => {
    const { communityId, inputName, inputNickname, inputEmail} = searchObj
    await http
      .get<ISearchResultDto>(`/sys/users?community-id=${communityId}&nickname=like:${inputNickname}&name=${inputName}&email=${inputEmail}`, {})
      .then((searchResultList: ISearchResultDto) => {
        console.log('searchResultList:: ',searchResultList);
        this.setSearshResultList(searchResultList);
      })
  }

  @action
  setSearshResultList(searchResultList: ISearchResultDto) {
    const { count, users } = searchResultList;
    this.resultList = {
      count, 
      users
    };
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

  @computed
  get getSearchResultList() {
    return this.resultList
  }
}
