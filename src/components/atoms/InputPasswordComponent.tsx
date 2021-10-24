import { IonIcon } from '@ionic/react'
import { eyeOff, eyeOutline } from 'ionicons/icons'
import { FC, useState } from 'react'
import { IInput, Input } from './InputComponent'

export const InputPassword: FC<IInput> = (props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='relative'>
      <Input {...props} className='inputpassword' type={showPassword ? 'text' : 'password'}></Input>
      <IonIcon
        onClick={() => setShowPassword(!showPassword)}
        icon={showPassword ? eyeOff : eyeOutline}
        className='absolute-vertical-center right-0 mr-2 icon-primary'
      ></IonIcon>
    </div>
  )
}
