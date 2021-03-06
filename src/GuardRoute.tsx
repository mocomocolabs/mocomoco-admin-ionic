// 여기가 사용자가 로그인된 상태면 home으로 보내주고 아니면 Login화면 보내주는 곳.
import { useObserver } from 'mobx-react-lite'
import React, { FC } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useStore } from './hooks/use-store'

export interface IGuardRoute {
  // eslint-disable-next-line
  component: React.FC<any>
  path: string
  exact: boolean
}

export const GuardRoute: FC<IGuardRoute> = ({ component, path, exact }: IGuardRoute) => {
  const { $auth } = useStore()
  return useObserver(() =>
    $auth.isLogin === true ? (
      <Route path={path} exact={exact} component={component} />
    ) : (
      <Redirect to='/sign-in'></Redirect>
    )
  )
}
