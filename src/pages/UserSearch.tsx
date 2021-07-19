import { IonAvatar, IonButton, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption } from '@ionic/react'
import { searchOutline } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { default as React, useEffect, useState } from 'react'
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
  const [inputStatus, setInputStatus] = useState<string>('')

  useEffect(() => {
    onSearchList();
  })

  const onSearchList = async () => {
    const communityId = $auth.getCommunityInfo.id
    await $user.onSearchCommunityUser({ communityId, inputName, inputNickname, inputEmail, inputStatus })
    $userSearch.setResultList($user.getSearchResultList.users)
  }

  const asdf = (a:any) => {
    console.log(a);
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
                    onKeyUpEnterFn={onSearchList}
                  />
                </div>
                <div className='mt-3 mb-3'>
                  <IonLabel className='ml-8'>닉네임</IonLabel>
                  <Input
                    className='ml-8'
                    value={inputNickname}
                    placeholder='닉네임'
                    onChange={(name) => setInputNickname(name)}
                    onKeyUpEnterFn={onSearchList}
                  />
                </div>
                <div className='mt-3 mb-3'>
                  <IonLabel className='ml-8'>이메일</IonLabel>
                  <Input
                    className='ml-8'
                    value={inputEmail}
                    placeholder='이메일'
                    onChange={(email) => setInputEmail(email)}
                    onKeyUpEnterFn={onSearchList}
                  />
                </div>
                <div className='mt-3 mb-3'>
                  <IonItem>
                    <IonLabel className='ml-8'>승인 상태</IonLabel>
                    <IonSelect
                      interface='action-sheet'
                      className='ml-8'
                      value={inputStatus}
                      placeholder='상태'
                      onIonChange={(e) => setInputStatus(e.detail.value)}
                      onKeyPress={onSearchList}
                  >
                    <IonSelectOption value=''>전체</IonSelectOption>
                    <IonSelectOption value='APPROVE'>승인 완료</IonSelectOption>
                    <IonSelectOption value='PENDING'>승인 대기</IonSelectOption>
                  </IonSelect>
                  </IonItem>
                </div>
              </IonList>
            </div>
            <div className='search-area-bottom-btn'>
              <IonButton expand='full' color='dark' onClick={onSearchList}>
                <IonIcon slot='icon-only' icon={searchOutline} size='small' />
                검색
              </IonButton>
            </div>
          </div>
          <div className='result-list-wrap'>
            <IonList className='mb-8'>
            {$user.getSearchResultList && $user.getSearchResultList.count === 0 ? (
              <div className='flex-center mt-3 mb-3'>결과값이 없습니다</div>
            ) :  (
              <div className='flex-center mt-3 mb-3'>검색 결과는 (( {$user.getSearchResultList.count} )) 건 입니다. 
                (<span className='result_cnt-pending-red'>승인대기</span>
                <span>{$userSearch.getResultList?.filter(a => a.status === 'PENDING').length}건 포함</span>)
              </div>
            )
          }
          <hr className='gray-bar' />
          {$user.getSearchResultList && 
            $user.getSearchResultList.count > 0 && 
              $userSearch.getResultList.map((a, index) => {
                return (
                  <IonItem key={index} onClick={() => asdf(a)}>
                    <IonAvatar slot='start'>
                      <IonImg src={a.profileUrl && 
                                    a.profileUrl.includes('http:://') ? 
                                    a.profileUrl : '/assets/img/avatar.png'} alt='프로필이미지' />
                    </IonAvatar>
                    <IonLabel>
                      {/* position="stacked" */}
                      <span style={{marginRight:'5px'}}>{a.name}</span>
                      <h6 className='dark-gray inline' style={{fontSize:'12px'}}>
                        닉네임: {a.nickname} / ID: {a.id} {a.status !== 'APPROVAL' ? (<h5 className='pending-red-in-list'>승인대기</h5>) : <></>}
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
