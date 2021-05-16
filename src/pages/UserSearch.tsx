import { IonAvatar, IonButton, IonContent, IonImg, IonItem, IonLabel, IonList, IonPage } from '@ionic/react'
import * as _ from 'lodash'
import { useObserver } from 'mobx-react-lite'
import { default as React, useState } from 'react'
import { Input } from '../components/atoms/InputComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { ymdhm } from '../utils/moment-util'
import './UserSearch.scss'

export const UserSearch: React.FC = () => {
  const { $userSearch, $auth, $user } = useStore()
  const [inputName, setInputName] = useState<string>('')
  const [inputEmail, setInputEmail] = useState<string>('')
  const [inputNickname, setInputNickname] = useState<string>('')

  let key = false
  const onSearchList = async () => {
    key = false
    console.log(2344234243, $auth.getCommunityInfo)
    const communityId = $auth.getCommunityInfo.id
    await $user.searchCommunityUser({ communityId, inputName, inputNickname, inputEmail }) // 내가 관리하는 마을의 id를 파라미터롤 보냄.
    console.log('이게나옵니까??', $user.getSearchResultList)
    $userSearch.setResultList($user.getSearchResultList)
    // TODO: 그리드 결과 값에 나오도록 수정! 

    // $userSearch.initSearchObj()
    // $userSearch.initResultList()
    // // TODO: 지금은 이미 로그인할 때 가져온 데이터를 가지고 조회를 하기 때문에 like 검색이 안됨.
    // // 자바스크립트로 like 검색을 구현할 것인지. http통신으로 가져올 것인지를 생각해보자.
    // if (!_.isEmpty(inputName) && _.isEmpty(inputEmail)) {
    //   console.log('$auth.getCommunityInfo.users::', $auth.getCommunityInfo)
    //   console.log('$auth.getCommunityInfo.users::', $auth.getCommunityInfo.users)
    //   $userSearch.setResultList(
    //     $auth.getCommunityInfo.users
    //       .filter(a => a.id !== $auth.getCommunityInfo.adminUsers[0].id)
    //       .filter((a) => a.name === inputName)
    //   )
    // } else if (_.isEmpty(inputName) && !_.isEmpty(inputEmail)) {
    //   $userSearch.setResultList(
    //     $auth.getCommunityInfo.users
    //     .filter(a => a.id !== $auth.getCommunityInfo.adminUsers[0].id)
    //     .filter((a) => a.email === inputEmail)
    //     )
    //   } else if (_.isEmpty(inputName) && _.isEmpty(inputEmail)) {
    //     $userSearch.setResultList($auth.getCommunityInfo.users.filter(a => a.id !== $auth.getCommunityInfo.adminUsers[0].id))
    //   } else {
    //     const filteredList = $auth.getCommunityInfo.users.filter(
    //       (a) => a.name === inputName && a.email === inputEmail
    //       ).filter(a => a.id !== $auth.getCommunityInfo.adminUsers[0].id)
    //       $userSearch.setResultList(filteredList)
    //     }
    key = true
  }

  const calDiv = () => {
    if (!key) {
      return false
    } else if (key && $user.getSearchResultList.count === 0) {
      return <div className='flex-center mt-3 mb-3'>결과가 없습니다.</div>
    } else {
      return (
        <>
          <div className='total ml-5 mt-3 mb-3'>total: {$user.getSearchResultList.count}</div>
          <hr className='gray-bar' />
        </>
      )
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
                    value={inputNickname}
                    placeholder='닉네임'
                    onChange={(name) => setInputNickname(name)}
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
            <div className='search-area-bottom-btn'>
              <IonButton expand='full' color='dark' onClick={onSearchList}>
                검색
              </IonButton>
            </div>
          </div>
          <div className='result-list-wrap'>
            <IonList className='mb-8'>
              {calDiv}
              {_.isEmpty($userSearch.getResultList) &&
                $userSearch.getResultList.map((a, index) => {
                  return (
                    <IonItem key={index}>
                      <IonAvatar slot='start'>
                        <IonImg src={a.profileUrl} />
                      </IonAvatar>
                      <IonLabel>
                        {/* position="stacked" */}
                        <span>{a.name}</span>
                        <h6 className='dark-gray inline ml-3'>
                          ({a.nickname} / {a.id})
                        </h6>
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
