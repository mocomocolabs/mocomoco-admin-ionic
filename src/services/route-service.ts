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

  signIn() {
    this.history.push('/sign-in')
  }

  home() {
    this.history.push('/home')
  }

  myPage() {
    this.history.push('/my-page')
  }

  search() {
    this.history.push('search')
  }

  townInf() {
    this.history.push('townInf')
  }

  profileDetail(userId: number) {
    this.history.push(`/users/${userId}`)
  }

  get history() {
    return this._history
  }
}

export const route = new RouteService()
