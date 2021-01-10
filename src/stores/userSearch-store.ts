// description: 우리마을사람들 store
// fileName: userSearch-store.ts
// created: 2021-01-10, 이지혜
import { action, computed, observable } from 'mobx';
import { IResultList, ISearchObj } from '../models/userSearch';

const initState = {
  resultList: [
    {
      id: 1234,
      name: '전지현',
      community: '우동사',
      email: 'isaworld@naver.com',
      profileUrl: 'https://w.namu.la/s/4e244f38c6ab186561dc18d3a09a0553d3556e9ed7979d10553466f985e0902f8225fdcb113084d82d2b8b89ca0da2b503fcfa1925b3f52e8f8184ac4b867a8e08f0a0ae196cde08a39a613bc631de5b434d01a0a6766baad61113860fb3c0ec91a954ff3a242389d68ed788faec9e09',
      regiDt: "2020-01-01"
    },
    {
      id: 1023,
      name: '정우성',
      community: '우동사',
      email: 'jungws@naver.com',
      profileUrl: 'https://t1.daumcdn.net/cfile/tistory/230AA5395807380033',
      regiDt: "2020-01-01"
    },
    { 
      id: 999,
      name: '이상철',
      community: '우동사',
      email: 'scl372@naver.com',
      profileUrl: '',
      regiDt: "2020-01-01"
    },
    { 
      id: 67,
      name: '고영희',
      community: '우동사',
      email: 'scl372@naver.com',
      profileUrl: 'http://placekitten.com/g/200/300',
      regiDt: "2020-01-01"
    },
    {
      id: 1001,
      name: '이진욱이',
      community: '우동사',
      email: 'leejw@naver.com',
      profileUrl: 'https://spnimage.edaily.co.kr/images/photo/files/NP/S/2018/08/PS18080700154.jpg',
      regiDt: "2020-01-01"
    }
  ],
  searchObj: {} as ISearchObj
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
  get getSearchObj(){
    return this.searchObj
  }

  @action
  setResultList(param: any){
    this.resultList = param
  }

  @action
  setSearchName(param: any){
    this.searchObj.name = param
  }

  @action
  setSearchEmail(param: any){
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
