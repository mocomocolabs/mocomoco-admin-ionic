import { IonIcon } from '@ionic/react'
import { closeOutline } from 'ionicons/icons'
import React, { FC } from 'react'
import { route } from '../../services/route-service'

export interface IBackButton {
  icon?: string
  action?: () => void
}

export const BackButton: FC<IBackButton> = ({ icon = closeOutline, action }) => {
  const defaultAction = () => route.goBack()

  return (
    <div onClick={action ?? defaultAction}>
      <IonIcon icon={icon} size='large'></IonIcon>
    </div>
  )
}
