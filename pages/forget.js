import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

const Forget = () => {
  const router = useRouter()
  useEffect(() => {
    if(localStorage.getItem('token')){
      router.push('/')
    }
  }, [])
  return (
    <section className="text-gray-400 bg-gray-900 body-font">
      <div className="container px-5 py-24 mx-auto flex justify-center items-center">
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-md space-y-8">
            <div>
              <img className="mx-auto h-20 w-auto" src="/logo.png" alt='' />
              <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-white">Sign in to your account</h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Or
                <Link href={'/login'}><span className="font-medium text-blue hover:text-blue"> Login</span></Link>
              </p>
            </div>
            <form className="mt-8 space-y-6" action="#" method="POST">
              <input  type="hidden" name="remember" value="true" />
              <div className="-space-y-px flex flex-col gap-5 rounded-md shadow-sm">
                
                <div>
                  <label for="email-address" className="sr-only">Email address</label>
                  <input  id="email-address" name="email" type="email" autoComplete="email" required className="relative block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue sm:text-sm sm:leading-6" placeholder="Email address" />
                </div>
                <button type="submit" className="group relative flex w-full justify-center rounded-md bg-blue py-2 px-3 text-sm font-semibold text-white hover:bg-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue">
                  Continue
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Forget