// description: SignIn
// path: /signIn
// fileName: SignIn.tsx
// created: 2021-03-10, 이지혜
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
      <IonHeader>HAMA ADMIN</IonHeader>
      <IonContent>
        <SignInEmail useIn='signIn'></SignInEmail>
      </IonContent>
    </IonPage>
  )
}
