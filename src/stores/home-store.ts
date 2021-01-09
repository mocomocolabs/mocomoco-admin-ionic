// description: 홈 화면 store
// fileName: home-store.ts
// created: 2021-01-09, 이지혜
import { computed, observable } from 'mobx'
import { IApvLIst, IEvent } from '../models/home'

const initState = {
  apvList: [
    { name: '이지혜', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01" },
    { name: '유상용', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01" },
    { name: '유키', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01" },
    { name: '김은희', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01" },
    { name: '김옥심', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01" },
    { name: '구마탁', checked: false, email: "isaworld@naver.com", reqDate: "2021-01-01" },
  ],
  curMonEventList: [
    { eventNm: '신년행사', date: "2020-01-01" },
    { eventNm: '상철이생일', date: "2020-01-22" },
    { eventNm: '상철이생일', date: "2020-01-23" },
    { eventNm: '상철이생일', date: "2020-01-24" },
    { eventNm: '상철이생일', date: "2020-01-25" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
  ],
}

export class Home {
  @observable.ref apvList: IApvLIst[] = initState.apvList
  @observable.ref curMonEventList: IEvent[] = initState.curMonEventList

  // 승인 리스트
  // @task
  // getApvList = (async () => {
  //   await http.get<IApvLIst[]>('/getApvList').then(
  //     action((data) => {
  //       this.apvList = data
  //     })
  //   )
  // }) as Task
  @computed
  get getApvList() {
    return this.apvList
  }

  // @task로 선언하면 프로미스를 반환하고
  // @computed로 하면 그냥 가져오는구나... ㅇㅋ

  // 이번달행사리스트
  // @task
  // getCurrentEvent = (async () => {
  //   await http.get<IEvent[]>('/curMonEventList').then(
  //     action((data) => {
  //       this.curMonEventList = data
  //     })
  //   )
  // }) as Task
  @computed
  get getCurMonEventList() {
    return this.curMonEventList
  }
}
