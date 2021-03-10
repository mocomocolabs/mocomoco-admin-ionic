import { IonApp, IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { route } from '../src/services/route-service'
import './App.scss'
import { Spinner } from './components/atoms/SpinnerComponent'
import { Alert } from './components/molecules/AlertComponent'
import { Sidebar } from './components/organisms/SidebarComponent'
import './global.scss'
import { GuardRoute } from './GuardRoute'
import { useStore } from './hooks/use-store'
import { ChangePwd } from './pages/ChangePwd'
import { ConfirmPwd } from './pages/ConfirmPwd'
import { Example } from './pages/Example'
import { Home } from './pages/Home'
import { MyInf } from './pages/MyInf'
import { MyPage } from './pages/MyPage'
import { Settings } from './pages/Settings'
import { SignIn } from './pages/SignIn'
import { TownEvent } from './pages/TownEvent'
import { TownInf } from './pages/TownInf'
import { UserSearch } from './pages/UserSearch'

export const App: React.FC = () => {
  const { $community, $auth } = useStore()
  const [intialized, setInitailzed] = useState(false)

  useEffect(() => {
    init()
    // eslint-disable-next-line
  }, [])

  const init = async () => {
    // Primise.all의 처리를 다 기다리고 아래의 로직이 수행됨.
    await Promise.all([
      $auth.signInWithToken(),
      // $community.getCommunities(),
    ])

    // TODO: login 이후 실행할 공통 호출들
    setInitailzed(true)
  }

  return useObserver(() => (
    <IonApp>
      {intialized ? (
        <IonReactRouter history={route.history}>
          <Sidebar />
          {/* <IonTabs> */}
          <IonRouterOutlet id='main'>
            <Route path='/sign-in' component={SignIn} exact />
            <GuardRoute path='/home' component={Home} exact />
            <GuardRoute path='/userList' component={UserSearch} exact />
            <GuardRoute path='/my-page' component={MyPage} exact />
            <GuardRoute path='/settings' component={Settings} exact />
            <GuardRoute path='/example' component={Example} exact />
            <GuardRoute path='/myInf' component={MyInf} exact />
            <GuardRoute path='/townInf' component={TownInf} exact />
            <GuardRoute path='/townEvent' component={TownEvent} exact />
            <GuardRoute path='/confirmPwd' component={ConfirmPwd} exact />
            <GuardRoute path='/changePwd' component={ChangePwd} exact />
            <Redirect from='/' to='/home' exact />
            {/* <Route path='/feed' component={Feed} exact />
            <Route path='/feed/:id' component={FeedDetail} exact />
            <Route path='/feed-write' component={FeedWrite} exact />
            <Route path='/trade' component={Trade} exact />
            <Route path='/chat' component={Chat} exact />
            <Route path='/chat/:id' component={ChatRoom} exact /> */}
            {/* <Route path='/users/:id' component={ProfileDetail} exact />
            <Route path='/users/:id/edit' component={ProfileUpdate} exact /> */}
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
      ) : (
        <Spinner isFull={true} color='white'></Spinner>
      )}
      <Alert></Alert>
    </IonApp>
  ))
}
