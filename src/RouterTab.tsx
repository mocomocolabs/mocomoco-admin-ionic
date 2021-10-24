import { Home } from './pages/Home'
import { MyInf } from './pages/MyInf'
import { SignIn } from './pages/SignIn'
import { TownInf } from './pages/TownInf'
import { UserSearch } from './pages/UserSearch'
import { Help } from './pages/Help'

import { IonContent, IonIcon } from '@ionic/react'
import { NavLink, Redirect, Route, Switch } from 'react-router-dom'
import { route } from '../src/services/route-service'
import { GuardRoute } from './GuardRoute'
import { FC } from 'react'
import { IonReactRouter } from '@ionic/react-router'
import { home, search, person } from 'ionicons/icons'
import { Observer } from 'mobx-react-lite'
import { Footer } from './components/organisms/FooterComponent'
import { useStore } from './hooks/use-store'
import './RouterTab.scss';

export const RouterTab: FC = () => {
  const { $ui, $auth } = useStore()

  return (
    <IonReactRouter history={route.history}>
      <IonContent>
        <Switch>
        {/* <Sidebar /> */}
        {/* IonRouterOutlet 이걸 안썼더니 새로고침시에 sign-in페이지 잠깐 보이는게 없어짐. */}
        {/* <IonRouterOutlet id='main'> */}
          <Route path='/sign-in' component={SignIn} exact />
          <GuardRoute path='/home' component={Home} exact />
          <GuardRoute path='/search' component={UserSearch} exact />
          <GuardRoute path='/my-page' component={MyInf} exact />
          <GuardRoute path='/town-info' component={TownInf} exact />
          <GuardRoute path='/help' component={Help} exact />
          <Redirect from='/' to='/home' exact />
        {/* </IonRouterOutlet> */}
        </Switch>
      </IonContent>

      <Observer>
        {() => (
          $auth.isLogin && $auth.isAdmin ?
          <Footer hidden={!$ui.isBottomTab}>
            <>
              <NavLink key='home' to='/home' onClick={() => route.home()}>
                <IonIcon slot='icon-only' icon={home} size='24' className='nav-icon'/>
              </NavLink>
              <NavLink key='search' to='/search' onClick={() => route.search()}>
                <IonIcon slot='icon-only' icon={search} size='24' className='nav-icon'/>
              </NavLink>
              <NavLink key='my-page' to='/my-page' onClick={() => route.myPage()}>
                <IonIcon slot='icon-only' icon={person} size='24' className='nav-icon'/>
              </NavLink>
            </>
          </Footer>
          : <></>
        )}
      </Observer>
    </IonReactRouter>
  )
}