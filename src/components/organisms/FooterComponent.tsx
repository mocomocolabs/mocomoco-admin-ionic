import { IonFooter } from '@ionic/react'
import { FC } from 'react'

export interface IFooter {
  hidden?: boolean
  className?: string
  noBorder?: boolean
  children?: React.ReactNode
}

export const Footer: FC<IFooter> = ({ hidden = false, className = '', noBorder = false, children }) => (
  <IonFooter
    hidden={hidden}
    className={`px-container w-full ion-no-border ${noBorder ? '' : 'shadow-sm'} ${className}`}
  >
    <div className='flex-between-center min-height-56 w-full'>{children}</div>
  </IonFooter>
)
