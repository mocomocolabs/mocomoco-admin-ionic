import { action, computed, observable } from 'mobx'
import { IResultList, ISearchObj } from '../models/userSearch'

const initState = {
  resultList: {} as IResultList,
  searchObj: {} as ISearchObj,
}

export class UserSearch {
  @observable.ref resultList: IResultList = initState.resultList
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
  setResultList(param: IResultList) {
    this.resultList = param;
  }

  @action
  setSearchName(param: string) {
    this.searchObj.name = param
  }

  @action
  setSearchEmail(param: string) {
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
