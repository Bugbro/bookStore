import React, { useState } from 'react'
import { assets } from '../assets/assets'
import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'

const Auth = () => {
  const [isSignUP, setIsSignUp] = useState(true)

  return (
    <div className='min-h-screen flex text-[#1a1a1a] font-sans'>
      {/* Left panel */}
      <div className='hidden lg:flex flex-col w-[45%] bg-[#eeeeee] p-12 relative'>
        {/* Logo */}
        <div className='absolute top-10 left-12'>
          <div className='flex items-center gap-2'>
            <div className='w-8 h-8 bg-[#1a1a1a] flex items-center justify-center rounded-[4px] rotate-45'>
              <div className='w-3 h-3 border-2 border-white rotate-[-45deg]'></div>
            </div>
          </div>
        </div>

        <div className='flex-1 flex flex-col justify-center items-center mt-12'>
          <img src={assets.authBg} alt="Auth Background" className='w-64 object-contain mb-16' />
          <div className='w-full max-w-[280px]'>
            <h2 className='text-[28px] font-bold mb-8 text-[#1a1a1a]'>Hello, Admin</h2>
            <ul className='space-y-6 font-semibold text-[15px] text-[#404040]'>
              <li className='flex items-center gap-4'>
                <i className="fa-solid fa-check text-[#10b981] text-sm"></i> Check Today's Sales
              </li>
              <li className='flex items-center gap-4'>
                <i className="fa-solid fa-check text-[#10b981] text-sm"></i> Check Today's revenue
              </li>
              <li className='flex items-center gap-4'>
                <i className="fa-solid fa-check text-[#10b981] text-sm"></i> Check Today's orders
              </li>
              <li className='flex items-center gap-4'>
                <i className="fa-solid fa-check text-[#10b981] text-sm"></i> Check Report's
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className='flex-1 flex flex-col items-center justify-center p-8 lg:p-12 xl:p-20 bg-white relative'>
        <div className='absolute top-10 right-10 text-[13px] font-medium'>
          {isSignUP ? (
            <span className='text-[#808080]'>
              Already a member? <button onClick={() => setIsSignUp(false)} className='text-[#1a1a1a] font-bold hover:underline ml-1'>Sign in</button>
            </span>
          ) : (
            <span className='text-[#808080]'>
              Not a member? <button onClick={() => setIsSignUp(true)} className='text-[#1a1a1a] font-bold hover:underline ml-1'>Sign up</button>
            </span>
          )}
        </div>

        <div className='w-full max-w-[360px] pl-0 lg:pl-10'>
          {isSignUP ? <SignUp /> : <SignIn />}
        </div>
      </div>
    </div>
  )
}

export default Auth
