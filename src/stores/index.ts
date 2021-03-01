import { configure } from 'mobx'
import { Auth } from './auth-store'
import { Chat } from './chat-store'
import { Comment } from './comment-store'
import { Community } from './community-store'
import { News } from './example/news-store'
import { TodoList } from './example/todo-list-store'
import { Feed } from './feed-store'
import { Home } from './home-store'
import { MyInf } from './myInf-store'
import { TownInf } from './townInf-store'
import { Stuff, Talent } from './trade-store'
import { Ui } from './ui-store'
import { User } from './user-store'
import { UserSearch } from './userSearch-store'

configure({ enforceActions: 'observed' }) // action 밖에서 state 수정 비허용

export class RootStore {
  $community: Community
  $feed: Feed
  $comment: Comment
  $stuff: Stuff
  $talent: Talent
  $chat: Chat
  $ui: Ui
  $user: User

  // example
  todoList: TodoList
  news: News

  // isa 추가
  $home: Home
  $myInf: MyInf
  $userSearch: UserSearch
  $townInf: TownInf
  $auth: Auth

  constructor() {
    this.$community = new Community()
    this.$feed = new Feed()
    this.$comment = new Comment()
    this.$ui = new Ui()
    this.$user = new User()
    this.$stuff = new Stuff()
    this.$talent = new Talent()
    this.$chat = new Chat()

    // isa 추가
    this.$home = new Home()
    this.$myInf = new MyInf()
    this.$userSearch = new UserSearch()
    this.$townInf = new TownInf()
    this.$auth = new Auth()

    // example
    this.todoList = new TodoList()
    this.news = new News()
  }
}
