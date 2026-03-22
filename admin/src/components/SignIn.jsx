import React, { useState } from 'react'

const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className='w-full'>
      <h2 className='text-[34px] font-bold mb-10 tracking-tight text-[#1a1a1a]'>Sign In</h2>
      
      <p className='text-[13px] font-semibold text-[#1a1a1a] mb-5'>Sign in with Open account</p>
      
      <div className='flex gap-4 mb-8'>
        <button className='flex-1 flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3.5 font-bold text-[13px] hover:bg-gray-50 transition-all cursor-pointer shadow-sm active:scale-[0.98]'>
          <i className="fa-brands fa-google text-red-500 text-base"></i>
          Google
        </button>
        <button className='flex-1 flex items-center justify-center gap-3 border border-gray-200 rounded-xl py-3.5 font-bold text-[13px] hover:bg-gray-50 transition-all cursor-pointer shadow-sm active:scale-[0.98]'>
          <i className="fa-brands fa-apple text-xl"></i>
          Apple ID
        </button>
      </div>

      <div className='relative flex items-center py-4 mb-6'>
        <div className='flex-grow border-t border-gray-100'></div>
      </div>

      <p className='text-[13px] font-semibold text-[#1a1a1a] mb-5'>Or continue with email address</p>

      <div className='relative mb-4'>
        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
          <i className="fa-regular fa-envelope text-gray-400 text-lg"></i>
        </div>
        <input 
          type="email" 
          placeholder="Your email" 
          className='w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm placeholder:text-gray-400'
        />
      </div>

      <div className='relative mb-8'>
        <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
          <i className="fa-solid fa-lock text-gray-400 text-lg"></i>
        </div>
        <input 
          type={showPassword ? "text" : "password"}
          placeholder="Password" 
          className='w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm placeholder:text-gray-400'
        />
        <button 
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
        >
          <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
        </button>
      </div>

      <button className='w-full bg-[#1a1a1a] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-all mb-8 shadow-sm active:scale-[0.98] cursor-pointer'>
        Sign In
      </button>

      <p className='text-[11px] text-[#909090] font-medium leading-relaxed max-w-[280px]'>
        This site is protected by reCAPTCHA and the Google <span className='underline cursor-pointer'>Privacy Policy</span>.
      </p>
    </div>
  )
}

export default SignIn
