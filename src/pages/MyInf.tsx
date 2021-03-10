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
  IonSelectOption
} from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { default as React, useState } from 'react'
import { Link } from 'react-router-dom'
import { TextXl } from '../components/atoms/TextXlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'

export const MyInf: React.FC = () => {
  const [language, setLanguage] = useState<string>('한국어')
  const { $myInf, $auth } = useStore()

  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='내 정보' backBtn={true} />
      <IonContent>
        <div className='px-container my-4'>
          <IonList lines='none'>
            <IonItemGroup>
              <div className='flex-center' slot='start'>
                <IonAvatar className='w-20 height-80'>
                  <IonImg src={$myInf.getUserInfo.profileUrl} alt='프로필이미지' />
                </IonAvatar>
              </div>
              <div className='flex-center' slot='end'>
                <TextXl className='text-bold'>{$myInf.getUserInfo.name}</TextXl>
              </div>
            </IonItemGroup>
            <IonItemGroup className='mt-5'>
              <IonLabel>내 정보</IonLabel>
              <IonItem className='block flex'>
                <IonLabel>ID</IonLabel>
                <span>
                  <IonLabel className='ml-auto mr-8'>{$myInf.getUserInfo.id}</IonLabel>
                </span>
              </IonItem>
              <IonItem className='block flex'>
                <IonLabel>이메일</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$myInf.getUserInfo.email}</IonLabel>
                </span>
                <IonIcon className='inline ml-2 mt-2' icon={chevronForward} />
              </IonItem>
              <IonItem className='block flex'>
                <IonLabel>핸드폰</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$myInf.getUserInfo.mobile}</IonLabel>
                </span>
                <IonIcon className='inline ml-2 mt-2' icon={chevronForward} />
              </IonItem>
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
                  <IonSelectOption value='Ko'>한국어</IonSelectOption>
                  <IonSelectOption value='En'>English</IonSelectOption>
                  <IonSelectOption value='Jp'>日本</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem className='block flex' routerLink='/confirmPwd'>
                <Link to='/confirmPwd' className='no-underline black'>
                  <IonLabel>비밀번호 변경</IonLabel>
                  {/* <IonIcon className="inline ml-2 mt-2" /> */}
                </Link>
              </IonItem>
            </IonItemGroup>
            <IonItemGroup className='mt-5'>
              <IonLabel>관리마을정보</IonLabel>
              <IonItem className='block flex'>
                <IonLabel>내 권한</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>ADMIN</IonLabel>
                </span>
              </IonItem>
              <IonItem className='block flex'>
                <IonLabel>관리마을이름</IonLabel>
                <span>
                  <IonLabel className='ml-auto'>{$myInf.getUserInfo.community}</IonLabel>
                </span>
              </IonItem>
            </IonItemGroup>
            <IonButton expand='full' color='dark' className='mt-8' onClick={$auth.logout}>
              로그아웃
            </IonButton>
            <IonItem className='mb-8'>
              <IonLabel className='flex-center text-center'>버전: 0.0.1</IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  ))
}
