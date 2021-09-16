import { IonAvatar, IonButton, IonContent, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPage, IonSelect, IonSelectOption } from '@ionic/react'
import { addOutline, removeOutline, searchOutline } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import { default as React, useState } from 'react'
import { Input } from '../components/atoms/InputComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { ymdhm } from '../utils/moment-util'
import './UserSearch.scss'

export const UserSearch: React.FC = () => {
  const { $auth, $user } = useStore()

  const [inputName, setInputName] = useState<string>('')
  const [inputEmail, setInputEmail] = useState<string>('')
  const [inputNickname, setInputNickname] = useState<string>('')
  const [inputStatus, setInputStatus] = useState<string>('')
  const [curOpenIntroduceId, setCurOpenIntroduceId] = useState<number>()

  const onSearchList = async () => {
    const communityId = $auth.getCommunityInfo.id
    await $user.onSearchCommunityUser({ communityId, inputName, inputNickname, inputEmail, inputStatus });
    // $userSearch.setResultList($user.getSearchResultList.communityUsers)
  }

  const randomImgNm = () => {
    const ImgArr = [13,14,15,16,17,18,19]
    return ImgArr[Math.floor(Math.random() * 7)] 
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
                    <IonSelectOption value='APPROVAL'>승인 완료</IonSelectOption>
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
                (<span>승인대기</span>
                <span className='result_cnt-pending-red'>{$user.getSearchResultList?.userList?.filter(a => a.status === 'PENDING').length}</span>건 포함)
              </div>
            )
          }
          <hr className='gray-bar' />
          { $user.getSearchResultList?.userList?.map((item, index) => {
                return (
                  <>
                  <IonItem lines="none"> 
                    <IonIcon
                      icon={curOpenIntroduceId === item.id ? removeOutline : addOutline}
                      className='absolute right-0 bottom-0 mt10'
                      onClick={() => curOpenIntroduceId !== item.id ? setCurOpenIntroduceId(item.id) : setCurOpenIntroduceId(0)}
                    />
                  </IonItem>
                  <IonItem lines="none"> 
                    <IonAvatar slot="end">
                      <IonImg src={index < 12 ? `/assets/img/${index + 1}.png` : `/assets/img/${randomImgNm}.png`}/>
                    </IonAvatar>
                    <IonLabel>
                      <h2 className='inline'>{item.name}</h2> <h6 className='inline dark-gray'>{item.nickname}</h6>
                      {item.status !== 'APPROVAL' ? (<h5 className='pending-red-in-list ml5'>승인대기</h5>) : <></> }
                      {item.roles?.includes("ROLE_ADMIN") ? (<h5 className='inline-block pending-admin-in-list ml5'>하마지기</h5>) : <></> }
                      <h3>{ymdhm(item.createdAt)} 가입</h3>
                      { curOpenIntroduceId === item.id ? 
                          <>
                            <p>ID: {item.id}</p>
                            <p>{item.email}</p>
                            <p>{item.introduce}</p> 
                          </>
                          : null }
                    </IonLabel>
                  </IonItem>
                </>
                )
              })}
            </IonList>
          </div>
        </IonContent>
      </IonPage>
    </>
  ))
}
