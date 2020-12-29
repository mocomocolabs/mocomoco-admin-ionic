import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react';
import { helpCircle, helpCircleOutline, home, homeOutline, informationCircle, informationCircleOutline, settings, settingsOutline, shirt, shirtOutline, trophy, trophyOutline } from 'ionicons/icons';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  menuGrp: string;
  level?: number;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: home,
    menuGrp: 'home'
  },
  {
    title: '마을씨 관리',
    url: '',
    iosIcon: '',
    mdIcon: '',
    menuGrp: 'townMng',
    level: 1
  },
  {
    title: '마을씨 조회',
    url: '/userList',
    iosIcon: shirtOutline,
    mdIcon: shirt,
    menuGrp: 'user',
    level: 2
  },
  {
    title: '시스템 관리',
    url: '/system',
    iosIcon: trophyOutline,
    mdIcon: trophy,
    menuGrp: 'sys',
    level: 1
  },
  {
    title: 'System',
    url: '/system',
    iosIcon: trophyOutline,
    mdIcon: trophy,
    menuGrp: 'sys',
    level: 2
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircle,
    menuGrp: 'sys',
    level: 2
  },
  {
    title: 'Settings',
    url: '/settings',
    iosIcon: settingsOutline,
    mdIcon: settings,
    menuGrp: 'sys',
    level: 2
  },
  {
    title: 'Help',
    url: '/help',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircle,
    menuGrp: 'sys',
    level: 2
  },
]
export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type='overlay' menuId='leftSidebar'>
      <IonContent>
        <IonList id='inbox-list'>
          {appPages.map((appPage, index) => {
            if (appPage.level === 1) {
              return (<IonListHeader key={index}>{appPage.title}</IonListHeader>)
            } else return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? 'selected' : ''
                  }
                  routerLink={appPage.url}
                  routerDirection='none'
                  lines='none'
                  detail={false}>
                  <IonIcon
                    slot='start'
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
      </IonContent>
    </IonMenu>
  )
}