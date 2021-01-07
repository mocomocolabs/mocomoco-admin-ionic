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
import './Home.scoped.scss';

export const Example: React.FC = () => {
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
          {/* 알리엑스 스위치 박스 가져옴 */}
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
        </IonContent>
      </IonPage>
    </>
  )
}
