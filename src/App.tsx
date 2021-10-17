import { IonApp } from '@ionic/react'
import { Observer } from 'mobx-react-lite'
import { FC, useEffect, useState } from 'react'
import './App.scss'
import { Spinner } from './components/atoms/SpinnerComponent'
import { Alert } from './components/molecules/AlertComponent'
import './global.scss'
import { useStore } from './hooks/use-store'
import { RouterTab } from './RouterTab'

export const App: FC = () => {
  const { $auth } = useStore()
  const [ intialized, setInitailzed ] = useState(false)

  useEffect(() => {
    init();
  })

  const init = () => {
    console.log('admin init called');
    $auth.signInWithToken();
    setInitailzed(true);
  }

  return (
    <Observer>
      {() => (
        <IonApp>
          {intialized ? <RouterTab /> : <Spinner position='center' color='white' />}
          <Alert />
        </IonApp>
      )}
    </Observer>
  )
}
