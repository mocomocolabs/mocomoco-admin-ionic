// description: 홈 화면
// path: /home
// fileName: Home.tsx
// created: 2021-01-03, 이지혜
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonCheckbox,
  IonCol,
  IonContent,
  IonGrid,
  IonIcon,
  IonList,
  IonPage,
  IonRow,
  IonItem,
  IonLabel
} from '@ionic/react'
import { refreshOutline, pin } from 'ionicons/icons'
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
            // 1. 사용자 정보 업데이트
            await $user.updateCommunityUser(a.id, 'APPROVAL')
            // 2. 성공 팝업 show
            setIsShowApvCompleteAlert(true)
            // 3. 데이터 재조회
            await $auth.signInWithToken()
            // 4. 테이블 재렌더링
            setUsersListToApprove(
              $auth.getCommunityInfo.users
                .filter((a) => a.id !== $auth.getCommunityInfo.adminUsers[0].id) // admin 제외
                .filter((a) => a.status !== 'APPROVAL') // approval 제외
            )
          })
        },
      })
    }
  }

  // TODO: 중복되는 코드를 어떻게 합칠 수 있을까?
  const researchAndRerenderTable = async () => {
    await $auth.signInWithToken()
    setUsersListToApprove(
      $auth.getCommunityInfo.users
        .filter((a) => a.id !== $auth.getCommunityInfo.adminUsers[0].id) // admin 제외
        .filter((a) => a.status !== 'APPROVAL') // approval 제외
    )
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
              {usersListToApprove && usersListToApprove?.length < 1 ? (
                <></>
              ) : (
                <IonButton className='apv-btn' color='#' size='small' onClick={apvBtnClick}>
                  승인
                </IonButton>
              )}
                <IonIcon 
                  className='refresh-btn'
                  onClick={researchAndRerenderTable}
                  slot='icon-only'
                  size='large'
                  icon={refreshOutline}>
                </IonIcon>
            </div>
            {usersListToApprove && usersListToApprove?.length < 1 ? (
              <div style={{ marginLeft: '15px', fontSize:'15px', color:'#555' }}>모두 승인 하셨네요!</div>
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
                        <IonCol size='3' style={{ fontSize: '15px' }}>
                          <span>
                            <IonCheckbox
                              className='apv-ch-box mr5'
                              checked={a.status === 'PENDING' ? false : true}
                              color='light'
                              onIonChange={(e) => changeStatus(e.detail.checked, a, i)}
                              style={{width:'18px',height:'18px'}}
                            />
                          </span>
                          <span className='apv-name' style={{}}>{a.name}</span>
                        </IonCol>
                        <IonCol size='4' style={{ fontSize: '15px' }}>
                          <span>{a.email}</span>
                        </IonCol>
                        <IonCol size='5' style={{ fontSize: '15px' }}>
                          <span>{ymdhm(a.createdAt)}</span>
                          <span className='apv-date'>신청</span>
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
              <TextXxl className='text-bold'>
                이번달 {$auth.getCommunityInfo.name} 일정
                <button>more</button>
              </TextXxl>
            </header>
            <br />
            <IonCard>
              <IonCardHeader>
                <IonCardSubtitle>고추장 담그기 워크숍</IonCardSubtitle>
                <IonCardTitle>Card Title</IonCardTitle>
              </IonCardHeader>

              <IonCardContent>
                Keep close to Nature's heart... and break clear away, once in awhile, and climb a mountain or
                spend a week in the woods. Wash your spirit clean.
              </IonCardContent>
            </IonCard>
            <IonCard>
              <IonItem>
                {/* <IonIcon icon={pin} slot='start' /> */}
                <IonLabel>ion-item in a card, icon left, button right</IonLabel>
                <IonButton fill='outline' slot='end'>
                  View
                </IonButton>
              </IonItem>

              <IonCardContent>
                This is content, without any paragraph or header tags, within an ion-cardContent element.
              </IonCardContent>
            </IonCard>
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
