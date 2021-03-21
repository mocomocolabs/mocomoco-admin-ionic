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
  useIonViewWillEnter
} from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import { default as React, useEffect, useState } from 'react'
import { TextXxl } from '../components/atoms/TextXxlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { ICommunityUsers } from '../stores/auth-store.d'
import './Home.scoped.scss'

export const Home: React.FC = () => {
  const { $home, $ui, $auth } = useStore()
  const [usersListCopy, setUsersListCopy] = useState<ICommunityUsers[] | undefined>()

  useIonViewWillEnter(() => {
    $ui.setIsHeaderBar(true)
    setUsersListCopy($auth.getCommunityInfo.users)
    // $user.getUsers()
  })
  useEffect(() => {
    console.log(usersListCopy)
  }, [usersListCopy])

  const apvBtn = () => {
    console.log('승인체크')
    console.log($auth.getCommunityInfo.users)
  }
  const asdf = (checkedYn: boolean, a: ICommunityUsers) => {
    console.log(checkedYn, a)
    const aa = usersListCopy?.find((a) => a.id === a.id)
    // TODO: 새로운 Object를 어떻게 할당할 것인가.
    // aa !== undefined && aa.status = checkedYn ? 'APPROVAL' : 'PENDING'
    // setUsersListCopy(aa)
    // if (!_.isEmpty(aa)) {
    //   aa.status && checkedYn ? (aa.status = 'APPROVAL') : (aa.status = 'PENDING')
    // }
  }
  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='하마 ADMIN' menuBtn={true} userBtn={true} />
      <IonContent>
        <div className='px-container'>
          <div style={{ marginTop: '20px' }} className='apv-wrap'>
            <div className='box'>
              <TextXxl className='text-bold'>가입승인을 기다려요</TextXxl>
              <strong className='badge'>
                {usersListCopy && usersListCopy.filter((a) => a.status === 'PENDING').length}
              </strong>
              <IonButton style={{ marginLeft: 'auto' }} size='small' color='dark' onClick={apvBtn}>
                승인
              </IonButton>
            </div>
            <div className='apv-list-wrap' style={{ marginLeft: '-5px' }}>
              <IonGrid>
                <IonCol>
                  <IonCol size='1'></IonCol>
                  <IonCol size='2'></IonCol>
                  <IonCol size='5'></IonCol>
                  <IonCol size='4'></IonCol>
                </IonCol>
                {usersListCopy &&
                  usersListCopy.map((a, i) => (
                    <IonRow key={i}>
                      <IonCol size='1' style={{ maxWidth: '28px', width: '28px' }}>
                        <IonCheckbox
                          style={{ width: '23px', height: '23px' }}
                          checked={a.status === 'PENDING' ? false : true}
                          color='dark'
                          onIonChange={(e) => asdf(e.detail.checked, a)}
                        />
                        {a.status}
                      </IonCol>
                      <IonCol size='2' style={{ fontSize: '13px' }}>
                        {a.name}
                      </IonCol>
                      <IonCol size='5' style={{ fontSize: '13px' }}>
                        {a.email}
                      </IonCol>
                      <IonCol size='4' style={{ fontSize: '13px' }}>
                        {a.createdAt} 신청
                      </IonCol>
                    </IonRow>
                  ))}
              </IonGrid>
            </div>
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
                      {/* <IonCardSubtitle>{v.date}</IonCardSubtitle> */}
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
