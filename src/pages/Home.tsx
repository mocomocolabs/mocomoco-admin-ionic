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
import { default as React } from 'react'
import { TextXxl } from '../components/atoms/TextXxlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import './Home.scoped.scss'

export const Home: React.FC = () => {
  const { $home, $user } = useStore()

  useIonViewWillEnter(() => {
    // $home.getCurMonEventList
    // $home.getApvList
  })

  const asdf = () => {
    // $user.getUser(0)
    // test
    $user.getUsers()
    console.log(123)
  }

  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='하마 ADMIN' menuBtn={true} userBtn={true} />
      <IonContent>
        <div className='px-container'>
          <div style={{ marginTop: '20px' }} className='apv-wrap'>
            <div className='box'>
              <TextXxl className='text-bold'>가입승인을 기다려요</TextXxl>
              <strong className='badge'>{$home.getApvList.length}</strong>
              <IonButton style={{ marginLeft: 'auto' }} size='small' color='dark' onClick={asdf}>
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
                {$home.getApvList.map((a, i) => (
                  <IonRow key={i}>
                    <IonCol size='1' style={{ maxWidth: '28px', width: '28px' }}>
                      <IonCheckbox
                        style={{ width: '23px', height: '23px' }}
                        checked={a.checked}
                        color='dark'
                      />
                    </IonCol>
                    <IonCol size='2' style={{ fontSize: '13px' }}>
                      {a.name}
                    </IonCol>
                    <IonCol size='5' style={{ fontSize: '13px' }}>
                      {a.email}
                    </IonCol>
                    <IonCol size='4' style={{ fontSize: '13px' }}>
                      {a.reqDate} 신청
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
  // return useObserver(() =>
  //   $home.getApvList.map({
  //     pending: () => {
  //       return (
  //         <div>안뇽</div>
  //       )
  //     },
  //     resolved: () => (
  //       <div>하세요</div>
  //     )
  //   })
  // )
}
