// description: 페이지 헤더영역
// fileName: PageHeader.tsx
// created: 2021-01-09, 이지혜
import { IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react'
import { chevronBack, closeOutline, home, person, personCircle } from 'ionicons/icons'
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { useStore } from '../../hooks/use-store'

interface IPageHeader {
  pageTitle: string
  menuBtn?: boolean
  backBtn?: boolean
  homeBtn?: boolean
  userBtn?: boolean
  closeLeftBtn?: boolean
  closeRightBtn?: boolean
  backRouterUrl?: string
  closeRightBtnUrl?: string
}
export const PageHeader: FC<IPageHeader> = ({
  pageTitle,
  menuBtn,
  backBtn,
  closeLeftBtn,
  homeBtn,
  userBtn,
  closeRightBtn,
  backRouterUrl,
  closeRightBtnUrl,
}) => {
  const { $ui } = useStore()

  return useObserver(() =>
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
          {backBtn && (
            <IonButtons slot='start'>
              <IonButton slot='end' color='dark' routerLink={backRouterUrl ? backRouterUrl : '/home'}>
                <IonIcon slot='icon-only' icon={chevronBack} size='default' />
              </IonButton>
            </IonButtons>
          )}
          {menuBtn && (
            <IonButtons slot='start'>
              <IonMenuButton autoHide={false} color='dark'></IonMenuButton>
            </IonButtons>
          )}
          <IonTitle>
            <span>{pageTitle}</span>
          </IonTitle>
          <IonButtons slot='end'>
            {homeBtn && (
              <IonButton slot='end' color='dark' routerLink='/home'>
                <IonIcon slot='end' ios={home} md={home} icon={home} size='default' />
              </IonButton>
            )}
            {userBtn && (
              <IonButton slot='end' color='dark' routerLink='/myInf'>
                <IonIcon slot='end' ios={personCircle} md={person} size='default' />
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
  )
}
