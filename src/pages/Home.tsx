import {
  IonButton,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  useIonViewWillEnter,
} from '@ionic/react'
import { refreshOutline } from 'ionicons/icons'
import * as _ from 'lodash'
import { Observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import { TextXxl } from '../components/atoms/TextXxlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { RoundSquareSection } from '../components/organisms/RoundSquareSectionComponent'
import { useStore } from '../hooks/use-store'
import { SIGN_UP_STATUS, USER_ROLE, VIEW_TYPE } from '../models/constant.d'
import { ICommunityUsers } from '../stores/community-store.d'
import { ymdhm } from '../utils/moment-util'
import './Home.scss'

export const Home: FC = () => {
  const { $ui, $auth, $user } = useStore()
  const [usersListToApprove, setUsersListToApprove] = useState<ICommunityUsers[] | undefined>()

  useIonViewWillEnter(() => {
    $ui.setIsHeaderBar(true)
    
  })

  useEffect(() => { 
    getCommunityInfo()
  }, [$auth.getCommunityInfo.users, $auth.getCommunityInfo.adminUsers])

  const changeStatus = (checkedYn: boolean, a: ICommunityUsers, i: number) => {
    !checkedYn ? (a = { ...a, status: SIGN_UP_STATUS.PENDING }) : (a = { ...a, status: SIGN_UP_STATUS.APPROVAL })
    if (usersListToApprove) usersListToApprove[i] = a
  }

  // 승인 버튼 클릭시
  const apvBtnClick = () => {
    const saveObj = usersListToApprove?.filter((a) => a.status !== SIGN_UP_STATUS.PENDING);
    
    if (_.isEmpty(saveObj)) {
      $ui.showAlert({
        isOpen: true,
        header: '확인',
        message: '승인할 사용자에 체크해 주세요.',
        oneBtn: true,
      })
    } else {
      $ui.showAlert({
        isOpen: true,
        header: '확인',
        message: '승인하시겠습니까?',
        onSuccess() {
          return saveObj?.map(async (a) => {
            // 1. 사용자 정보 업데이트
            await $user.updateCommunityUser(a.id, SIGN_UP_STATUS.APPROVAL)
            await $auth.signInWithToken()
            getCommunityInfo()
          })
        },
      })
    }
  }

  const getCommunityInfo = () => {
    setUsersListToApprove(
      $auth.getCommunityInfo.users
        .filter((a) => !a.roles.includes(USER_ROLE.ADMIN))
        .filter((a) => a.status !== SIGN_UP_STATUS.APPROVAL) 
    )
  }

  const refresh = async() => {
    await $auth.signInWithToken()
    getCommunityInfo()
  }

  return (
    <Observer>
      {() => 
        <IonPage>
          <PageHeader pageTitle='Hama Geegi' noticeYn={true} viewType={VIEW_TYPE.PAGE} />
          <IonContent>
            
            <RoundSquareSection bgColor='#FFF6DB'>  
              <section>
                <TextXxl className='text-bold'>안녕하세요!</TextXxl>
                <div className='login-user-name'>{$auth.getAuthInfo?.name}</div>
                <div className='maeul-name'>{$auth.getCommunityInfo?.name}의 하마지기</div>
              </section>
            </RoundSquareSection>
            
            <RoundSquareSection bgColor='#f5f5f5'>
              <div>
                <div className='apv-wrap'>
                  <div className='box'>
                    <TextXxl className='text-bold'>가입승인을 기다려요</TextXxl>
                    <strong className='badge'>{usersListToApprove?.length}</strong>
                    {usersListToApprove && usersListToApprove?.length < 1 ? (
                      <></>
                    ) : (
                      <IonButton className='apv-btn' color='#' size='small' onClick={apvBtnClick}>
                        승인
                      </IonButton>
                    )}
                    <IonIcon
                      className='refresh-btn'
                      onClick={refresh}
                      slot='icon-only'
                      size='large'
                      icon={refreshOutline}
                    ></IonIcon>
                  </div>

                  {usersListToApprove && usersListToApprove?.length < 1 ? (
                    <div style={{ marginLeft: '15px', fontSize: '15px', color: '#555' }}>쨕쨕쨕! 모두 승인 하셨네요!</div>
                  ) : (
                    <div className='apv-list-wrap'>
                      { usersListToApprove && usersListToApprove.map((item, index) => (
                        <>
                          <IonItem key={index + item.id} lines="none" className="item-content" style={{width:'100%'}}>
                            <IonCheckbox
                              className='mr5'
                              checked={item.status === SIGN_UP_STATUS.PENDING ? false : true}
                              color='light'
                              onIonChange={(e) => changeStatus(e.detail.checked, item, index)}
                            />
                            <IonLabel>
                              <div>
                                <h3 className='inline'>{item.name}</h3>
                              </div>
                              <h4 className='inline' style={{textAlign: 'right', fontSize:'12px', color:'#999'}}>{ymdhm(item.createdAt)} | {item.email}</h4>
                              <p style={{whiteSpace:'normal', color:'#333'}}>{item.introduce}</p>
                            </IonLabel>
                          </IonItem>
                          <span className='under-line' />
                        </>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </RoundSquareSection>
          </IonContent>
        </IonPage>
      }
    </Observer>
  )
}
