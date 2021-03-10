import { IonContent, IonHeader, IonPage, useIonViewWillEnter } from '@ionic/react'
import React from 'react'
import { SignInEmail } from '../components/organisms/SignInEmailComponent'
import { useStore } from '../hooks/use-store'

export const SignIn: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsHeaderBar(false)
  })

  return (
    <IonPage>
      <IonHeader>
        HAMA ADMIN
        {/* <IonToolbar>
          <div slot='start'>
            <BackButton></BackButton>
          </div>
        </IonToolbar> */}
      </IonHeader>
      <IonContent>
        <SignInEmail></SignInEmail>
      </IonContent>
    </IonPage>
  )
}
