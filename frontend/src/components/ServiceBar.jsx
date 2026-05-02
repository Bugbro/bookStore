import React from 'react'

const ServiceBar = () => {
    return (
        <div className='px-4 md:px-12 lg:px-28  py-4 lg:py-10 flex items-center justify-evenly bg-[#efefef]'>
            <div className='flex items-center justify-center gap-2'>
                <div className='text-xl md:text-3xl'><i className="fa-solid fa-box-open"></i></div>
                <div className='flex flex-col items-center'>
                    <h3 className='font-semibold text-[10px] md:text-lg'>Free Shipping</h3>
                    <p className='text-[#969595] text-[8px] md:text-xs'>Order above Rs.500</p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className='text-xl md:text-3xl'><i className="fa-solid fa-arrows-rotate"></i></div>
                <div className='flex flex-col items-center'>
                    <h3 className='font-semibold text-[10px] md:text-lg'>Easily Return</h3>
                    <p className='text-[#969595] text-[8px] md:text-xs'>Return within 30 days</p>
                </div>
            </div>
            <div className='flex items-center gap-2'>
                <div className='text-xl md:text-3xl'><i className="fa-solid fa-phone"></i></div>
                <div className='flex flex-col items-center'>
                    <h3 className='font-semibold text-[10px] md:text-lg'>Online Support</h3>
                    <p className='text-[#969595] text-[8px] md:text-xs'>24/7 Customer Service</p>
                </div>
            </div>
        </div>
    )
}

export default ServiceBar