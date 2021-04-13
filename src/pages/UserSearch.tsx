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
} from '@ionic/react'
import * as _ from 'lodash'
import { useObserver } from 'mobx-react-lite'
import { default as React, useState} from 'react'
import { Input } from '../components/atoms/InputComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { ymdhm } from '../utils/moment-util'

export const UserSearch: React.FC = () => {
  const { $userSearch, $auth } = useStore()
  const [inputName, setInputName] = useState<string>('')
  const [inputEmail, setInputEmail] = useState<string>('')
  const [inputNickNm, setInputNickNm] = useState<string>('')

  const onSearchList = () => {
    $userSearch.initSearchObj()
    $userSearch.initResultList()
    // TODO: 지금은 이미 로그인할 때 가져온 데이터를 가지고 조회를 하기 때문에 like 검색이 안됨.
    // 자바스크립트로 like 검색을 구현할 것인지. http통신으로 가져올 것인지를 생각해보자.
    if (!_.isEmpty(inputName) && _.isEmpty(inputEmail)) {
      console.log('$auth.getCommunityInfo.users::', $auth.getCommunityInfo)
      console.log('$auth.getCommunityInfo.users::', $auth.getCommunityInfo.users)
      $userSearch.setResultList(
        $auth.getCommunityInfo.users
          .filter(a => a.id !== $auth.getCommunityInfo.adminUsers[0].id)
          .filter((a) => a.name === inputName)
      )
    } else if (_.isEmpty(inputName) && !_.isEmpty(inputEmail)) {
      $userSearch.setResultList(
        $auth.getCommunityInfo.users
        .filter(a => a.id !== $auth.getCommunityInfo.adminUsers[0].id)
        .filter((a) => a.email === inputEmail)
      )
    } else if (_.isEmpty(inputName) && _.isEmpty(inputEmail)) {
      $userSearch.setResultList($auth.getCommunityInfo.users.filter(a => a.id !== $auth.getCommunityInfo.adminUsers[0].id))
    } else {
      const filteredList = $auth.getCommunityInfo.users.filter(
        (a) => a.name === inputName && a.email === inputEmail
      ).filter(a => a.id !== $auth.getCommunityInfo.adminUsers[0].id)
      $userSearch.setResultList(filteredList)
    }
  }
  return useObserver(() => (
    <>
      <IonPage>
        <PageHeader pageTitle='우리마을사람들' menuBtn={true} homeBtn={true} userBtn={true} />
        <IonContent>
          <div className='search-area-wrap'>
            <div className='search-area-input'>
              <IonList lines='none'>
                <div className='mt-3 mb-3'>
                  <IonLabel className='ml-8'>마을 이름</IonLabel>
                  <IonLabel className='ml-8'>{$auth.getCommunityInfo.name}</IonLabel>
                </div>
                <div className='mt-3 mb-3'>
                  <IonLabel className='ml-8'>이름</IonLabel>
                  <Input 
                    className='ml-8'
                    value={inputName}
                    placeholder='이름'
                    onChange={(name) => setInputName(name)}
                    />
                </div>
                <div className='mt-3 mb-3'>
                  <IonLabel className='ml-8'>닉네임</IonLabel>
                  <Input
                    className='ml-8'
                    value={inputNickNm}
                    placeholder='닉네임'
                    onChange={(name) => setInputNickNm(name)}
                  />
                </div>
                <div className='mt-3 mb-3'>
                  <IonLabel className='ml-8'>이메일</IonLabel>
                  <Input
                  className='ml-8'
                    value={inputEmail}
                    placeholder='이메일'
                    onChange={(email) => setInputEmail(email)}
                  />
                </div>
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
              {$userSearch.getResultList !== undefined && $userSearch.getResultList.length > 0 ? (
                <>
                  <div className='total ml-5 mt-3 mb-3'>total: {$userSearch.getResultList.length}</div>
                  <hr className='gray-bar' />
                </>
              ) : (
                <>
                  <div className='flex-center mt-3 mb-3'>결과가 없습니다.</div>
                  <hr className='gray-bar' />
                </>
              )}
              {$userSearch.getResultList !== undefined &&
                $userSearch.getResultList.map((a, index) => {
                  return (
                    <IonItem key={index}>
                      <IonAvatar slot='start'>
                        <IonImg src={a.profileUrl} />
                      </IonAvatar>
                      <IonLabel>
                        {/* position="stacked" */}
                        <span>{a.name}</span>
                        <h6 className='dark-gray inline ml-3'>({a.nickname} / {a.id})</h6>
                        <h5>{a.email}</h5>
                        <h5>가입일자: {ymdhm(a.createdAt)}</h5>
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
