import React, { useState } from 'react'
import './Home.scss'
import {useForm} from 'react-hook-form'
import {zodResolver} from '@hookform/resolvers/zod'
import {formHomeSchema, TFormHomeSchema} from '../types'
import MoviesListing from './MoviesListing'
import * as Io from "react-icons/io";
import Search from './Search';
import { CgCloseO } from "react-icons/cg";

const Home = ({navbarActive}) => {
  const [inputValue, setInputValue] = useState('')
  const label = document.querySelector("[for='homeEmail']") as HTMLLabelElement
  const input = document.querySelector('#homeEmail') as HTMLInputElement

  const {
    register,
    handleSubmit,
    formState: {
      errors
    }
  } = useForm<TFormHomeSchema>({
    resolver: zodResolver(formHomeSchema)
  })

  window.addEventListener('click', (e) => {
    const label = document.querySelector("[for='homeEmail']") as HTMLLabelElement
    const input = document.querySelector('#homeEmail') as HTMLInputElement

    if(e.target === input || input?.value !== '') {
      label?.classList.add('small-label')
    } else {
      label?.classList.remove('small-label')
      input.blur()
    }
  })

  const handleChange = (e) => {
    setInputValue(e.target.value)
    if(input?.value === '') {
      label?.classList.remove('small-label')
      input.blur()
    } else {
      label?.classList.add('small-label')
    }
  }

  const onHomeSubmit = () => {
    setInputValue('')
    label?.classList.remove('small-label')
  }

  return (
    <div className={navbarActive ? 'home active' : 'home'}>
      <div className={navbarActive ? 'background active' : 'background'}></div>
      <section className='hero-container'>
        <div className='hero'>
          <div className='info-container'>
            <div className='info'>
              <h1>Unlimited movies, TV shows, and more</h1>
              <p>Watch anywhere. Cancel anytime.</p>
              <h3>Ready to watch? Enter your email to create or restart your membership.</h3>
              <form onSubmit={handleSubmit(onHomeSubmit)}>
                <div className="email">
                    <div className='email-container'>
                      <label htmlFor='homeEmail' >Email address</label>
                      <div className='input-container'> 
                        <input {...register('email')} type="text" id='homeEmail' value={inputValue} onChange={(e) => handleChange(e)} />
                      </div>
                    </div>
                    {errors?.email && (
                    <div className='errors'>
                    <span><CgCloseO /></span>
                    {`${errors.email.message}`}
                    </div>
                  )}
                </div>
                <button type='submit'>Get Started
                      <Io.IoIosArrowForward />
                    </button>
              </form>
            </div>
          </div>
          <div className='curve-container'>
            <div className='curve'></div>
          </div>
        </div>
      </section>
      <MoviesListing/>
      <Search/>
    </div>
  )
}

export default Home