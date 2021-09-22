import { Example } from './pages/Example'
import { Home } from './pages/Home'
import { MyInf } from './pages/MyInf'
import { MyPage } from './pages/MyPage'
import { SignIn } from './pages/SignIn'
import { TownEvent } from './pages/TownEvent'
import { TownInf } from './pages/TownInf'
import { UserSearch } from './pages/UserSearch'
import { Help } from './pages/Help'

import { IonRouterOutlet } from '@ionic/react'
import { Redirect, Route } from 'react-router-dom'
import { route } from '../src/services/route-service'
import { Sidebar } from './components/organisms/SidebarComponent'
import { GuardRoute } from './GuardRoute'
import React from 'react'
import { IonReactRouter } from '@ionic/react-router'

export const RouterTab: React.FC = () => {
  return (
    <IonReactRouter history={route.history}>
      <Sidebar />
      {/* <IonTabs> */}
      <IonRouterOutlet id='main'>
        <Route path='/sign-in' component={SignIn} exact />
        <GuardRoute path='/home' component={Home} exact />
        <GuardRoute path='/userList' component={UserSearch} exact />
        <GuardRoute path='/my-page' component={MyPage} exact />
        <GuardRoute path='/example' component={Example} exact />
        <GuardRoute path='/myInf' component={MyInf} exact />
        <GuardRoute path='/townInf' component={TownInf} exact />
        <GuardRoute path='/townEvent' component={TownEvent} exact />
        <GuardRoute path='/help' component={Help} exact />
        <Redirect from='/' to='/home' exact />
      </IonRouterOutlet>
    </IonReactRouter>
  )
}