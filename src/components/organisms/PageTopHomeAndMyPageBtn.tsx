import { IonButton, IonButtons, IonIcon } from '@ionic/react';
import {
  home, person, personCircle
} from 'ionicons/icons';
import React from 'react';


export const PageTopHomeAndMyPageBtn: React.FC = () => {
  return (
    <IonButtons slot="end">
      <IonButton slot='end' color='dark' routerLink='/home'>
        <IonIcon
          slot='end'
          ios={home}
          md={home}
          icon={home}
          size="default"
        />
      </IonButton>
      <IonButton slot='end' color='dark' routerLink='/my'>
        <IonIcon
          slot='end'
          ios={personCircle}
          md={person}
          size="default"
        />
      </IonButton>
    </IonButtons>
  )
}