// description: 내 정보 화면
// path: /myInf
// fileName: MyInf.tsx
// created: 2021-01-10, 이지혜
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonImg,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
} from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { TextXl } from '../components/atoms/TextXlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import './MyInf.scss'
import { langSwitcher } from '../utils/utils'

export const MyInf: React.FC = () => {
  const [language, setLanguage] = useState<string | undefined>('ko_KR')
  const { $auth, $ui } = useStore()

  const validate = () => {
    $ui.showAlert({
      isOpen: true,
      header: '확인',
      message: '로그아웃 하시겠습니까?',
      onSuccess() {
        $auth.logout()
      },
    })
  }

  useEffect(() => {
    setLanguageFn()
  })
  const setLanguageFn = () => {
    setLanguage(langSwitcher($auth.getAuthInfo.locale))
  }

  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='내 정보' backBtn={true} />
      <IonContent>
        <div className='px-container my-4'>
          <IonList lines='none'>
            <IonItemGroup>
              <div className='flex-center' slot='start'>
                <IonAvatar className='w-20 height-80'>
                  <IonImg
                    src={
                     '/assets/img/avatar.png'
                    }
                    alt='프로필이미지'
                  />
                </IonAvatar>
              </div>
              <div className='flex-center' slot='end'>
                <TextXl className='text-bold'>{$auth.getAuthInfo.name}</TextXl>
              </div>
            </IonItemGroup>
            <IonItemGroup className='mt-5'>
              <IonLabel className='mother-menu'>내 정보</IonLabel>
              {/* id */}
              <IonItem className='block flex'>
                <IonLabel>ID</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$auth.getAuthInfo.id}</IonLabel>
                </span>
              </IonItem>
              {/* 닉네임 */}
              <IonItem className='block flex'>
                <IonLabel>닉네임</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$auth.getAuthInfo.nickname}</IonLabel>
                </span>
              </IonItem>
              {/* 이메일 */}
              <IonItem className='block flex'>
                <IonLabel>이메일</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$auth.getAuthInfo.email}</IonLabel>
                </span>
              </IonItem>
              {/* 언어 */}
              <IonItem>
                <IonLabel>언어</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>
                    {language}
                  </IonLabel>
                </span>
              </IonItem>
            </IonItemGroup>
            <IonItemGroup className='mt-5'>
              <IonLabel className='mother-menu'>관리마을정보</IonLabel>
              {/* 내 권한 */}
              <IonItem className='block flex'>
                <IonLabel>내 권한</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>
                    {$auth.getAuthInfo.roles.includes('ADMIN') ? 'ADMIN' : ''}
                  </IonLabel>
                </span>
              </IonItem>
              {/* 관리마을이름 */}
              <IonItem className='block flex'>
                <IonLabel>마을이름</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$auth.getAuthInfo.communities[0].name}</IonLabel>
                </span>
              </IonItem>
            </IonItemGroup>
            {/* 로그아웃 */}
            <IonButton expand='full' color='dark' className='mt-8' onClick={validate}>
              로그아웃
            </IonButton>
            {/* 버전 */}
            <IonItem className='mb-8'>
              <IonLabel className='flex-center text-center'>
                <span className='gray mr-1'>현재버전 : V0.0.1</span>
                <span> / 최신버전 : V0.0.1</span>
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  ))
}
