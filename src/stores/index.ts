import { configure } from 'mobx'
import { Auth } from './auth-store'
import { Community } from './community-store'
import { Home } from './home-store'
import { Ui } from './ui-store'
import { User } from './user-store'
import { UserSearch } from './userSearch-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

export class RootStore {
  $community: Community
  $ui: Ui
  $user: User

  // isa 추가
  $home: Home
  $userSearch: UserSearch
  $auth: Auth

  constructor() {
    this.$community = new Community()
    this.$ui = new Ui()
    this.$user = new User()

    // isa 추가
    this.$home = new Home()
    this.$userSearch = new UserSearch()
    this.$auth = new Auth()
  }
}
