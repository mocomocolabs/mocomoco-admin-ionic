// description: 홈 화면
// path: /home
// fileName: Home.tsx
// created: 2021-01-03, 이지혜
import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonList,
  IonPage,
  IonRow,
} from '@ionic/react'
import * as _ from 'lodash'
import { useObserver } from 'mobx-react-lite'
import { default as React, useEffect, useState } from 'react'
import { TextXxl } from '../components/atoms/TextXxlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { ICommunityUsers } from '../stores/auth-store.d'
import { ymdhm } from '../utils/moment-util'
import './Home.scss'

export const Home: React.FC = () => {
  const { $home, $ui, $auth, $user } = useStore()
  const [usersListToApprove, setUsersListToApprove] = useState<ICommunityUsers[] | undefined>()
  const [isLoading, setIsLoading] = useState<boolean>()
  const [isShowApvCompleteAlert, setIsShowApvCompleteAlert] = useState<boolean>()

  // useIonViewWillEnter(() => {
  //   console.log('useIonViewWillEnter, home')
  // })

  useEffect(() => {
    setIsLoading(true)
    if (isLoading) {
      $ui.setIsHeaderBar(true)

      setUsersListToApprove(
        $auth.getCommunityInfo.users
          .filter((a) => a.id !== $auth.getCommunityInfo.adminUsers[0].id) // admin 제외
          .filter((a) => a.status !== 'APPROVAL') // approval 제외
      )
    }
    return () => setIsLoading(false)
  }, [$auth.getCommunityInfo, $ui, isLoading])

  useEffect(() => {
    // TODO: isShowApvComleteAlert를 감지하게 하고 얼럿을 띄우려 하였으나 얼럿이 뜨지 않음.
    // 로그는 찍히는데 Alert 컴포넌트 문제인 것 같기도 하고.
    if (isShowApvCompleteAlert) {
      $ui.showAlert({
        isOpen: true,
        header: '확인',
        message: '승인처리 되었습니다.',
        oneBtn: true,
      })
    }
    return () => setIsShowApvCompleteAlert(false)
  }, [$ui, isShowApvCompleteAlert])

  const changeStatus = (checkedYn: boolean, a: ICommunityUsers, i: number) => {
    console.log(usersListToApprove)

    !checkedYn ? (a = { ...a, status: 'PENDING' }) : (a = { ...a, status: 'APPROVAL' })
    if (usersListToApprove) usersListToApprove[i] = a
  }

  const apvBtnClick = () => {
    const saveObj = usersListToApprove?.filter((a) => a.status !== 'PENDING')
    if (_.isEmpty(saveObj)) {
      $ui.showAlert({
        isOpen: true,
        header: '확인',
        message: '승인할 사용자에 체크해 주세요.',
        oneBtn: true,
      })
    } else {
      $ui.showAlert({
        isOpen: true,
        header: '확인',
        message: '승인하시겠습니까?',
        onSuccess() {
          saveObj?.map(async (a) => {
            await $user.updateCommunityUser(a.id, 'APPROVAL').then((success) => {
              if (success) {
                setIsShowApvCompleteAlert(true)
                window.location.reload()
              }
            })
          })
        },
      })
    }
  }

  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='하마 ADMIN' menuBtn={true} userBtn={true} />
      <IonContent>
        <div className='px-container'>
          <div style={{ marginTop: '20px' }} className='apv-wrap'>
            <div className='box'>
              <TextXxl className='text-bold'>가입승인을 기다려요</TextXxl>
              <strong className='badge'>{usersListToApprove?.length}</strong>
              {usersListToApprove && usersListToApprove?.length < 0 ? (
                <></>
              ) : (
                <IonButton style={{ marginLeft: 'auto' }} size='small' color='dark' onClick={apvBtnClick}>
                  승인
                </IonButton>
              )}
            </div>
            {usersListToApprove && usersListToApprove?.length < 0 ? (
              <div>모두 승인 하셨네요!</div>
            ) : (
              <div className='apv-list-wrap' style={{ marginLeft: '-5px' }}>
                <IonGrid>
                  <IonCol>
                    <IonCol size='1'></IonCol>
                    <IonCol size='2'></IonCol>
                    <IonCol size='5'></IonCol>
                    <IonCol size='4'></IonCol>
                  </IonCol>
                  {usersListToApprove &&
                    usersListToApprove.map((a, i) => (
                      <IonRow key={i}>
                        <IonCol size='1' style={{ maxWidth: '28px', width: '28px' }}>
                          <IonCheckbox
                            style={{ width: '23px', height: '23px' }}
                            checked={a.status === 'PENDING' ? false : true}
                            color='dark'
                            onIonChange={(e) => changeStatus(e.detail.checked, a, i)}
                          />
                        </IonCol>
                        <IonCol size='2' style={{ fontSize: '13px' }}>
                          {a.name}
                        </IonCol>
                        <IonCol size='5' style={{ fontSize: '13px' }}>
                          {a.email}
                        </IonCol>
                        <IonCol size='4' style={{ fontSize: '13px' }}>
                          {ymdhm(a.createdAt)}
                        </IonCol>
                      </IonRow>
                    ))}
                </IonGrid>
              </div>
            )}
          </div>
          <br />
          <hr className='gray-bar' />
          <div className='month-event-wrap'>
            <header style={{ marginBottom: '-30px' }}>
              <TextXxl className='text-bold'>이번달 우리마을 일정</TextXxl>
            </header>
            <br />
            <div className='month-event-list-wrap' style={{ marginLeft: '-5px' }}>
              <IonList>
                {$home.getCurMonEventList.map((v, i) => (
                  <IonCard key={i} style={{ marginBottom: '-10px' }}>
                    <IonCardHeader>
                      <IonCardTitle style={{ fontSize: '14px' }}>
                        {v.date} &nbsp;&nbsp;&nbsp;&nbsp;{v.eventNm}
                      </IonCardTitle>
                    </IonCardHeader>
                  </IonCard>
                ))}
              </IonList>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  ))
}
