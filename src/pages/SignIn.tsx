// description: SignIn
// path: /signIn
// fileName: SignIn.tsx
// created: 2021-03-10, 이지혜
import { IonContent, IonHeader, IonPage, useIonViewWillEnter } from '@ionic/react'
import React from 'react'
import { SignInEmail } from '../components/organisms/SignInEmailComponent'
import { useStore } from '../hooks/use-store'
import './SignIn.scoped.scss'

export const SignIn: React.FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsHeaderBar(false)
  })

  return (
    <IonPage className="login-wrap">
      <div className="login-box">
        <IonHeader className="title-container">HAMA ADMIN</IonHeader>
        <IonContent className="input-area">
          <SignInEmail useIn='signIn'></SignInEmail>
        </IonContent>
      </div>
      <div className="copyright">
        <p>COPYRIGHT 2021 mocomocolaps, ALL RIGHTS RESERVED</p>
      </div>
    </IonPage>
  )
}
