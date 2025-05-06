import React from 'react'
import { Link } from 'react-router-dom'

const Start= () => {
  return (
    <div> 
        <div className='bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1682048358624-8471ced24a65?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8dHJhZmZpYyUyMGxpZ2h0fGVufDB8fDB8fHww)] h-screen pt-8 flex justify-between flex-col w-full bg-red-400'>
            <img className='w-16 ml-8 mix-blend-mode-multiply'  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Uber_logo_2018.svg/1200px-Uber_logo_2018.svg.png" alt="" />
            <div className='bg-white py-4 px-4 pb-7'>
                 <h2 className='text-3xl font-bold'>Get Started with Uber</h2>
                 
                 <Link to={'/login'} className='flex items-center font-bold w-full bg-black text-white py-3 justify-center rounded mt-4'>Continue</Link>
            </div>
        </div>
        
    </div>
  )
}

export default Start