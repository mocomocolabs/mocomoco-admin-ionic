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
import * as _ from 'lodash'
import { useObserver } from 'mobx-react-lite'
import { default as React, useEffect, useState } from 'react'
import { TextXxl } from '../components/atoms/TextXxlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { ICommunityUsers } from '../stores/auth-store.d'
import './Home.scoped.scss'

export const Home: React.FC = () => {
  const { $home, $ui, $auth, $user } = useStore()
  const [usersListCopy, setUsersListCopy] = useState<ICommunityUsers[] | undefined>()
  const [saveData, setSaveData] = useState<ICommunityUsers[]>([])

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
    $user.updateCommunityUser(2, 'APPROVAL')
  }
  const asdf = (checkedYn: boolean, a: ICommunityUsers) => {
    // TODO: 왜 처음에 체크박스가 두번 호출되는지
    // useState는 날라가버려서 이거 쓰면 스토어에 달아야 할듯?
    console.log(checkedYn, a)
    !checkedYn ? (a = { ...a, status: 'PENDING' }) : (a = { ...a, status: 'APPROVAL' })
    console.log(a.status)
    console.log(saveData)
    const aaaaa = saveData.find((aa) => aa.id === a.id)
    console.log('없는지', _.isEmpty(aaaaa))

    if (a.status === 'PENDING') {
      console.log('pop')
      setSaveData(saveData.filter((aaa) => aaa.id == a.id))
    } else if (a.status === 'APPROVAL' && _.isEmpty(aaaaa)) {
      // 없어야 집어넣는다... 이게 맞나? 맞는 것 같은데..
      console.log('save')
      setSaveData((arr) => [...arr, a])
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
                      </IonCol>
                      <IonCol size='2' style={{ fontSize: '13px' }}>
                        {a.name}
                      </IonCol>
                      <IonCol size='5' style={{ fontSize: '13px' }}>
                        {a.email}
                      </IonCol>
                      <IonCol size='4' style={{ fontSize: '13px' }}>
                        {a.createdAt} 가입
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
