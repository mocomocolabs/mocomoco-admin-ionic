import {
  IonAvatar,
  IonButton,
  IonContent,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  useIonViewWillEnter
} from '@ionic/react';
import * as _ from 'lodash';
import { useObserver } from 'mobx-react-lite';
import React from 'react';
import { Input } from '../components/atoms/InputComponent';
import { TextLg } from '../components/atoms/TextLgComponent';
import { PageHeader } from '../components/molecules/PageHeaderComponent';
import { useStore } from '../hooks/use-store';

export const TownEvent: React.FC = () => {
  const { $userSearch } = useStore()

  useIonViewWillEnter(() => {
    onSearchList()
  })

  const onSearchList = () => {
    $userSearch.initSearchObj()
    $userSearch.initResultList()
    
    if(!_.isEmpty($userSearch.getSearchObj.name) && _.isEmpty($userSearch.getSearchObj.email) ) {
      $userSearch.setResultList($userSearch.getResultList.filter(a => a.name === $userSearch.getSearchObj.name))
    } else if(_.isEmpty($userSearch.getSearchObj.name) && !_.isEmpty($userSearch.getSearchObj.email)) {
      $userSearch.setResultList($userSearch.getResultList.filter(a => a.email === $userSearch.getSearchObj.email))
    } else if(_.isEmpty($userSearch.getSearchObj.name) && _.isEmpty($userSearch.getSearchObj.email)) {
      $userSearch.setResultList($userSearch.getResultList)
    } else {
      const filteredList = $userSearch.getResultList.filter(a => a.name === $userSearch.getSearchObj.name && a.email === $userSearch.getSearchObj.email)
      $userSearch.setResultList(filteredList)
    }
  }
  return useObserver(() => 
    <>
      <IonPage>
        <PageHeader pageTitle="우리마을일정" menuBtn={true} homeBtn={true} userBtn={true}/>
        <IonContent>
          <div className='search-area-wrap'>
            <div className='search-area-input'>
              <IonList lines="none">
                {/* <InputSelect selectTit='마을씨 이름' List={townList} onChange={(townNm) => setSearchTwn(townNm)}/> */}
                <div className="mt-3 mb-3">
                  <IonLabel className="ml-8">마을씨 이름</IonLabel>
                  <IonLabel className="ml-8">우동사</IonLabel>
                </div>
                <Input
                  value={$userSearch.getSearchObj.name}
                  placeholder='이름'
                  label='이름'
                  onChange={(name) => $userSearch.setSearchName(name)}
                />
                <Input 
                  value={$userSearch.getSearchObj.email}
                  placeholder='이메일'
                  label='이메일'
                  onChange={(email) => $userSearch.setSearchEmail(email)}
                />
              </IonList>
            </div>
            <div className="search-area-bottom-btn" style={{marginTop: '-4px'}}>
              <IonButton expand="full" color="dark" onClick={onSearchList}>검색</IonButton>
            </div>
          </div>
          <div className="result-list-wrap">
            <IonList className="mb-8">
              {$userSearch.getResultList !== undefined && $userSearch.getResultList.length > 0 ? 
                <div className="total ml-5 mt-5 mb-1">total: {$userSearch.getResultList.length}</div>
                : <div className="flex-center mt-5">결과가 없습니다.</div>
              }
              {$userSearch.getResultList !== undefined && $userSearch.getResultList.map((a, index) => { 
                return (
                  <IonItem key={index}>
                    <IonAvatar slot="start">
                      <IonImg src={a.profileUrl} />
                    </IonAvatar>
                    <IonLabel> 
                    {/* position="stacked" */}
                      <TextLg>{a.name}</TextLg>
                      <h6 className="gray inline ml-3">(ID:{a.id})</h6>
                      <h5>{a.email}</h5>
                      <h5>{a.regiDt} 가입</h5>
                    </IonLabel>
                  </IonItem>
                )
              })}
            </IonList>
          </div>
        </IonContent>
      </IonPage>
    </>
  )
}
