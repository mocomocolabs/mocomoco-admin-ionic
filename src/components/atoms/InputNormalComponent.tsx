import React, { FC } from 'react'
import { IInput, Input } from './InputComponent'

export const InputNormal: FC<IInput> = (props) => {
  return (
    <div className='input-normal-wrap'>
      <Input {...props} className='w-full h-10 my-1'></Input>
    </div>
  )
}
