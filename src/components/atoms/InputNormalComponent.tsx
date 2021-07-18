import _ from 'lodash'
import React, { FC } from 'react'
import { IInput, Input } from './InputComponent'

export const InputNormal: FC<IInput> = (props) => {
  const cn = `${props.className} input-normal-wrap`
  return (
    <div className={!_.isEmpty(props.className) ? cn : 'input-normal-wrap'}>
      <Input {...props} className='w-full inputHeight mt10'></Input>
    </div>
  )
}
