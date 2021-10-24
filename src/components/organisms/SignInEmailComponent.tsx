import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha
} from 'react-simple-captcha';
import { Observer } from 'mobx-react-lite'
import { FC, useEffect, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { useStore } from '../../hooks/use-store'
import { route } from '../../services/route-service'
import { InputNormal } from '../atoms/InputNormalComponent'
import { InputPassword } from '../atoms/InputPasswordComponent'
import { Spinner } from '../atoms/SpinnerComponent'
import { SubmitButton } from '../atoms/SubmitButtonComponent'
import { ValidationMessage } from '../atoms/ValidationMessageComponent'

export const SignInEmail: FC = () => {
  const { $auth, $ui } = useStore()

  useEffect(() => loadCaptchaEnginge(6), [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    formState
  } = useForm<{ email: string; password: string, captcha: string }>({
    mode: 'onChange',
  })

  const password = useRef({})
  password.current = watch('password', '')

  const onSubmit = handleSubmit((form) => {
    if (!validateCaptcha(form.captcha)) {
      return $ui.showAlert({
        isOpen: true,
        header: '확인',
        message: '보안 문자를 다르게 입력하였습니다.',
        oneBtn: true,
      })
    }

    $auth.signIn(form.email, form.password).then(() => {
      if (!$auth.getIsAdmin) {
        route.signIn()
        $ui.showAlert({
          isOpen: true,
          header: '확인',
          message: '어드민 유저가 아니거나 혹은 서버 오류 입니다.',
          oneBtn: true,
        })
      } else route.home()
    })
  })

  return (
    <Observer>
      {() => (
        <form onSubmit={onSubmit} className='sign-in-email-wrap'>
        <InputNormal
          type='email'
          placeholder='이메일을 입력해주세요.'
          register={register('email',{
            required: '이메일을 입력해주세요',
            pattern: {
              value: /\S+@\S+[.]\S+$/,
              message: '이메일 형식이 올바르지 않습니다.',
            },
          })}
        />
        <ValidationMessage isShow={errors.email} message={errors.email?.message}></ValidationMessage>
        <InputPassword
          name='password'
          placeholder='비밀번호'
          register={register('password',{
            required: '패스워드를 입력해주세요',
            minLength: { value: 6, message: '6자 이상 입력해주세요' },
          })}
        />
        <ValidationMessage isShow={errors.password} message={errors?.password?.message}></ValidationMessage>
  
        {/* captcha */}
        <div className='load-canvas-template-wrap'>
          <LoadCanvasTemplate/>
        </div>
  
        <InputNormal
          name='captcha'
          type='captcha'
          className='captcha-wrap'
          placeholder='보안문자'
          register={register('captcha',{
            required: '보안 문자를 입력해주세요.',
            minLength: { value: 6, message: '6자를 입력해주세요' },
          })}
        />
        <ValidationMessage isShow={errors.captcha} message={errors?.captcha?.message}></ValidationMessage>
  
        {$auth.signIn.match({
          pending: () => <Spinner></Spinner>,
          resolved: () => <SubmitButton disabled={!formState.isValid} text='로그인'></SubmitButton>,
        })}
      </form>
      )}
    </Observer>
  )
}
