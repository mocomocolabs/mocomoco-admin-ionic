// description: 비밀번호 확인 팝업
// path: /confirmPwd
// fileName: ConfirmPwd.tsx
// created: 2021-01-10, 이지혜
import { IonContent, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { default as React } from 'react'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { SignInEmail } from '../components/organisms/SignInEmailComponent'

export const ConfirmPwd: React.FC = () => {
  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='비밀번호 확인' closeRightBtn={true} closeRightBtnUrl='/MyInf' />
      <IonContent>
        <SignInEmail useIn='confirmPwd'></SignInEmail>
      </IonContent>
    </IonPage>
  ))
}
