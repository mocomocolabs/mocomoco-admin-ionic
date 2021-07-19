import {
  IonContent,
  IonPage,
} from '@ionic/react'
import React from 'react'
import { PageHeader } from '../components/molecules/PageHeaderComponent'

export const Help: React.FC = () => {

  return (
    <IonPage>
      <PageHeader pageTitle="Help" menuBtn={false} closeLeftBtn={true} homeBtn={true} userBtn={true}/>
      <IonContent>
        <div className='px-container my-4' style={{textAlign:'center'}}>
          mocomocolaps@gmail.com
        </div>
      </IonContent>
    </IonPage>
  )
}
