import Head from 'next/head'
import Image from 'next/image'
import React, { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import UseAuth from '../hooks/useAuth'

interface Inputs{
    email:string
    password:string
}

function Login() {
  
    const [loginUser, setLogin] = useState(false)
    const{ signUp, signIn} = UseAuth()
    const {
        register,
        handleSubmit,
        formState : { errors }, } = useForm<Inputs>()
    
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        loginUser ?
        await signIn(data.email,data.password) :
        await signUp(data.email,data.password)
    }

  return (
    <div className="relative flex h-screen w-screen flex-col bg-black md:items-center
    md:justify-center md:bg-transparent ">
      <Head>
        <title>Madflix</title>
        <link rel="icon" href="/favicon.ico" />
       </Head> 
       <Image src="https://rb.gy/p2hphi"
       layout="fill"
       className="-z-10 !hidden opacity-60 sm:!inline"
       objectFit="cover"/>

       <div className='Logo
       absolute object-contain left-4 top-4 cursor-pointer md:left-10 md:top-6 '>
       Madflix
       </div>

       <form
       onSubmit={handleSubmit(onSubmit)} 
       className="relative mt-24 space-y-8 rounded 
        bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14 ">
          <h1 className="text-4xl font-semibold">Sign In</h1>
          <div className="space-y-4">
            <label className="inline-block w-full">

                <input 
                type="email" 
                placeholder="Email" 
                className="input"
                {...register("email", {required : true})} />
                {errors.email && (
                <p className="p-1 text-[13px] font-light text-red-400">
                    Please Enter The Valid Email.
                </p>)}

            </label>
            <label className="inline-block w-full">

                 <input 
                 type="password" 
                 placeholder="Password" 
                 className="input"
                 {...register("password",{required : true})}/>
                   {errors.password && (
                 <p className="p-1 text-[13px] font-light text-red-400">
                    Your Password Must Be Contain Betweeen 4 and 60 Characters. 
                </p>)}

            </label>
          </div>

          <button
          onClick={()=>setLogin(true)} 
          className="w-full rounded bg-[#e50914] py-3 font-semibold">
            Sign In
          </button> 
          
          <div className="text-gray-500">
            New to Madflix ?{' '}
            <button
             onClick={()=>setLogin(false)}
             type="submit" className="text-white hover:underline">
                Sign Up Now
            </button>
          </div>
       </form>
    </div>
  )
}

export default Login