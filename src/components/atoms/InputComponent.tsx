import { IonInput, IonItem, IonLabel } from '@ionic/react'
import React, { FC } from 'react'

export interface IInput {
  value?: string
  placeholder?: string
  label?: string
  onChange?: (v: string) => void
}

export const Input: FC<IInput> = ({ value, placeholder, label, onChange }) => {
  return (
    <div className='border-border px-3'>
      <IonItem>
        <IonLabel position="fixed">{label}</IonLabel>
        <IonInput
          value={value}
          placeholder={placeholder}
          onIonChange={(e) => onChange && onChange(e.detail.value!)}
        ></IonInput>
      </IonItem>
    </div>
  )
}
