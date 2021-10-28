import {
  IonButton,
  IonButtons,
  IonCheckbox,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage
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
import { route } from '../services/route-service'
import { ICommunityUsers } from '../stores/community-store.d'
import { ymdhm } from '../utils/moment-util'
import './Home.scss'

export const Home: FC = () => {
  const { $ui, $auth, $user } = useStore()
  const [usersListToApprove, setUsersListToApprove] = useState<ICommunityUsers[] | undefined>()

  useEffect(() => {
    $ui.setIsHeaderBar(true)
    $ui.setIsBottomTab(true)
  })

  useEffect(() => {
    if($auth.getIsAdmin && $auth.getIsLogin) getCommunityInfo();
    else {
      route.signIn();
      return;
    }
  }, [$auth.getCommunityInfo.users, $auth.getCommunityInfo.adminUsers])

  const changeStatus = (checkedYn: boolean, a: ICommunityUsers, i: number) => {
    !checkedYn ? (a = { ...a, status: SIGN_UP_STATUS.PENDING }) : (a = { ...a, status: SIGN_UP_STATUS.APPROVAL })
    if (usersListToApprove) usersListToApprove[i] = a
  }

  // 승인 버튼 클릭시
  const apvOrCnclBtnClick = (action: string) => {
    const saveObj = usersListToApprove?.filter((a) => a.status !== SIGN_UP_STATUS.PENDING);
    
    if (_.isEmpty(saveObj)) {
      $ui.showAlert({
        isOpen: true,
        header: '확인',
        message: '사용자에 체크해 주세요.',
        oneBtn: true,
      })
    } else {
      $ui.showAlert({
        isOpen: true,
        header: '확인',
        message: `[${action === SIGN_UP_STATUS.APPROVAL ? '승인' : '승인 거부'}] 진행 하시겠습니까?`,
        onSuccess() {
          return saveObj?.map(async (a) => {
            // 1. 사용자 정보 업데이트
            await $user.updateCommunityUser(a.id, action)
            await $auth.signInWithToken()
            getCommunityInfo()
          })
        },
      })
    }
  }

  const getCommunityInfo = () => {
    setUsersListToApprove(
      $auth.getCommunityInfo?.users
        .filter((a) => !a.roles.includes(USER_ROLE.ADMIN))
        .filter((a) => a.status === SIGN_UP_STATUS.PENDING) 
    )
  }

  const refresh = async() => {
    setUsersListToApprove([])
    await $auth.signInWithToken()
    getCommunityInfo()
  }

  return (
    <Observer>
      {() => 
        <IonPage>
          <PageHeader pageTitle='관리하마' noticeYn={true} viewType={VIEW_TYPE.PAGE} />
          <IonContent>
            
            <RoundSquareSection bgColor='#FFF6DB'>  
              <section className='hello-box'>
                <TextXxl className='text-bold'>안녕하세요!</TextXxl>
                <div className='login-user-name'>{$auth.getAuthInfo?.name}</div>
                <div className='maeul-name'>{$auth.getCommunityInfo?.name} 하마지기</div>
              </section>
            </RoundSquareSection>
            
            <RoundSquareSection bgColor='#f5f5f5'>
              <div className='apv-wrap'>
                <div className='tit-box'>
                  <TextXxl className='text-bold'>가입승인을 기다려요</TextXxl>
                  <strong className='badge'>{usersListToApprove?.length}</strong>
                </div>
                  <IonButtons>
                    <IonIcon
                      className='refresh-btn'
                      onClick={refresh}
                      slot='icon-only'
                      size='24'
                      icon={refreshOutline}
                    />
                  </IonButtons>
                <div className="apv-btn-wrap">
                  {usersListToApprove && usersListToApprove?.length < 1 ? (
                    <></>
                  ) : (
                    <IonButtons>
                      <IonButton className='del-btn' color='#' size='small' onClick={() => apvOrCnclBtnClick(SIGN_UP_STATUS.DISAPPROVAL)}>
                        승인 거부
                      </IonButton>
                      <IonButton className='apv-btn' color='#' size='small' onClick={() => apvOrCnclBtnClick(SIGN_UP_STATUS.APPROVAL)}>
                        승인
                      </IonButton>
                    </IonButtons>
                  )}
                </div>

                {usersListToApprove && usersListToApprove?.length === 0 ? (
                  <div className="no-apv-list-txt">쨕쨕쨕! 모두 승인 하셨네요!</div>
                ) : (
                  <div className='apv-list-wrap'>
                    { usersListToApprove && usersListToApprove.map((item, index) => (
                      <>
                        <IonItem key={index + item.id} lines="none" className="item-content" style={{width:'100%'}}>
                          <IonCheckbox
                            checked={item.status === SIGN_UP_STATUS.PENDING ? false : true}
                            color='light'
                            onIonChange={(e) => changeStatus(e.detail.checked, item, index)}
                          />
                          <IonLabel className='apv-list-dtl'>
                            <div>
                              <h3 className='inline'>{item.name}</h3>
                            </div>
                            <h4 className='inline'>{ymdhm(item.createdAt)}</h4>
                            <h4 className='inline'>{item.email}</h4>
                            <p>{item.introduce}</p>
                          </IonLabel>
                        </IonItem>
                        <span className='under-line' />
                      </>
                    ))}
                  </div>
                )}
              </div>
            </RoundSquareSection>
          </IonContent>
        </IonPage>
      }
    </Observer>
  )
}
