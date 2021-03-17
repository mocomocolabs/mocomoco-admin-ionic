// description: 내 정보 화면
// path: /myInf
// fileName: MyInf.tsx
// created: 2021-01-10, 이지혜
import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonItemGroup,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
  useIonViewWillEnter
} from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { TextXl } from '../components/atoms/TextXlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'

export const MyInf: React.FC = () => {
  const [language, setLanguage] = useState<string>('ko_KR')
  const { $auth } = useStore()

  useIonViewWillEnter(() => {
    setLanguage($auth.getAuthInfo ? $auth.getAuthInfo.locale : '')
  }, [$auth.getAuthInfo])

  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='내 정보' backBtn={true} />
      <IonContent>
        <div className='px-container my-4'>
          <IonList lines='none'>
            <IonItemGroup>
              <div className='flex-center' slot='start'>
                <IonAvatar className='w-20 height-80'>
                  <IonImg src={$auth.getAuthInfo.profileUrl} alt='프로필이미지' />
                </IonAvatar>
              </div>
              <div className='flex-center' slot='end'>
                <TextXl className='text-bold'>{$auth.getAuthInfo.name}</TextXl>
              </div>
            </IonItemGroup>
            <IonItemGroup className='mt-5'>
              <IonLabel>내 정보</IonLabel>
              {/* id */}
              <IonItem className='block flex'>
                <IonLabel>ID</IonLabel>
                <span>
                  <IonLabel className='ml-auto mr-8'>{$auth.getAuthInfo.id}</IonLabel>
                </span>
              </IonItem>
              {/* 닉네임 */}
              <IonItem className='block flex'>
                <IonLabel>닉네임</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$auth.getAuthInfo.nickname}</IonLabel>
                </span>
                <IonIcon className='inline ml-2 mt-2' icon={chevronForward} />
              </IonItem>
              {/* 이메일 */}
              <IonItem className='block flex'>
                <IonLabel>이메일</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$auth.getAuthInfo.email}</IonLabel>
                </span>
                <IonIcon className='inline ml-2 mt-2' icon={chevronForward} />
              </IonItem>
              {/* 핸드폰 */}
              {/* <IonItem className='block flex'>
                <IonLabel>핸드폰</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$auth.getAuthInfo.mobile}</IonLabel>
                </span>
                <IonIcon className='inline ml-2 mt-2' icon={chevronForward} />
              </IonItem> */}
              {/* 언어 */}
              <IonItem>
                <IonLabel>언어</IonLabel>
                <IonSelect
                  interface='action-sheet'
                  value={language}
                  placeholder={language}
                  onIonChange={(e) => {
                    setLanguage(e.detail.value)
                  }}
                >
                  <IonSelectOption value='ko_KR'>한국어</IonSelectOption>
                  <IonSelectOption value='en_US'>English</IonSelectOption>
                  <IonSelectOption value='ja_JP'>日本</IonSelectOption>
                </IonSelect>
              </IonItem>
              {/* 비밀번호 변경 */}
              <IonItem className='block flex' routerLink='/confirmPwd'>
                <Link to='/confirmPwd' className='no-underline black'>
                  <IonLabel>비밀번호 변경</IonLabel>
                  {/* <IonIcon className="inline ml-2 mt-2" /> */}
                </Link>
              </IonItem>
            </IonItemGroup>
            <IonItemGroup className='mt-5'>
              <IonLabel>관리마을정보</IonLabel>
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
                <IonLabel>관리마을이름</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$auth.getAuthInfo.communities[0].name}</IonLabel>
                </span>
              </IonItem>
            </IonItemGroup>
            {/* 로그아웃 */}
            <IonButton expand='full' color='dark' className='mt-8' onClick={$auth.logout}>
              로그아웃
            </IonButton>
            {/* 버전 */}
            <IonItem className='mb-8'>
              <IonLabel className='flex-center text-center'>버전: 0.0.1</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  ))
}
