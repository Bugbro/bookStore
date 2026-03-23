import React, { useState, useRef, useEffect } from 'react'

const SignUp = () => {
  const [step, setStep] = useState('email')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState(['', '', '', ''])
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const inputRefs = [useRef(), useRef(), useRef(), useRef()]

  const handleOtpChange = (index, value) => {
    if (isNaN(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.substring(value.length - 1)
    setOtp(newOtp)

    if (value && index < 3) {
      inputRefs[index + 1].current.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus()
    }
  }

  return (
    <div className='w-full'>
      <h2 className='text-[34px] font-bold mb-10 tracking-tight text-[#1a1a1a]'>
        {step === 'email' ? 'Sign Up' : step === 'code' ? 'Sign Up' : 'Set Password'}
      </h2>

      {step === 'email' ? (
        <>
          <p className='text-[13px] font-semibold text-[#1a1a1a] mb-5'>Sign up with Open account</p>

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

          <div className='relative mb-5'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <i className="fa-regular fa-user text-gray-400 text-lg"></i>
            </div>
            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm placeholder:text-gray-400'
            />
          </div>

          <div className='relative mb-5'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <i className="fa-regular fa-envelope text-gray-400 text-lg"></i>
            </div>
            <input
              type="email"
              placeholder="Your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm placeholder:text-gray-400'
            />
          </div>

          <div className='relative mb-8'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <i className="fa-solid fa-phone text-gray-400 text-lg"></i>
            </div>
            <input
              type="tel"
              placeholder="Your phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className='w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm placeholder:text-gray-400'
            />
          </div>

          <button
            onClick={() => setStep('code')}
            className='w-full bg-[#d2d2d2] text-white font-bold py-3.5 rounded-xl hover:bg-gray-400 transition-all mb-8 shadow-sm active:scale-[0.98] cursor-pointer'
          >
            Continue
          </button>
        </>
      ) : step === 'code' ? (
        <>
          <button
            onClick={() => setStep('email')}
            className='mb-6 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer group'
          >
            <i className="fa-solid fa-chevron-left text-xs transition-transform group-hover:-translate-x-1"></i>
            Back
          </button>
          <p className='text-[15px] font-semibold text-[#606060] mb-2'>We just send you a verify code to admin. Check your inbox to get them.</p>
          <p className='text-[13px] font-semibold text-[#1a1a1a] mb-5'>Enter the code we sent to Admin Email</p>

          <div className='flex gap-3 mb-10'>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className='w-[70px] h-[90px] text-center text-3xl font-bold border-2 border-gray-100 rounded-2xl focus:border-blue-400 focus:outline-none bg-gray-50/50 transition-all'
                maxLength={1}
              />
            ))}
          </div>

          <button
            onClick={() => setStep('password')}
            className='w-full bg-[#1a1a1a] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-all mb-8 shadow-sm active:scale-[0.98] cursor-pointer'
          >
            Continue
          </button>
        </>
      ) : (
        <>
          <button
            onClick={() => setStep('code')}
            className='mb-6 text-gray-400 hover:text-gray-600 transition-colors flex items-center gap-2 text-sm font-medium cursor-pointer group'
          >
            <i className="fa-solid fa-chevron-left text-xs transition-transform group-hover:-translate-x-1"></i>
            Back
          </button>
          <p className='text-[15px] font-semibold text-[#606060] mb-8'>Please set a secure password for your account.</p>

          <div className='relative mb-4'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <i className="fa-solid fa-lock text-gray-400 text-lg"></i>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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

          <div className='relative mb-10'>
            <div className='absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none'>
              <i className="fa-solid fa-lock text-gray-400 text-lg"></i>
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='w-full pl-12 pr-12 py-3.5 bg-white border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-black focus:border-black transition-all text-sm placeholder:text-gray-400'
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className='absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors cursor-pointer'
            >
              <i className={`fa-solid ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
            </button>
          </div>

          <button className='w-full bg-[#1a1a1a] text-white font-bold py-3.5 rounded-xl hover:bg-black transition-all mb-8 shadow-sm active:scale-[0.98] cursor-pointer'>
            Finish Sign Up
          </button>
        </>
      )}

      <p className='text-[11px] text-[#909090] font-medium leading-relaxed max-w-[280px]'>
        This site is protected by reCAPTCHA and the Google <span className='underline cursor-pointer'>Privacy Policy</span>.
      </p>
    </div>
  )
}

export default SignUp
