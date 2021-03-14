// import { IonInput, IonItem, IonLabel } from '@ionic/react'
// import React, { FC } from 'react'

// export interface IInput {
//   value?: string
//   placeholder?: string
//   label?: string
//   onChange?: (v: string) => void
//   passwordType?: boolean
//   disabled?: boolean
// }

// export const Input: FC<IInput> = ({ value, placeholder, label, onChange, passwordType, disabled }) => {
//   return (
//     <div className='border-border px-3'>
//       <IonItem>
//         {label ? (<IonLabel position="fixed">{label}</IonLabel>): null}
//         <IonInput
//           type={passwordType ? "password" : undefined}
//           value={value}
//           placeholder={placeholder}
//           onIonChange={(e) => onChange && onChange(e.detail.value!)}
//           disabled={disabled}
//         />
//       </IonItem>
//     </div>
//   )
// }

import React, { FC } from 'react'

export interface IInput {
  className?: string
  name?: string
  type?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  onChange?: (v: string) => void
  // eslint-disable-next-line
  register?: any
  disabled?: boolean
}

export const Input: FC<IInput> = ({
  className,
  name,
  type,
  value,
  defaultValue,
  placeholder,
  onChange,
  register,
  disabled,
}) => {
  return (
    <input
      className={className}
      type={type || 'text'}
      name={name}
      value={value}
      defaultValue={defaultValue}
      placeholder={placeholder}
      onChange={(e) => onChange && onChange(e.target.value!)}
      ref={register}
      disabled={disabled}
    ></input>
  )
}
