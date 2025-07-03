import React from 'react'
import { NavLink } from 'react-router-dom'
import { NavData } from '../utils/navdata'

const Navbar = () => {
  return (
    <div className="w-full h-[70px] flex justify-center items-center p-4 bg-gray-800 gap-x-20">
      {
        NavData.map((link,idx)=>(
          <NavLink 
          key={idx}
          to={link.path}
          className={({isActive})=>
            isActive? "text-blue-600 text-2xl font-semibold" :"text-white font-medium text-2xl"}
          >
            {link.title}
          </NavLink>
        ))
      }
    </div>
  )
}

export default Navbar