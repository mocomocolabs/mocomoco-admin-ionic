import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
export const Home: React.FC = () => {
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            <IonTitle>메인페이지</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='px-container'>
            메인 페이지 body
            {/* <NewsSearch />
            <NewsList /> */}
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}
