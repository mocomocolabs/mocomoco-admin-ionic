import { IonContent, IonLabel, IonPage, IonThumbnail } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { langSwitcher } from '../utils/utils'

export const TownInf: React.FC = () => {
  const { $auth } = useStore()
  const [language, setLanguage] = useState<string | undefined>('ko_KR')
  useEffect(() => {
    setLanguageFn()
  })
  const setLanguageFn = () => {
    setLanguage(langSwitcher($auth.getCommunityInfo.locale))
  }
  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='우리마을정보' menuBtn={true} homeBtn={true} userBtn={true} />
      <IonContent>
        <div className='px-container my-4'>
          <div className='flex-center' slot='start'>
            <IonThumbnail style={{ width: '100%', height: '400px' }}>
              <img src={$auth.getCommunityInfo.atchFiles[0].url} alt='프로필이미지' />
            </IonThumbnail>
          </div>
          <div className='flex-center' slot='end'>
            <IonLabel className='mt-5 text-bold'>{$auth.getCommunityInfo.name}</IonLabel>
          </div>
          <div className='basic-inf mt-8'>
            <div className='mt-5 block flex'>
              <IonLabel>언어</IonLabel>
              <IonLabel className='ml-auto mr-8'>{language}</IonLabel>
            </div>
            <div className='mt-5 block flex'>
              <IonLabel>마을사람들</IonLabel>
              <IonLabel className='ml-auto mr-8'>
                총 {$auth.getCommunityInfo.users?.filter(a => a.status === 'APPROVAL').length}명
                (승인 대기: {$auth.getCommunityInfo.users?.filter(a => a.status !== 'APPROVAL').length}명)
              </IonLabel>
            </div>
            <div className='mt-5 block flex'>
              <IonLabel>마을관리자</IonLabel>
              <IonLabel className='ml-auto mr-8'>
                {$auth.getCommunityInfo.users.filter(a => a.roles.includes("ROLE_ADMIN")).map(a => a.name)}
              </IonLabel>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  ))
}
