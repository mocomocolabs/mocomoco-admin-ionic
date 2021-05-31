import { IonIcon } from '@ionic/react'
import { eyeOff, eyeOutline } from 'ionicons/icons'
import React, { FC, useState } from 'react'
import { IInput, Input } from './InputComponent'

export const InputPassword: FC<IInput> = (props) => {
  const [showPassword, setShowPassword] = useState(false)
  // TODO: disabled(boolean), type('text', 'password') 기능확인하기.
  return (
    <div className='relative'>
      <Input {...props} className='w-full inputHeight' type={showPassword ? 'text' : 'password'}></Input>
      <IonIcon
        onClick={() => setShowPassword(!showPassword)}
        icon={showPassword ? eyeOff : eyeOutline}
        className='pwd-eye absolute-vertical-center right-0'
      ></IonIcon>
    </div>
  )
}
