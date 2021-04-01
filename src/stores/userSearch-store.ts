// description: 우리마을사람들 store
// fileName: userSearch-store.ts
// created: 2021-01-10, 이지혜
import { action, computed, observable } from 'mobx'
import { IResultList, ISearchObj } from '../models/userSearch'

const initState = {
  resultList: [],
  searchObj: {} as ISearchObj,
}

export class UserSearch {
  // @observable.struct don't notify if new value is equal to old value.
  // Like observable.deep, except that any assigned value that
  // is structurally equal to the current value will be ignored.
  @observable.ref resultList: IResultList[] = initState.resultList
  @observable.ref searchObj: ISearchObj = initState.searchObj

  @computed
  get getResultList() {
    return this.resultList
  }

  @computed
  get getSearchObj() {
    return this.searchObj
  }

  @action
  setResultList(param: any) {
    this.resultList = param
  }

  @action
  setSearchName(param: any) {
    this.searchObj.name = param
  }

  @action
  setSearchEmail(param: any) {
    this.searchObj.email = param
  }

  @action
  initSearchObj() {
    this.searchObj = initState.searchObj
  }
  @action
  initResultList() {
    this.resultList = initState.resultList
  }
}
