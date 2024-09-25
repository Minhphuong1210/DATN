import React from 'react'
import { UseAuth } from '../hook/Auth'
import LoginForm from '../components/Form/LoginForm'


type Props = {}

const Login = (props: Props) => {
    const {Login} = UseAuth()
  return (
    <div className='flex justify-center mt-10'>
        <LoginForm onSubmit={Login} />
    </div>
  )
}

export default Login