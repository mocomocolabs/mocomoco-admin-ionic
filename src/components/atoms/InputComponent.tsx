import { IonInput, IonItem, IonLabel } from '@ionic/react'
import React, { FC } from 'react'

export interface IInput {
  value?: string
  placeholder?: string
  label?: string
  onChange?: (v: string) => void
  passwordType?: boolean
  disabled?: boolean
}

export const Input: FC<IInput> = ({ value, placeholder, label, onChange, passwordType, disabled }) => {
  return (
    <div className='border-border px-3'>
      <IonItem>
        {label ? (<IonLabel position="fixed">{label}</IonLabel>): null}
        <IonInput
          type={passwordType ? "password" : undefined}
          value={value}
          placeholder={placeholder}
          onIonChange={(e) => onChange && onChange(e.detail.value!)}
          disabled={disabled}
        />
      </IonItem>
    </div>
  )
}
