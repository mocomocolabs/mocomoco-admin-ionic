// description: 페이지 헤더영역
// fileName: PageHeader.tsx
// created: 2021-01-09, 이지혜
import { IonButton, IonButtons, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/react'
import { chevronBack, closeOutline, home } from 'ionicons/icons'
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
                <span className='hama-logo'>
                  {viewType === VIEW_TYPE.PAGE ? 
                    <img src='/assets/img/hamalogo.png' alt='hamalogo'/> 
                    : <></>
                  }
                  <span><TextHeader className='ellipsis'>{ pageTitle }</TextHeader></span>
                </span>
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
                  <svg width="24" height="16" viewBox="0 0 240 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M146.962 0.978027H145.009L85.568 33.611H42.605C19.113 33.611 0 52.723 0 76.216C0 97.228 15.301 114.69 35.334 118.159L21.56 166.585H69.083L82.667 118.829H85.568L145.011 151.457H146.964C159.549 151.457 169.79 141.218 169.79 128.631V23.803C169.787 11.219 159.546 0.978027 146.962 0.978027ZM57.592 151.366H41.71L50.062 122.002H65.944L57.592 151.366ZM109.459 114.581L89.471 103.609H42.605C27.502 103.609 15.217 91.319 15.217 76.216C15.217 61.113 27.502 48.828 42.605 48.828H89.471L109.459 37.854V114.581ZM154.57 128.631C154.57 132.268 152.003 135.314 148.592 136.062L124.676 122.935V29.502L148.592 16.372C152.006 17.12 154.57 20.169 154.57 23.806V128.631Z" fill="#3f2e99"/>
                    <path d="M198.989 43.3771L188.106 54.2601C193.729 62.0491 197.082 71.5801 197.082 81.8971C197.082 92.2171 193.729 101.748 188.106 109.534L198.989 120.417C207.315 109.788 212.299 96.4171 212.299 81.8971C212.299 67.3771 207.315 54.0071 198.989 43.3771Z" fill="#3f2e99"/>
                    <path d="M218.358 24.009L207.564 34.803C218.046 47.659 224.346 64.055 224.346 81.897C224.346 99.742 218.046 116.135 207.564 128.991L218.358 139.785C231.574 124.137 239.563 103.936 239.563 81.897C239.563 59.858 231.574 39.657 218.358 24.009Z" fill="#3f2e99"/>
                  </svg>
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
