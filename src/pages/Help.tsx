import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/react'
import { desktop, desktopOutline, logoGithub, logoGoogle, logoGooglePlaystore } from 'ionicons/icons'
import React from 'react'
import { PageHeader } from '../components/molecules/PageHeaderComponent'

export const Help: React.FC = () => {

  return (
    <IonPage>
      <PageHeader pageTitle="Help" menuBtn={false} closeLeftBtn={true} homeBtn={true} userBtn={true}/>
      <br/>
      <IonContent className='text-center'>
        <IonIcon icon={logoGoogle} className='mr5'></IonIcon>
        <div className='px-container my-4'>
          mocomocolabs@gmail.com
        </div>

        <IonIcon icon={logoGithub} className='mr5'></IonIcon>
        <div className='px-container my-4'>
          https://github.com/mocomocolabs
        </div>

        <IonIcon icon={logoGooglePlaystore} className='mr5'></IonIcon>
        <div className='px-container my-4'>
          https://play.google.com/store/apps/details?id=com.mocomoco.hama
        </div>

        <IonIcon icon={desktopOutline} className='mr5'></IonIcon>
        <div className='px-container my-4'>
          https://hama-world.netlify.app
        </div>
      </IonContent>
    </IonPage>
  )
}
