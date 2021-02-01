// description: 내 정보 화면
// path: /myInf
// fileName: MyInf.tsx
// created: 2021-01-10, 이지혜
import { IonButton, IonContent, IonItem, IonItemGroup, IonList, IonPage } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { default as React, useState } from 'react'
import { Link } from 'react-router-dom'
import { Input } from '../components/atoms/InputComponent'
import { Alert } from '../components/molecules/AlertComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'

export const ChangePwd: React.FC = () => {
  const { $ui } = useStore()
  const [asdf, setAsdf] = useState<boolean>(true)
  
  const showConfirmModal = () => {
    $ui.showAlert({
      isOpen: true,
      header: '확인',
      message: '비밀번호를 변경하시겠습니까?',
      onSuccess: () => {
        $ui.hideAlert();
        setTimeout(() => {
          $ui.showAlert({
            isOpen: true,
            header: '확인',
            message: '성공적으로 저장 되었습니다.',
            onSuccess: () => $ui.hideAlert(),
            onFail: () => $ui.hideAlert()
          })
        }, 500)
        $ui.hideAlert();
      },
      onFail: () => $ui.hideAlert()
    })
  }
  
  // return useObserver(() => (
  //   <Modal isShow={asdf} setIsShow={setAsdf} children={
  //     (<IonContent>
  //        <div className='px-container my-4'>
  //          <IonList lines="none">
  //            <IonItemGroup>
  //              <IonItem className="mb-5">새로운 비밀번호를 입력해주세요.</IonItem>
  //              <Input
  //                 // value={$userSearch.getSearchObj.name}
  //                placeholder={'비밀번호(8자리 이상)'}
  //              />
  //              <Input
  //                 // value={$userSearch.getSearchObj.name}
  //                placeholder='비밀번호 재입력'
  //                passwordType={true}
  //                 // onChange={(name) => $userSearch.setSearchName(name)}
  //              />
  //            </IonItemGroup>
  //            <IonButton expand="full" color="dark" className="mt-8">
  //              <Link to="/changePwd" onClick={showConfirmModal}>
  //                변경
  //              </Link>
  //            </IonButton>
  //          </IonList>
  //        </div>
  //      </IonContent>)
  //   } title='비밀번호변경'></Modal>
  return useObserver(() => 
    <IonPage>
      <PageHeader pageTitle="비밀번호 변경" closeRightBtn={true} closeRightBtnUrl="/MyInf"/>
      <IonContent>
        <div className='px-container my-4'>
          <IonList lines="none">
            <IonItemGroup>
              <IonItem className="mb-5">새로운 비밀번호를 입력해주세요.</IonItem>
              <Input
                // value={$userSearch.getSearchObj.name}
                placeholder={'비밀번호(8자리 이상)'}
              />
              <Input
                // value={$userSearch.getSearchObj.name}
                placeholder='비밀번호 재입력'
                passwordType={true}
                // onChange={(name) => $userSearch.setSearchName(name)}
              />
            </IonItemGroup>
            <IonButton expand="full" color="dark" className="mt-8">
              <Link to="/changePwd" onClick={showConfirmModal}>
                변경
              </Link>
            </IonButton>
          </IonList>
        </div>
      </IonContent>
      <Alert></Alert>
    </IonPage>
  )
}
