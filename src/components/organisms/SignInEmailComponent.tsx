import { IonLabel } from '@ionic/react'
import { useObserver } from 'mobx-react-lite'
import React, { FC, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { InputNormal } from '../atoms/InputNormalComponent'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'
interface IEmailComponent {
  useIn: string
}
export const SignInEmail: FC<IEmailComponent> = ({ useIn }) => {
  const { register, handleSubmit, errors, watch, formState } = useForm<{ email: string; password: string }>({
    mode: 'onChange',
  })

  const password = useRef({})
  password.current = watch('password', '')

  const { $auth } = useStore()

  const onSubmit = handleSubmit((form) => {
    if (useIn === 'signIn') {
      $auth.signIn(form.email, form.password).then(() => {
        route.home()
      })
    } else {
      $auth.signIn($auth.getAuthInfo.email, form.password).then(() => {
        route.changePwd()
      })
    }
  })
  return useObserver(() =>
    useIn === 'signIn' ? (
      <form onSubmit={onSubmit}>
        <InputNormal
          name='email'
          type='email'
          placeholder='이메일'
          register={register({
            required: '이메일을 입력해주세요',
            pattern: {
              value: /\S+@\S+[.]\S+$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
        ></InputNormal>
        <ValidationMessage isShow={errors.email} message={errors.email?.message}></ValidationMessage>
        <InputPassword
          name='password'
          placeholder='비밀번호'
          register={register({
            required: '패스워드를 입력해주세요',
            minLength: { value: 6, message: '6자 이상 입력해주세요' },
          })}
        ></InputPassword>
        <ValidationMessage isShow={errors.password} message={errors?.password?.message}></ValidationMessage>
        {/* TODO: SubmitButton pending 편하게 처리할 수 있도록 수정 */}
        {$auth.signUp.match({
          pending: () => <Spinner></Spinner>,
          resolved: () => <SubmitButton disabled={!formState.isValid} text='로그인'></SubmitButton>,
        })}
      </form>
    ) : (
      <>
        <IonLabel className='mb-5'>회원님의 소중한 정보 보호를 위해 현재 비밀번호를 입력해주세요.</IonLabel>
        <form onSubmit={onSubmit}>
          <InputNormal name='email' type='email' value={$auth.getAuthInfo.email} disabled></InputNormal>
          <ValidationMessage isShow={errors.email} message={errors.email?.message}></ValidationMessage>
          <InputPassword
            name='password'
            placeholder='비밀번호'
            register={register({
              required: '패스워드를 입력해주세요',
              minLength: { value: 6, message: '6자 이상 입력해주세요' },
            })}
          ></InputPassword>
          <ValidationMessage isShow={errors.password} message={errors?.password?.message}></ValidationMessage>
          {$auth.signUp.match({
            pending: () => <Spinner></Spinner>,
            resolved: () => <SubmitButton disabled={!formState.isValid} text='다음'></SubmitButton>,
          })}
        </form>
      </>
    )
  )
}
