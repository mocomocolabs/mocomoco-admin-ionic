import { IonContent, IonIcon, IonItem, IonLabel, IonList, IonListHeader, IonMenu, IonMenuToggle } from '@ionic/react';
import { helpCircle, helpCircleOutline, home, homeOutline, informationCircle, informationCircleOutline, settings, settingsOutline, shirt, shirtOutline, trophy, trophyOutline } from 'ionicons/icons';
import React from 'react';
import { useLocation } from 'react-router-dom';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/home',
    iosIcon: homeOutline,
    mdIcon: home,
  },
  {
    title: 'Teams',
    url: '/teams',
    iosIcon: shirtOutline,
    mdIcon: shirt,
  },
  {
    title: 'Competitions',
    url: '/competitions',
    iosIcon: trophyOutline,
    mdIcon: trophy,
  },
  {
    title: 'About',
    url: '/about',
    iosIcon: informationCircleOutline,
    mdIcon: informationCircle,
  },
  {
    title: 'Settings',
    url: '/settings',
    iosIcon: settingsOutline,
    mdIcon: settings,
  },
  {
    title: 'Help',
    url: '/help',
    iosIcon: helpCircleOutline,
    mdIcon: helpCircle,
  },
]
export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type='overlay' menuId='leftSidebar'>
      <IonContent>
        <IonList id='inbox-list'>
          <IonListHeader>메뉴</IonListHeader>
          {appPages.map((appPage, index) => {
            return (
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