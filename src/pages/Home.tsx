// description: 홈 화면
// path: /home
// fileName: Home.tsx
// created: 2021-01-03, 이지혜
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
import { useObserver } from 'mobx-react-lite'
import { default as React, useEffect, useState } from 'react'
import { TextXxl } from '../components/atoms/TextXxlComponent'
import { PageHeader } from '../components/molecules/PageHeaderComponent'
import { useStore } from '../hooks/use-store'
import { ICommunityUsers } from '../stores/auth-store.d'
import { ymdhm } from '../utils/moment-util'
import './Home.scss'

export const Home: React.FC = () => {
  const { $ui, $auth, $user } = useStore()
  const [usersListToApprove, setUsersListToApprove] = useState<ICommunityUsers[] | undefined>()
  const [isShowApvCompleteAlert, setIsShowApvCompleteAlert] = useState<boolean>()
  // const [curOpenIntroduceId, setCurOpenIntroduceId] = useState<number>()

  useIonViewWillEnter(() => {
    console.log('-------2------ will enter!!');

    // ui셋
    $ui.setIsHeaderBar(true)
  })

  useEffect(() => {
    console.log('--------1---------use Effect!!')
    // 마을 소모임 겟
    //   $auth.getTownEvent()

    // 승인리스트 셋
    setUsersListToApprove(
      $auth.getCommunityInfo.users
        .filter((a) => !a.roles.includes("ROLE_ADMIN")) // admin 제외
        .filter((a) => a.status !== 'APPROVAL') // approval 제외
    )
  }, [$auth.getCommunityInfo.users, $auth.getCommunityInfo.adminUsers])

  const changeStatus = (checkedYn: boolean, a: ICommunityUsers, i: number) => {
    console.log('클릭하면!')
    console.log(usersListToApprove)
    console.log(isShowApvCompleteAlert)

    !checkedYn ? (a = { ...a, status: 'PENDING' }) : (a = { ...a, status: 'APPROVAL' })
    if (usersListToApprove) usersListToApprove[i] = a
  }

  const apvBtnClick = () => {
    const saveObj = usersListToApprove?.filter((a) => a.status !== 'PENDING')
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
            await $user.updateCommunityUser(a.id, 'APPROVAL')
            // 2. 성공 팝업 show
            setIsShowApvCompleteAlert(true)
            // 3. 데이터 재조회
            await $auth.signInWithToken()
            // 4. 테이블 재렌더링
            setUsersListToApprove(
              $auth.getCommunityInfo.users
                .filter((a) => !a.roles.includes("ROLE_ADMIN")) // admin 제외
                .filter((a) => a.status !== 'APPROVAL') // approval 제외
            )
          })
        },
      })
    }
  }

  // TODO: 중복되는 코드를 어떻게 합칠 수 있을까?
  const researchAndRerenderTable = async () => {
    await $auth.signInWithToken()
    setUsersListToApprove(
      $auth.getCommunityInfo.users
        .filter((a) => !a.roles.includes("ROLE_ADMIN")) // admin 제외
        .filter((a) => a.status !== 'APPROVAL') // approval 제외
    )
  }

  // const randomImgNm = () => {
  //   const ImgArr = [13,14,15,16,17,18,19]
  //   return ImgArr[Math.floor(Math.random() * 7)] 
  // }

  return useObserver(() => (
    <IonPage>
      <PageHeader pageTitle='하마 ADMIN' menuBtn={true} userBtn={true} />
      <IonContent>
        <div className='px-container'>
          {/* <IonButtons slot='start'>
            <IonButton style={{borderBottom:'1px solid #ccc', color: '#ccc'}} slot='end' color='dark' routerLink='/home'>
              우리마을 조회
            </IonButton>
            <IonButton style={{borderBottom:'1px solid #ccc', color: '#ccc'}} slot='end' color='dark' routerLink='/home'>
              우리마을정보
            </IonButton>
          </IonButtons> */}
          <div style={{ marginTop: '20px', overflow: 'auto' }} className='apv-wrap'>
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
                onClick={researchAndRerenderTable}
                slot='icon-only'
                size='large'
                icon={refreshOutline}
              ></IonIcon>
            </div>
            {usersListToApprove && usersListToApprove?.length < 1 ? (
              <div style={{ marginLeft: '15px', fontSize: '15px', color: '#555' }}>쨕쨕쨕! 모두 승인 하셨네요!</div>
            ) : (
              <div className='apv-list-wrap' style={{ marginLeft: '-5px' }}>
              { usersListToApprove && usersListToApprove.map((item, index) => (
                <>
                  {/* <IonItem lines="none" style={{height:'25px'}}> 
                    <IonIcon
                      icon={curOpenIntroduceId === item.id ? removeOutline : addOutline}
                      className='absolute right-0 top-0 mt10'
                      onClick={() => curOpenIntroduceId !== item.id ? setCurOpenIntroduceId(item.id) : setCurOpenIntroduceId(0)}
                    />
                  </IonItem> */}
                  <IonItem lines="none"> 
                    <IonCheckbox
                      className='mr5'
                      checked={item.status === 'PENDING' ? false : true}
                      color='light'
                      onIonChange={(e) => changeStatus(e.detail.checked, item, index)}
                    />
                    <IonLabel style={{width:'100px'}}>
                      <div>
                        <h2 className='inline'>{item.name}</h2>
                        <h4 className='inline' style={{textAlign: 'right', color:'#3f2e99'}}> {ymdhm(item.createdAt)} 신청</h4>
                      </div>
                      <h4>{item.email}</h4>
                      <p style={{whiteSpace:'normal'}}>{item.introduce}</p>
                      { curOpenIntroduceId === item.id ? 
                        <>
                          <p>{item.email}</p>
                        </> : null 
                      }
                    </IonLabel>
                  </IonItem>
                </>
              ))}
              </div>
            )}
          </div>
          {/* <br /> */}
          {/* <hr className='gray-bar' /> */}
        </div>
      </IonContent>
    </IonPage>
  ))
}
