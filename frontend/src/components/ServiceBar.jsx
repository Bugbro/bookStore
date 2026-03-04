import React from 'react'

const ServiceBar = () => {
  return (
    <div className='px-28  py-10 flex items-center justify-evenly bg-[#efefef]'>
        <div className='flex items-center justify-center gap-2'>
            <div className='text-3xl'><i className="fa-solid fa-box-open"></i></div>
            <div>
                <h3 className='font-semibold'>Free Shipping</h3>
                <p className='text-[#969595] text-xs'>Order above Rs.500</p>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <div className='text-3xl'><i className="fa-solid fa-arrows-rotate"></i></div>
            <div>
                <h3 className='font-semibold'>Easily Return</h3>
                <p className='text-[#969595] text-xs'>Return within 30 days</p>
            </div>
        </div>
        <div className='flex items-center gap-2'>
            <div className='text-3xl'><i className="fa-solid fa-phone"></i></div>
            <div>
                <h3 className='font-semibold'>Online Support</h3>
                <p className='text-[#969595] text-xs'>24/7 Customer Service</p>
            </div>
        </div>
    </div>
  )
}

export default ServiceBar