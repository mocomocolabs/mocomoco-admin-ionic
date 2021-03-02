import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { route } from '../src/services/route-service'
import './App.scss'
import { Alert } from './components/molecules/AlertComponent'
import { Sidebar } from './components/organisms/SidebarComponent'
import './global.scss'
import { useStore } from './hooks/use-store'
import { ChangePwd } from './pages/ChangePwd'
import { ConfirmPwd } from './pages/ConfirmPwd'
import { Example } from './pages/Example'
import { Home } from './pages/Home'
import { MyInf } from './pages/MyInf'
import { MyPage } from './pages/MyPage'
import { Settings } from './pages/Settings'
import { TownEvent } from './pages/TownEvent'
import { TownInf } from './pages/TownInf'
import { UserSearch } from './pages/UserSearch'
export const App: React.FC = () => {
  const { $community, $ui, $chat, $auth, $user } = useStore()

  useEffect(() => {
    init()
    // TODO: login 이후 실행할 공통 호출들
    $community.getCommunities()
    $chat.getRooms()
    // eslint-disable-next-line
  }, [])

  const init = async () => {
    // 로그인
    await Promise.all([$auth.signInWithToken(), $community.getCommunities()])

    // $auth.setIsLogin()

    // TODO: login 이후 실행할 공통 호출들
    // setInitailzed(true)
  }

  return useObserver(() => (
    <IonApp>
      <IonReactRouter history={route.history}>
        <Sidebar />
        {/* <IonTabs> */}
        <IonRouterOutlet id='main'>
          <Route path='/home' component={Home} exact />
          <Route path='/userList' component={UserSearch} exact />
          {/* <Route path='/feed' component={Feed} exact />
            <Route path='/feed/:id' component={FeedDetail} exact />
            <Route path='/feed-write' component={FeedWrite} exact />
            <Route path='/trade' component={Trade} exact />
            <Route path='/chat' component={Chat} exact />
            <Route path='/chat/:id' component={ChatRoom} exact /> */}
          <Route path='/my-page' component={MyPage} exact />
          <Route path='/settings' component={Settings} exact />
          {/* <Route path='/users/:id' component={ProfileDetail} exact />
            <Route path='/users/:id/edit' component={ProfileUpdate} exact /> */}
          <Route path='/example' component={Example} exact />
          <Route path='/myInf' component={MyInf} exact />
          <Route path='/townInf' component={TownInf} exact />
          <Route path='/townEvent' component={TownEvent} exact />
          <Route path='/confirmPwd' component={ConfirmPwd} exact />
          <Route path='/changePwd' component={ChangePwd} exact />
          <Redirect from='/' to='/home' exact />
        </IonRouterOutlet>
        {/* <IonTabBar slot='bottom' hidden={!$ui.isBottomTab}>
            <IonTabButton tab='home' href='/home'>
              <IonIcon icon={home} />
            </IonTabButton>
            <IonTabButton tab='feed' href='/feed'>
              <IonIcon icon={beer} />
            </IonTabButton>
            <IonTabButton tab='trade' href='/trade'>
              <IonIcon icon={basket} />
            </IonTabButton>
            <IonTabButton tab='chat' href='/chat'>
              <IonIcon icon={paperPlane} />
              {$chat.countUnread > 0 && <div className='badge'></div>}
            </IonTabButton>
            <IonTabButton tab='my-page' href='/my-page'>
              <IonIcon icon={personCircle} />
            </IonTabButton>
          </IonTabBar> */}
        {/* </IonTabs> */}
      </IonReactRouter>

      <Alert></Alert>
    </IonApp>
  ))
}
