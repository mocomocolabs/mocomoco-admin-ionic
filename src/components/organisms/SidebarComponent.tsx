import { menuController } from '@ionic/core'
import {
  IonButton,
  IonButtons,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
} from '@ionic/react'
import {
  closeOutline,
  helpCircle,
  helpCircleOutline,
  home,
  homeOutline,
  settings,
  settingsOutline,
  shirt,
  shirtOutline,
  trophy,
  trophyOutline,
} from 'ionicons/icons'
import React from 'react'
import { useLocation } from 'react-router-dom'
import { useStore } from '../../hooks/use-store'
import { XDivider } from '../atoms/XDividerComponent'
import './Sidebar.scss'
interface AppPage {
  url: string
  iosIcon: string
  mdIcon: string
  title: string
  menuGrp: string
  level?: number
  author: string
  menuId: number
  upMenuId: number
}

const appPages: AppPage[] = [
  {
    title: '우리마을관리',
    url: '',
    iosIcon: '',
    mdIcon: '',
    menuGrp: 'townMng',
    level: 1,
    author: 'ADMIN',
    menuId: 20,
    upMenuId: 0,
  },
  {
    title: '우리마을정보',
    url: '/townInf',
    iosIcon: shirtOutline,
    mdIcon: shirt,
    menuGrp: 'user',
    level: 2,
    author: 'ADMIN',
    menuId: 21,
    upMenuId: 20,
  },
  {
    title: '우리마을사람들',
    url: '/userList',
    iosIcon: shirtOutline,
    mdIcon: shirt,
    menuGrp: 'user',
    level: 2,
    author: 'ADMIN',
    menuId: 22,
    upMenuId: 20,
  },
  {
    title: '우리마을일정',
    url: '/townEvent',
    iosIcon: shirtOutline,
    mdIcon: shirt,
    menuGrp: 'user',
    level: 2,
    author: 'ADMIN',
    menuId: 23,
    upMenuId: 20,
  },
  {
    title: '시스템 관리',
    url: '/system',
    iosIcon: trophyOutline,
    mdIcon: trophy,
    menuGrp: 'sys',
    level: 1,
    author: 'SYS',
    menuId: 30,
    upMenuId: 0,
  },
  {
    title: '메뉴관리',
    url: '/menu',
    iosIcon: trophyOutline,
    mdIcon: trophy,
    menuGrp: 'sys',
    level: 2,
    author: 'SYS',
    menuId: 31,
    upMenuId: 30,
  },
  // {
  //   title: 'About',
  //   url: '/about',
  //   iosIcon: informationCircleOutline,
  //   mdIcon: informationCircle,
  //   menuGrp: 'sys',
  //   level: 2
  // },
  {
    title: '기타',
    url: '/',
    iosIcon: settingsOutline,
    mdIcon: settings,
    menuGrp: 'sys',
    level: 1,
    author: 'ADMIN',
    menuId: 40,
    upMenuId: 0,
  },
  {
    title: '앱 설정',
    url: '/settings',
    iosIcon: settingsOutline,
    mdIcon: settings,
    menuGrp: 'sys',
    level: 2,
    author: 'ADMIN',
    menuId: 41,
    upMenuId: 40,
  },
  // {
  //   title: 'Help',
  //   url: '/help',
  //   iosIcon: helpCircleOutline,
  //   mdIcon: helpCircle,
  //   menuGrp: 'sys',
  //   level: 2
  // },
  {
    title: '예시 코드',
    url: '/example',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircle,
    menuGrp: 'exsample',
    level: 2,
    author: 'ADMIN',
    menuId: 42,
    upMenuId: 40,
  },
]
export const Sidebar: React.FC = () => {
  const location = useLocation()
  const { $auth } = useStore()

  return (
    <IonMenu contentId='main' type='overlay' menuId='leftSidebar' color='dark'>
      <IonContent>
        <IonList id='inbox-list'>
          <div className='menu-close flex'>
            <IonLabel className='ml-5 mt-3 mb-2'>
              안녕하세요, {$auth.getAuthInfo && $auth.getAuthInfo.name}님!
            </IonLabel>
            <IonButtons className='ml-auto mt-1' slot='end'>
              <IonButton slot='end' color='dark' onClick={() => menuController.close()}>
                <IonIcon slot='icon-only' icon={closeOutline} size='default' />
              </IonButton>
            </IonButtons>
          </div>
          {appPages.map((page, index) => {
            if (page.author === 'SYS') return
            if (page.level === 1) {
              return (
                <>
                  <XDivider />
                  <IonListHeader key={index + page.title}>
                    {' '}
                    {/* TODO: ununiq key!! */}
                    <IonLabel>{page.title}</IonLabel>
                  </IonListHeader>
                </>
              )
            } else
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem
                    className={location.pathname === page.url ? 'selected' : '' && index === 0 ? 'mt-8' : ''}
                    routerLink={page.url}
                    routerDirection='none'
                    lines='none'
                    detail={false}
                  >
                    <IonIcon slot='start' ios={page.iosIcon} md={page.mdIcon} />
                    <IonLabel>{page.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              )
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}
