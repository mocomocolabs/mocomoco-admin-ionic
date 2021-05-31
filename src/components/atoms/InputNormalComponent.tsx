import React, { FC } from 'react'
import { IInput, Input } from './InputComponent'

export const InputNormal: FC<IInput> = (props) => {
  return (
    <div className='input-normal-wrap'>
      <Input {...props} className='w-full inputHeight mt10'></Input>
    </div>
  )
}
