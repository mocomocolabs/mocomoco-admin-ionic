import { createBrowserHistory, History } from 'history'

class RouteService {
  private _history: History

  constructor() {
    this._history = createBrowserHistory({})
  }

  goBack() {
    // TODO: modal의 open 상태를 store로 관리하여. hardware back 버튼을 제어할 필요가 있음
    this.history.goBack()
  }

  home() {
    this.history.push('/home')
  }

  signIn() {
    this.history.push('/sign-in')
  }

  myInf() {
    this.history.push('myInf')
  }
  changePwd() {
    this.history.push('changePwd')
  }

  settings() {
    this.history.push('settings')
  }
  townInf() {
    this.history.push('townInf')
  }
  townEvent() {
    this.history.push('townEvent')
  }
  confirmPwd() {
    this.history.push('confirmPwd')
  }

  //
  signUp() {
    this.history.push('/sign-up')
  }

  signUpForm() {
    this.history.push('/sign-up/form')
  }

  signUpEmail() {
    this.history.push('/sign-up/email')
  }

  signUpCommunity() {
    this.history.push('/sign-up/community')
  }

  feed() {
    this.history.push('/feed')
  }

  feedForm() {
    this.history.push('/feed-write')
  }

  feedDetail(feedId: number, param?: { autoFocus?: boolean }) {
    this.history.push(`/feed/${feedId}`, { autoFocus: param?.autoFocus })
  }

  tradeDetail(path: string, tradeId: number) {
    this.history.push(`/trade/${path}/${tradeId}`)
  }

  profileDetail(userId: number) {
    this.history.push(`/users/${userId}`)
  }

  profileDetailEdit(userId: number) {
    this.history.push(`/users/${userId}/edit`)
  }

  chatRoom(roomId: number) {
    this.history.push(`/chat/${roomId}`)
  }

  get history() {
    return this._history
  }
}

export const route = new RouteService()
