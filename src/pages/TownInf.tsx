import { IonContent, IonPage, IonThumbnail } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { TextLg } from '../components/atoms/TextLgComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'

export const TownInf: React.FC = () => {
  const { $auth } = useStore()
  const [language, setLanguage] = useState<string>('ko_KR')
  useEffect(() => {
    setLanguageFn()
  })
  // TODO: 이거 공통 함수로 만들기(MyInf랑 TownInf랑 같이 쓰기)
  const setLanguageFn = () => {
    switch ($auth.getCommunityInfo.locale) {
      case 'ko_KR':
        setLanguage('한국어')
        break
      case 'en_US':
        setLanguage('영어')
        break
      case 'ja_JP':
        setLanguage('일본어')
    }
  }
  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='우리마을정보' menuBtn={true} homeBtn={true} userBtn={true} />
      <IonContent>
        <div className='px-container my-4'>
          <div className='flex-center' slot='start'>
            <IonThumbnail style={{ width: '400px', height: '200px' }}>
              <img src={$auth.getCommunityInfo.atchFiles[0].url} alt='프로필이미지' />
            </IonThumbnail>
          </div>
          <div className='flex-center' slot='end'>
            <TextLg className='text-bold'>{$auth.getCommunityInfo.name}</TextLg>
          </div>
          <div className='basic-inf mt-8'>
            <div className='block flex'>
              &nbsp;<TextLg>언어</TextLg>
              <TextLg className='ml-auto mr-8'>{language}</TextLg>
            </div>
            <div className='block flex'>
              &nbsp;<TextLg>마을사람들</TextLg>
              <TextLg className='ml-auto mr-8'>{$auth.getCommunityInfo.userCount}명</TextLg>
            </div>
            <div className='block flex'>
              &nbsp;<TextLg>마을관리자</TextLg>
              <TextLg className='ml-auto mr-8'>{$auth.getCommunityInfo.adminUsers[0].name}</TextLg>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  ))
}
