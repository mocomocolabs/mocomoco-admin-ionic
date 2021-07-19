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
  onKeyUpEnterFn?: Function
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
  onKeyUpEnterFn
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
      onKeyUp={(e) => e.key === 'Enter' && onKeyUpEnterFn !== undefined && onKeyUpEnterFn()}
    ></input>
  )
}
