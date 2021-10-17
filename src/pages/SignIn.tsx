// description: SignIn
// path: /signIn
// fileName: SignIn.tsx
// created: 2021-03-10, 이지혜
import { IonContent, IonHeader, IonPage, useIonViewWillEnter } from '@ionic/react'
import { y } from '../utils/moment-util'
import { FC } from 'react'
import { SignInEmail } from '../components/organisms/SignInEmailComponent'
import { useStore } from '../hooks/use-store'
import './SignIn.scss'

export const SignIn: FC = () => {
  const { $ui } = useStore()

  useIonViewWillEnter(() => {
    $ui.setIsHeaderBar(false)
  })

  return (
    <IonPage className='login-wrap'>
      <div className='login-box'>
        <IonHeader className='title-container'>
          <img src='/assets/img/hamalogo.png' alt='hamalogo' />
        </IonHeader>
        <IonContent className='input-area'>
          <SignInEmail></SignInEmail>
        </IonContent>
      </div>
      <div className='copyright'>
        <p>COPYRIGHT {y(Date())} mocomocolabs, ALL RIGHTS RESERVED</p>
      </div>
    </IonPage>
  )
}
