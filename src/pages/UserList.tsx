import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,

  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonThumbnail,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import * as _ from 'lodash';
import React, { useState } from 'react';
import { Input } from '../components/atoms/InputComponent';
import { InputSelect } from '../components/molecules/InputSelectComponent';
import { PageTopHomeAndMyPageBtn } from '../components/organisms/PageTopHomeAndMyPageBtn';

interface ITownList {
    name: string;
    location: string;
    dtlAdd: string;
}
type IResultList = {
  townNm?: string;
  location?: string;
  dtlAdd?: string;
  name?: string;
  email?: string;
  imgSrc?: string;
}
interface ISearchObj {
  townNm?: string;
  name?: string;
  email?: string;
}
export const UserList: React.FC = () => {
  const [searchNm, setSearchNm] = useState<string>()
  const [searchEmail, setSearchEmail] = useState<string>()
  const [searchTwn, setSearchTwn] = useState<string>()
  
  const [initResultList, setResultList ] = useState<IResultList[]>()
  const townList:ITownList[] = [
    {
      name: '::: 전체 선택 :::',
      location: '',
      dtlAdd: ''
    },
    {
      name: '진동마을공동체',
      location: '인천',
      dtlAdd: '강화'
    },
    {
      name: '우동사',
      location: '인천',
      dtlAdd: '검암'
    },
    {
      name: '생태마을공동체',
      location: '전라도',
      dtlAdd: '전주'
    },
  ]
  const resultList: IResultList[] = [
    {
      townNm: '우동사',
      location: '전라도',
      dtlAdd: '전주',
      name: '전지현',
      email: 'isaworld@naver.com',
      imgSrc: 'https://w.namu.la/s/4e244f38c6ab186561dc18d3a09a0553d3556e9ed7979d10553466f985e0902f8225fdcb113084d82d2b8b89ca0da2b503fcfa1925b3f52e8f8184ac4b867a8e08f0a0ae196cde08a39a613bc631de5b434d01a0a6766baad61113860fb3c0ec91a954ff3a242389d68ed788faec9e09'
    },
    {
      townNm: '우동사',
      location: '전라도',
      dtlAdd: '전주',
      name: '정우성',
      email: 'jungws@naver.com',
      imgSrc: 'https://t1.daumcdn.net/cfile/tistory/230AA5395807380033'
    },
    { 
      townNm: '진동마을공동체',
      location: '인천',
      dtlAdd: '강화',
      name: '이상철',
      email: 'scl372@naver.com',
      imgSrc: ''
    },
    { 
      townNm: '진동마을공동체',
      location: '인천',
      dtlAdd: '강화',
      name: '고영희',
      email: 'scl372@naver.com',
      imgSrc: 'http://placekitten.com/g/200/300'
    },
    {
      townNm: '생태마을공동체',
      location: '전라도',
      dtlAdd: '전주',
      name: '이진욱이',
      email: 'leejw@naver.com',
      imgSrc: 'https://spnimage.edaily.co.kr/images/photo/files/NP/S/2018/08/PS18080700154.jpg'
    }
  ]
  const onSearchList = (e: any) => {
    const searchObj: ISearchObj = {
      townNm: searchTwn,
      name: searchNm, 
      email: searchEmail, 
    }
    
    if(_.isEmpty(searchObj.townNm) && 
        _.isEmpty(searchObj.name) && 
        _.isEmpty(searchObj.email) ) {
          setResultList(resultList)
    } else if(searchObj.townNm === '::: 전체 선택 :::') {
      setResultList(resultList)
    } else if(!_.isEmpty(searchObj.townNm) && _.isEmpty(searchObj.name) && _.isEmpty(searchObj.email)) {
      const filteredList = resultList.filter(a => 
                            a.townNm === searchObj.townNm)
      setResultList(filteredList)
    }  
    else {
      const filteredList = resultList.filter(a => 
                            a.townNm === searchObj.townNm && 
                            a.name === searchObj.name &&
                            a.email === searchObj.email)
      setResultList(filteredList)
    }
  }
  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton autoHide={false}></IonMenuButton>
            </IonButtons>
            <IonTitle>우리마을사람들</IonTitle>
            <PageTopHomeAndMyPageBtn />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <div className='search-area-wrap'>
            <div className='search-area-input'>
              <IonList>
                <InputSelect selectTit='마을씨 이름' List={townList} onChange={(townNm) => setSearchTwn(townNm)}/>
                <Input 
                  value={searchNm}
                  placeholder='이름'
                  label='이름'
                  onChange={(name) => setSearchNm(name)}
                />
                <Input 
                  value={searchEmail}
                  placeholder='이메일'
                  label='이메일'
                  onChange={(email) => setSearchEmail(email)}
                />
              </IonList>
            </div>
            <div className="search-area-bottom-btn">
              <IonButton expand="full" color="dark" onClick={onSearchList}>검색</IonButton>
            </div>
          </div>
          <div className="result-list-wrap">
            <IonList>
              {initResultList !== undefined && initResultList.map((a, index) => { 
                return (
                  <IonItem key={index}>
                    <IonThumbnail slot="start">
                      <IonImg src={a.imgSrc} />
                    </IonThumbnail>
                    <IonLabel position="stacked">
                      {index + 1}.<h2 style={{display:"inline"}}>{a.name}</h2> | <h6 style={{display:"inline"}}>{a.townNm}</h6>
                      <h5>{a.email}</h5>
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
