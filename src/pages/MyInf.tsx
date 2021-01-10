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
  IonPage
} from '@ionic/react'
import { chevronForward } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { TextLg } from '../components/atoms/TextLgComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'

export const MyInf: React.FC = () => {
  const { $myInf } = useStore()
  return useObserver(() => 
    <IonPage>
      <PageHeader pageTitle="내 정보" backBtn={true}/>

      <IonContent>
        <div className='px-container my-4'>
          <div className='flex-center' slot='start'>
            <IonAvatar className='w-20 height-80'>
              <IonImg src={$myInf.getUserInfo.profileUrl} alt='프로필이미지' />
            </IonAvatar>
          </div>
          <div className='flex-center' slot='end'>
          <TextLg className='text-bold'>{$myInf.getUserInfo.name}</TextLg>
          </div>
          <div className="basic-inf">
            <TextLg className='text-bold block'>기본정보</TextLg>
            <div className="block flex">
              &nbsp;<TextLg>ID</TextLg>
              <TextLg className="ml-auto mr-8">{$myInf.getUserInfo.id}</TextLg>
            </div>
            <div className="block flex" >
              &nbsp;<TextLg>이메일</TextLg>
              <TextLg className="ml-auto">{$myInf.getUserInfo.email}</TextLg>
              <IonIcon className="ml-4 mt-2" icon={chevronForward}/>
            </div>
            <div className="block flex">
              &nbsp;<TextLg>핸드폰</TextLg>
              <TextLg className="ml-auto">{$myInf.getUserInfo.mobile}</TextLg>
              <IonIcon className="ml-4 mt-2" icon={chevronForward}/>
            </div>
          </div>
          <div className="town-inf">
            <TextLg className='text-bold block'>관리마을정보</TextLg>
            <div className="block flex">
              &nbsp;<TextLg>권한</TextLg>
              <TextLg className="ml-auto mr-8">ADMIN</TextLg>
            </div>
            <div className="block flex">
              &nbsp;<TextLg>관리마을이름</TextLg>
              <TextLg className="ml-auto mr-8">{$myInf.getUserInfo.community}</TextLg>
            </div>
          </div>
          <div className="lang-set">
            <div className="block flex">
              &nbsp;<TextLg>언어</TextLg>
              <TextLg className="ml-auto">한국어</TextLg>
              <IonIcon className="ml-4 mt-2" icon={chevronForward}/>
            </div>
          </div>
          <div className="chg-pwd">
            <div className="block flex">
              &nbsp;<TextLg>비밀번호 변경</TextLg>
              <IonIcon className="ml-auto mt-2" icon={chevronForward}/>
            </div>
          </div>
          <div className="mt-5">
            <IonButton expand="full" color="dark">로그아웃</IonButton>
            <div className="version flex-center">버전: 0.0.1</div>
          </div>
          {/* <MypageProfile />
          <XDivider />
          <MypageRowList />
          <XDivider />
          <MypageColumnList /> */}
        </div>
      </IonContent>
    </IonPage>
  )
}
