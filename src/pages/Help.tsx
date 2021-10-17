import {
  IonContent,
  IonIcon,
  IonPage,
} from '@ionic/react'
import { desktopOutline, logoGithub, logoGoogle, logoGooglePlaystore } from 'ionicons/icons'
import { FC } from 'react'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { VIEW_TYPE } from '../models/constant.d'

export const Help: FC = () => {
  return (
    <IonPage>
      <PageHeader pageTitle="공지" viewType={VIEW_TYPE.MODAL} backRouterUrl='/home'/>
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
