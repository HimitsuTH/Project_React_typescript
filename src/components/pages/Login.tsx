import React from 'react'
import '@/components/styles/login.css'
import {BiUserCircle} from 'react-icons/bi'
import {AiOutlineLock} from 'react-icons/ai'

type Props = {}

export default function Login({}: Props) {
  return (
    <div className='input_container'>
      <div>Login</div>
      <div className='input_card'>
        <BiUserCircle className='icon'/>
        <input type="text" className="input" placeholder='username'/>
      </div>
      <div className='input_card'>
        <AiOutlineLock className='icon'/>
        <input type="password" className="input" placeholder='password'/>
      </div>
    </div>
  )
}