import { configure } from 'mobx'
import { Auth } from './auth-store'
import { Ui } from './ui-store'
import { User } from './user-store'
import { UserSearch } from './userSearch-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

export class RootStore {
  $ui: Ui
  $user: User
  $userSearch: UserSearch
  $auth: Auth

  constructor() {
    this.$ui = new Ui()
    this.$user = new User()
    this.$userSearch = new UserSearch()
    this.$auth = new Auth()
  }
}
