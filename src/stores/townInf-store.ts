// description: 우리마을정보 화면 store
// fileName: townInf-store.ts
// created: 2021-01-10, 이지혜
import { computed, observable } from 'mobx';
import { ITownInf } from '../models/townInf';

const initState = {
  townInf: {
    location: '인천',
    name: '우동사',
    adminNm: "조정훈",
    townNo: 234,
    profileUrl:"https://spnimage.edaily.co.kr/images/photo/files/NP/S/2018/08/PS18080700154.jpg"
  },
}

export class TownInf {
  // @observable.struct don't notify if new value is equal to old value.
  // Like observable.deep, except that any assigned value that
  // is structurally equal to the current value will be ignored.
  @observable.ref townInf: ITownInf = initState.townInf

  @computed
  get getTownInf() {
    return this.townInf
  }
}
