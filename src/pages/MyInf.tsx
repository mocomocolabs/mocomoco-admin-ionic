import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import React from 'react'

export const MyInf: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonButton slot='end' color='dark' routerLink='/home'>
              <IonIcon slot='icon-only' icon={closeOutline} size='default' />
            </IonButton>
          </IonButtons>
          <IonTitle slot='start'>내 정보</IonTitle>
          {/* <IonButtons slot='end'>
            <IonButton slot='start' color='dark' routerLink='/settings'>
              <IonIcon slot='icon-only' icon={settingsOutline} size='default' />
            </IonButton>
          </IonButtons> */}
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <div className='px-container my-4'>
          {/* <MypageProfile />
          <XDivider />
          <MypageRowList />
          <XDivider />
          <MypageColumnList /> */}
        </div>
      </IonContent>
    </IonPage>
  )
}
