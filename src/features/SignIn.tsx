import React, {useEffect} from 'react'
import './SignIn.scss'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {formSignInSchema, TFormSchema} from '../types'
import { CgCloseO } from "react-icons/cg";

const SignIn = ({handleMenuBar, navbarActive}) => {

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<TFormSchema>({
    resolver: zodResolver(formSignInSchema)
  })

  useEffect(() => {
    if(navbarActive) {
      handleMenuBar()
    }
    window.scroll(0, 0)
  },[navbarActive, handleMenuBar])

  window.addEventListener('click', (e) => {
    const emailLabel = document.querySelector("[for='signInEmail']") as HTMLLabelElement
    const signInEmail = document.querySelector('#signInEmail') as HTMLInputElement
    const passwordLabel = document.querySelector("[for='password']") as HTMLLabelElement
    const password = document.querySelector('#password') as HTMLInputElement

    if(e.target === signInEmail || signInEmail?.value !== '') {
      emailLabel?.classList.add('small-label')
      } else {
        emailLabel?.classList.remove('small-label')
        signInEmail.blur()
      }
      if(e.target === password || password?.value !== '') {
        passwordLabel?.classList.add('small-label')
        } else {
          passwordLabel?.classList.remove('small-label')
          password.blur()
        }
  })

  const handleChange = (e) => {
    const emailLabel = document.querySelector("[for='signInEmail']") as HTMLLabelElement
    const signInEmail = document.querySelector('#signInEmail') as HTMLInputElement
    const passwordLabel = document.querySelector("[for='password']") as HTMLLabelElement
    const password = document.querySelector('#password') as HTMLInputElement
    
    if(e.target === signInEmail) {
      if(e.target.value === '') {
        emailLabel?.classList.remove('small-label')
        signInEmail.blur()
      } else {
        emailLabel?.classList.add('small-label')
      }
    } else if (e.target === password) {
      if(e.target.value === '') {
        passwordLabel?.classList.remove('small-label')
        password.blur()
      } else {
        passwordLabel?.classList.add('small-label')
      }
    }
  }

  const onFormSubmit = () => {
    const emailLabel = document.querySelector("[for='signInEmail']") as HTMLLabelElement
    const signInEmail = document.querySelector('#signInEmail') as HTMLInputElement
    const passwordLabel = document.querySelector("[for='password']") as HTMLLabelElement
    const password = document.querySelector('#password') as HTMLInputElement

    if(signInEmail?.value !== '' && password?.value !== '') {
      signInEmail.value = ''
      password.value = ''
      emailLabel?.classList.remove('small-label')
      passwordLabel?.classList.remove('small-label')
      signInEmail.blur()
      password.blur()
    }
  }

  return (
    <div className='sign-in'>
        <form onSubmit={handleSubmit(onFormSubmit)}>
          <h1>Sign In</h1>
          <div className='email-container'>
            <label htmlFor='signInEmail' >Email</label>
            <div className="input-container">
              <input {...register('email')} type="text" id='signInEmail' onChange={(e) => handleChange(e)}/>
            </div>
          </div>
          {errors?.email && (
            <div className='errors'>
            <span><CgCloseO /></span>
            {`${errors.email.message}`}
            </div>
          )}
          <div className='label-container'>
            <label htmlFor='password' >Password</label>
            <div className="input-container">
              <input {...register('password')} type="password" id='password' onChange={(e) => handleChange(e)}/>
            </div>
          </div>
          {errors?.password && (
            <div className='errors'>
            <span><CgCloseO /></span>
            {`${errors.password.message}`}
            </div>
          )}
            <button type='submit'>Sign In</button>
        </form>
    </div>
  )
}

export default SignIn