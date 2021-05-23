import {
  IonContent,
  IonPage,
} from '@ionic/react'
import React, { useState } from 'react'
import { PageHeader } from '../components/molecules/PageHeaderComponent'

export const Help: React.FC = () => {
  const [alarmSound, setAlarmSound] = useState<string>('구름씨 랄라~')
  const [language, setLanguage] = useState<string>('한국어')

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
