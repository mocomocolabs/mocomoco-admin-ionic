// description: 내 정보 화면
// path: /myInf
// fileName: MyInf.tsx
// created: 2021-01-10, 이지혜
import { IonButton, IonContent, IonItem, IonItemGroup, IonList, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { default as React, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../components/atoms/InputComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'

export const ConfirmPwd: React.FC = () => {
  const [language, setLanguage] = useState<string>('한국어')
  const { $auth } = useStore()
  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='비밀번호 확인' closeRightBtn={true} closeRightBtnUrl='/MyInf' />
      <IonContent>
        <div className='px-container my-4'>
          <IonList lines='none'>
            <IonItemGroup>
              <IonItem className='mb-5'>
                회원님의 소중한 정보 보호를 위해 현재 비밀번호를 입력해주세요.
              </IonItem>
              <Input
                // value={$userSearch.getSearchObj.name}
                placeholder={$auth.getAuthInfo && $auth.getAuthInfo.email}
                // disabled={true}
              />
              <Input
                // value={$userSearch.getSearchObj.name}
                placeholder='비밀번호를 입력해주세요.'
                // passwordType={true}
                // onChange={(name) => $userSearch.setSearchName(name)}
              />
            </IonItemGroup>
            <IonButton expand='full' color='dark' className='mt-8'>
              <Link to='/changePwd'>다음</Link>
            </IonButton>
          </IonList>
        </div>
      </IonContent>
    </IonPage>
  ))
}
