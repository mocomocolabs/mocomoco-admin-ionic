import {
  IonAvatar,
  IonButton,
  IonContent,
  IonIcon,
  IonImg,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonSelect,
  IonSelectOption,
} from '@ionic/react'
import { addOutline, removeOutline, searchOutline } from 'ionicons/icons'
import { Observer } from 'mobx-react-lite'
import { FC, useState } from 'react'
import { Input } from '../components/atoms/InputComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { SIGN_UP_STATUS, USER_ROLE, VIEW_TYPE } from '../models/constant.d'
import { ymdhm } from '../utils/moment-util'
import './UserSearch.scss'

export const UserSearch: FC = () => {
  const { $auth, $user } = useStore()

  const [inputName, setInputName] = useState<string>('')
  const [inputEmail, setInputEmail] = useState<string>('')
  const [inputNickname, setInputNickname] = useState<string>('')
  const [inputStatus, setInputStatus] = useState<string>('')
  const [curOpenIntroduceId, setCurOpenIntroduceId] = useState<number>()
  
  const onSearchList = async () => {
    const communityId = $auth.getCommunityInfo.id
    await $user.onSearchCommunityUser({ communityId, inputName, inputNickname, inputEmail, inputStatus })
  }

  return (
    <Observer>
      {() => (
        <>
          <IonPage>
            <PageHeader pageTitle='조회' viewType={VIEW_TYPE.PAGE} />
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
                        onKeyUp={(e) => e.key == 'Enter' && onSearchList}
                      />
                    </div>
                    <div className='mt-3 mb-3'>
                      <IonLabel className='ml-8'>닉네임</IonLabel>
                      <Input
                        className='ml-8'
                        value={inputNickname}
                        placeholder='닉네임'
                        onChange={(name) => setInputNickname(name)}
                        onKeyUp={(e) => e.key == 'Enter' && onSearchList}
                      />
                    </div>
                    <div className='mt-3 mb-3'>
                      <IonLabel className='ml-8'>이메일</IonLabel>
                      <Input
                        className='ml-8'
                        value={inputEmail}
                        placeholder='이메일'
                        onChange={(email) => setInputEmail(email)}
                        onKeyUp={(e) => e.key == 'Enter' && onSearchList}
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
                          <IonSelectOption value={SIGN_UP_STATUS.APPROVAL}>승인 완료</IonSelectOption>
                          <IonSelectOption value={SIGN_UP_STATUS.PENDING}>승인 대기</IonSelectOption>
                        </IonSelect>
                      </IonItem>
                    </div>
                  </IonList>
                </div>
                <div className='search-area-bottom-btn'>
                  <IonButton expand='full' className='search-btn' onClick={onSearchList}>
                    <IonIcon slot='icon-only' icon={searchOutline} size='small' />
                    검색
                  </IonButton>
                </div>
              </div>
              <div className='result-list-wrap'>
                <IonList className='mb-8'>
                  {$user.getSearchResultList?.userList?.length == 0 ? (
                    <div className='flex-center mt-3 mb-3'>결과값이 없습니다</div>
                  ) : (
                    <div className='flex-center mt-3 mb-3'>
                      검색 결과는 (( {$user.getSearchResultList.count} )) 건 입니다. (<span>승인대기</span>
                      <span className='result-cnt-pending-red'>
                        {
                          $user.getSearchResultList?.userList?.filter(
                            (a) => a.status === SIGN_UP_STATUS.PENDING
                          ).length
                        }
                      </span>
                      건 포함)
                    </div>
                  )}
                  <hr className='gray-bar' />
                  {$user.getSearchResultList?.userList?.map((item) => {
                    return (
                      <>
                        <IonItem lines='none'>
                          <IonIcon
                            icon={curOpenIntroduceId === item.id ? removeOutline : addOutline}
                            className='absolute right-0 bottom-0 mt10'
                            onClick={() =>
                              curOpenIntroduceId !== item.id
                                ? setCurOpenIntroduceId(item.id)
                                : setCurOpenIntroduceId(0)
                            }
                          />
                        </IonItem>
                        <IonItem lines='none'>
                          <IonAvatar slot='end'>
                            <IonImg src={`/assets/img/avatar.png`} />
                          </IonAvatar>
                          <IonLabel>
                            <h2 className='inline'>{item.name}</h2>{' '}
                            <h6 className='inline dark-gray'>{item.nickname}</h6>
                            {item.roles?.includes(USER_ROLE.ADMIN) ? (
                              <svg className="admin-crown" width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M15 6.74078C15 5.87297 14.294 5.16694 13.4262 5.16694C12.5583 5.16694 11.8523 5.87297 11.8523 6.74078C11.8523 7.13556 11.9988 7.49651 12.2397 7.77306L10.6127 9.26556L8.53773 4.9774L9.75048 3.55294L7.50852 0.919556L5.26664 3.55301L6.42539 4.91406L4.3652 9.24115L2.76109 7.77224C3.00164 7.49576 3.14775 7.13515 3.14775 6.74078C3.14775 5.87297 2.44173 5.16694 1.57391 5.16694C0.706023 5.16694 0 5.87297 0 6.74078C0 7.54492 0.606477 8.20976 1.386 8.30303L1.86825 14.0804H13.1318L13.6141 8.30303C14.3935 8.20976 15 7.54492 15 6.74078Z" fill="#FBC936"/>
                              </svg>
                            ) : (
                              <></>
                            )}
                            {item.status !== SIGN_UP_STATUS.APPROVAL ? (
                              <h5 className='pending-red-in-list'>승인대기</h5>
                            ) : (
                              <></>
                            )}
                            <h3>가입일 {ymdhm(item.createdAt)}</h3>
                            {curOpenIntroduceId === item.id ? (
                              <>
                                <p>ID: {item.id}</p>
                                <p>{item.email}</p>
                                <p style={{ whiteSpace: 'normal' }}>{item.introduce}</p>
                              </>
                            ) : null}
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
      )}
    </Observer>
  )
}
