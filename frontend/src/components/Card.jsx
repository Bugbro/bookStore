import React from 'react'
import { Link } from 'react-router-dom'

const Card = ({subHead, title, button, textBg, bgImage, bgGradient}) => {
  return (
    <div className={`${textBg} bg-center bg-cover bg-no-repeat flex-1 rounded-2xl overflow-hidden  h-full`} style={{backgroundImage: `url(${bgImage})`}}>
        <div className={`flex flex-col items-start gap-3 w-1/2  backdrop-blur-md p-6 h-full `}>
            <p>{subHead}</p>
            <h2 className='text-4xl font-bold'>{title}</h2>
            <Link to="/products" className='bg-white text-black px-4 py-2 rounded-full'>{button}</Link>
        </div>
    </div>
  )
}

export default Card