import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { toast, ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const router = useRouter('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  
  const handleChange = (e) => {
    if (e.target.name === 'email') {
      setEmail(e.target.value)
    }
    else if (e.target.name === 'password') {
      setPassword(e.target.value)
    }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = { email, password }
    let res = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/login`, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let response = await res.json()
    console.log(response)
    setEmail('')
    setPassword('')
    if(response.success == true){
      localStorage.setItem("token", response.token)
      toast.success('account found!', { autoClose: 2000 });
      setTimeout(() => {
        router.push(`${process.env.NEXT_PUBLIC_HOST}`)
        
      }, 2000);
    }
    else{
      toast.error('account not found!', { autoClose: 2000 });
    }
  }
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className="container px-5 py-24 mx-auto flex justify-center items-center">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img className="mx-auto h-20 w-auto" src="/logo.png" alt='' />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Log in to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <Link href={'/signUp'} className="font-medium text-blue hover:text-blue"> SignUp</Link>
              </p>
            </div>
            <form onSubmit={handleSubmit} className="mt-8 space-y-6" action="#" method="POST">
              <input  type="hidden" name="remember" value="true" />
              <div className="-space-y-px flex flex-col gap-5 rounded-md shadow-sm">
                <div>
                  <label htmlFor="email-address" className="sr-only">Email address</label>
                  <input onChange={handleChange} value={email}  id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6" placeholder="Email address" />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">Password</label>
                  <input onChange={handleChange} value={password}  id="password" name="password" type="password" autoComplete="current-password" required className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6" placeholder="Password" />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input  id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-blue focus:ring-blue" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-white">Remember me</label>
                </div>

                <div className="text-sm">
                  <Link href="/forget" className="font-medium text-blue hover:text-blue">Forgot your password?</Link>
                </div>
              </div>

              <div>
                <button type="submit" className="group relative flex w-full justify-center rounded-md bg-blue py-2 px-3 text-sm font-semibold text-white hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login