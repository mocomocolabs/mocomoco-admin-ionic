// description: 페이지 헤더영역
// fileName: PageHeader.tsx
// created: 2021-01-09, 이지혜
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react'
import { chevronBack, closeOutline, home,  notifications } from 'ionicons/icons'
import { Observer } from 'mobx-react-lite'
import { FC } from 'react'
import { useStore } from '../../hooks/use-store'
import { VIEW_TYPE } from '../../models/constant.d'
import { TextHeader } from '../atoms/TextHeaderComponent'
import './PageHeader.scss'
interface IPageHeader {
  pageTitle: string
  viewType: VIEW_TYPE
  homeBtn?: boolean
  noticeYn?: boolean
  closeLeftBtn?: boolean
  closeRightBtn?: boolean
  backRouterUrl?: string
  closeRightBtnUrl?: string
}
export const PageHeader: FC<IPageHeader> = ({
  pageTitle,
  viewType = VIEW_TYPE.PAGE,
  homeBtn,
  noticeYn,
  closeLeftBtn,
  closeRightBtn,
  backRouterUrl,
  closeRightBtnUrl,
}) => {
  const { $ui } = useStore()

  return (
    <Observer>
    {() => 
      $ui.getIsHeaderBar ? (
        <IonHeader>
          <IonToolbar>
            {closeLeftBtn && (
              <IonButtons slot='start'>
                <IonButton slot='end' color='dark' routerLink='/home'>
                  <IonIcon slot='icon-only' icon={closeOutline} size='default' />
                </IonButton>
              </IonButtons>
            )}

            {/* 뒤로가는 버튼 */}
            {viewType === VIEW_TYPE.MODAL && (
              <IonButtons slot='start'>
                <IonButton slot='end' color='dark' routerLink={backRouterUrl}>
                  <IonIcon slot='icon-only' icon={chevronBack} size='default' />
                </IonButton>
              </IonButtons>
            )}

            {/* 화면명 */}
            <IonTitle>
              {viewType === VIEW_TYPE.PAGE ? 
                <span className='hama-logo'>
                  <img src='/assets/img/hamalogo.png' alt='hamalogo'/>
                  <span>{ pageTitle }</span>
                </span>
                : <span><TextHeader className='ellipsis'>{ pageTitle }</TextHeader></span>}
            </IonTitle>
            <IonButtons slot='end'>
              {homeBtn && (
                <IonButton slot='end' color='dark' routerLink='/home'>
                  <IonIcon slot='end' ios={home} md={home} icon={home} size='default' />
                </IonButton>
              )}

              {/* 알림 */}
              {noticeYn && (
                <IonButton slot='end' color='dark' routerLink='/help'>
                  <IonIcon slot='end' ios={notifications} md={notifications} size='default' />
                </IonButton>
              )}

              {closeRightBtn && (
                <IonButtons slot='end'>
                  <IonButton slot='end' color='dark' routerLink={closeRightBtnUrl ? closeRightBtnUrl : '/home'}>
                    <IonIcon slot='icon-only' icon={closeOutline} size='default' />
                  </IonButton>
                </IonButtons>
              )}
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      ) : (
        <></>
      )
    }
  </Observer>
  )
}
