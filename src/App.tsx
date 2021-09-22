import { IonApp } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { useEffect, useState } from 'react'
import './App.scss'
import { Spinner } from './components/atoms/SpinnerComponent'
import { Alert } from './components/molecules/AlertComponent'
import './global.scss'
import { useStore } from './hooks/use-store'
import { RouterTab } from './RouterTab'

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
      {intialized ? <RouterTab /> : <Spinner isFull={true} color='white' />}
      <Alert />
    </IonApp>
  ))
}
