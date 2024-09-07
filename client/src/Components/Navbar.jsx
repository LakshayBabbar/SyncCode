import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='w-full h-16 p-2 backdrop-blur-2xl flex justify-between px-7 items-center text-white'>
        <div>
        <h1 className='font-semibold text-2xl '>Codespy</h1>       
        </div>
        <div className='flex items-center gap-8'>
            <Link className='font-semibold text-lg '>Homepage</Link>
            <Link className='font-semibold text-lg '>Lobby</Link>
            <Link className='font-semibold text-lg '>Dashboard</Link>
            <button className='font-semibold text-lg w-[10rem] p-1 bg-white rounded-md text-black'>Login/SignUp</button>
        </div>
    </div>
  )
}

export default Navbar