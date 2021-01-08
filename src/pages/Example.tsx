import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React from 'react';
import { PageTopHomeAndMyPageBtn } from '../components/organisms/PageTopHomeAndMyPageBtn';
import './Example.scoped.scss';
interface IEvent {
  eventNm?: string;
  date?: string;
}
export const Example: React.FC = () => {
  const asdf: IEvent[] = [
    { eventNm: '신년행사', date: "2020-01-01" },
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
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
    { eventNm: '상철이생일', date: "2020-01-26" },
  ]
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            <IonTitle>예시 코드</IonTitle>
            <PageTopHomeAndMyPageBtn />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {/* 스위치 박스 */}
          <div className="switch-box">
            <label>
              <input type="radio" name="rdo" checked />
              <span>One</span>
            </label>
            <label>
              <input type="radio" name="rdo" />
              <span>Two</span>
            </label>
            <label>
              <input type="radio" name="rdo" />
              <span>Three</span>
            </label>
          </div>
          {/* 컬러 라벨 */}
          <div className="top-desc">
            <span className="yellow">warning</span>
            <span className="red">critical</span>
          </div>
          {/* 리스트 */}
          <div className="list-box">
            <ul>
              {asdf.map((v, i) => (
                <li key={i}>
                  <strong className="tit">{v.eventNm}</strong>
                  <p className="txt">
                    <span>{v.date} {v.eventNm}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}
