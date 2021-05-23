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
import { Help } from './pages/Help'

export const App: React.FC = () => {
  const { $auth } = useStore()
  const [intialized, setInitailzed] = useState(false)

  useEffect(() => {
    // TODO: 왜 새로고침을 하면 이게 두번 실행되는지 알아야겠음.
    init()
    return () => {
      console.log('APP컴포넌트 cleanup')
    }
  })

  const init = async () => {
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
            <GuardRoute path='/help' component={Help} exact />
            <Redirect from='/' to='/home' exact />
          </IonRouterOutlet>
        </IonReactRouter>
      ) : (
        <Spinner isFull={true} color='white'></Spinner>
      )}
      <Alert></Alert>
    </IonApp>
  ))
}
