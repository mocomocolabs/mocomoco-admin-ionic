import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import { InputSelect } from '../components/molecules/InputSelectComponent';
interface ITownList {
    name: string;
    location: string;
    dtlAdd: string;
}

export const UserList: React.FC = () => {
    const townList:ITownList[] = [
        {
            name: '진동마을공동체',
            location: '인천',
            dtlAdd: '강화'
        },
        {
            name: '우동사',
            location: '인천',
            dtlAdd: '검암'
        },
        {
            name: '생태마을공동체',
            location: '전라도',
            dtlAdd: '전주'
        },
    ]
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            <IonTitle>마을씨 조회</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='px-container'>
              <InputSelect List={townList}/>
            {/* <IonItem>
                <IonLabel>마을씨 이름</IonLabel>
                <IonSelect value={townNm} placeholder="Select One" onIonChange={e => setTownNm(e.detail.value)}>
                    {townList.map((a, i) => {
                        return (
                        <IonSelectOption key={i} value={a.townNm}>{a.townNm}</IonSelectOption>
                        )
                    })}
                </IonSelect>
            </IonItem> */}
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}
