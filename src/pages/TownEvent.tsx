import {
  IonButton,
  IonContent,
  IonDatetime,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  useIonViewWillEnter
} from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React from 'react'
import { Input } from '../components/atoms/InputComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { ymd } from '../utils/datetime-util'

export const TownEvent: React.FC = () => {
  const { $home } = useStore()

  useIonViewWillEnter(() => {
    onSearchList()
  })

  const onSearchList = () => {
    // $userSearch.initSearchObj()
    // $userSearch.initResultList()
    // if(!_.isEmpty($userSearch.getSearchObj.name) && _.isEmpty($userSearch.getSearchObj.email) ) {
    //   $userSearch.setResultList($userSearch.getResultList.filter(a => a.name === $userSearch.getSearchObj.name))
    // } else if(_.isEmpty($userSearch.getSearchObj.name) && !_.isEmpty($userSearch.getSearchObj.email)) {
    //   $userSearch.setResultList($userSearch.getResultList.filter(a => a.email === $userSearch.getSearchObj.email))
    // } else if(_.isEmpty($userSearch.getSearchObj.name) && _.isEmpty($userSearch.getSearchObj.email)) {
    //   $userSearch.setResultList($userSearch.getResultList)
    // } else {
    //   const filteredList = $userSearch.getResultList.filter(a => a.name === $userSearch.getSearchObj.name && a.email === $userSearch.getSearchObj.email)
    //   $userSearch.setResultList(filteredList)
    // }
  }
  const todayDate = ymd(Date())
  // const todayDate = format(new Date(), 'yyyy-MM-dd')
  const asdf = (date: string | undefined, eventNm: string | undefined) => {
    console.log(date, eventNm)
    // 모달 show 하면서 단건 검색해야 함.
  }
  return useObserver(() => (
    <>
      <IonPage>
        <PageHeader pageTitle='우리마을일정' menuBtn={true} homeBtn={true} userBtn={true} />
        <IonContent>
          <div className='search-area-wrap'>
            <div className='search-area-input'>
              <IonList lines='none'>
                {/* <InputSelect selectTit='마을씨 이름' List={townList} onChange={(townNm) => setSearchTwn(townNm)}/> */}
                <div className='mt-3 mb-3'>
                  <IonLabel className='ml-8'>마을씨 이름</IonLabel>
                  <IonLabel className='ml-8'>우동사</IonLabel>
                </div>
                <IonItem>
                  <IonLabel>시작날짜</IonLabel>
                  <IonDatetime
                    displayFormat='YYYY/MM/DD'
                    onChange={(staDt): any => $home.setStaDt(staDt)}
                    placeholder='Select Date'
                    min='2021-01-01'
                    max={todayDate}
                  ></IonDatetime>
                </IonItem>
                <IonItem>
                  <IonLabel>끝날짜</IonLabel>
                  <IonDatetime
                    displayFormat='YYYY/MM/DD'
                    onChange={(endDt): any => $home.setEndDt(endDt)}
                    placeholder='Select Date'
                    min='2021-01-01'
                    max={todayDate}
                  ></IonDatetime>
                </IonItem>
                <Input
                  // value={$userSearch.getSearchObj.email}
                  placeholder='행사명'
                  label='행사명'
                  // onChange={(email) => $userSearch.setSearchEmail(email)}
                />
              </IonList>
            </div>
            <div className='search-area-bottom-btn' style={{ marginTop: '-4px' }}>
              <IonButton expand='full' color='dark' onClick={onSearchList}>
                검색
              </IonButton>
            </div>
          </div>
          <div className='result-list-wrap'>
            <IonList className='mb-8'>
              {$home.getCurMonEventList !== undefined && $home.getCurMonEventList.length > 0 ? (
                <div className='total ml-5 mt-5 mb-1'>total: {$home.getCurMonEventList.length}</div>
              ) : (
                <div className='flex-center mt-5'>결과가 없습니다.</div>
              )}
              {$home.getCurMonEventList !== undefined &&
                $home.getCurMonEventList.map((a, index) => {
                  return (
                    <IonItem key={index}>
                      <IonLabel onClick={() => asdf(a.date, a.eventNm)}>
                        {/* position="stacked" */}
                        <span>{a.date}</span>
                        <h6 className='inline ml-3'>{a.eventNm}</h6>
                        {/* <h5>{a.email}</h5> */}
                        {/* <h5>{a.regiDt} 가입</h5> */}
                      </IonLabel>
                    </IonItem>
                  )
                })}
            </IonList>
          </div>
        </IonContent>
      </IonPage>
    </>
  ))
}
