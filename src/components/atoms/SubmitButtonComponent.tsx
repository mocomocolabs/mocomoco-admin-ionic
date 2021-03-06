import React, { FC } from 'react'

export interface ISubmitButton {
  text: string
  disabled?: boolean
  onClick?: () => void
}

export const SubmitButton: FC<ISubmitButton> = ({ text, disabled = false, onClick }) => {
  return (
    <button
      type='submit'
      className={`w-full h-10 ${disabled ? 'bg-gray' : 'bg-yellow'} submit-btn`}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  )
}
