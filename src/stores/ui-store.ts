// UI 관련한 스토어. 예를 들면 헤더 영역이 필요한 곳에서는 토글처럼 프롭스를 내려서
// 쉽게 UI를 제어할 수 있도록 한다. 어드민에서는 bottomTab이 없고 헤더가 있으니
// 이걸 활용햇 나중에 리팩토링 하면 좋을 것 같다.
import { action, computed, observable } from 'mobx'
import { IAlert } from '../models/alert'
import { IPopover, IPopoverResult } from '../models/popover'

const initState = {
  popover: {
    isOpen: false,
    event: undefined,
  } as IPopover,

  alert: {
    isOpen: false,
    header: '',
    message: '',
    onSuccess: () => {},
    onFail: () => {},
  },

  isBottomTab: true,
  isHeaderBar: true,
}

export class Ui {
  @observable popover: IPopover = initState.popover
  @observable alert: IAlert = initState.alert
  @observable isBottomTab = initState.isBottomTab
  @observable isHeaderBar = initState.isHeaderBar

  @action
  setIsBottomTab = (isShow: boolean) => {
    this.isBottomTab = isShow
  }

  @action
  setIsHeaderBar = (isShow: boolean) => {
    this.isHeaderBar = isShow
  }

  @action
  showAlert = (alert: IAlert) => {
    this.alert = alert
  }

  @action
  hideAlert = () => {
    this.alert = initState.alert
  }

  @action
  showPopover = (event: Event) => {
    return new Promise((resolve: (value: IPopoverResult) => void) => {
      this.popover = {
        isOpen: true,
        event,
        resolve,
      }
    })
  }

  @action
  hidePopover = (value?: IPopoverResult) => {
    if (this.popover.resolve) {
      this.popover.resolve(value)
    }
    this.popover = initState.popover
  }

  @computed
  get getIsHeaderBar() {
    return this.isHeaderBar
  }
}
