import { IonContent, IonHeader, IonPage } from '@ionic/react'
import { y } from '../utils/moment-util'
import { FC, useEffect } from 'react'
import { SignInEmail } from '../components/organisms/SignInEmailComponent'
import { useStore } from '../hooks/use-store'
import './SignIn.scss'

export const SignIn: FC = () => {
  const { $ui } = useStore()

  useEffect(() => {
    $ui.setIsHeaderBar(false)
    $ui.setIsBottomTab(false)
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
