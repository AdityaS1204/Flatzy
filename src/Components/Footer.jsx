import { motion } from 'motion/react'
import React from 'react'

const Footer = () => {
  return (
    <div className='relative flex flex-col justify-center items-center pt-4 w-full'>
        <motion.p
        initial={{opacity:0,y:100}}
    whileInView={{opacity:1,y:-20}}
        transition={{duration:1.5}}
        className='text-6xl sm:text-8xl md:text-[250px] font-semibold text-neutral-300 tracking-wide mask-b-from-10% mask-[#2563EB]'>Flatzy</motion.p>
        <div className='relative -mt-5 sm:-mt-12 md:-mt-8 z-10 flex flex-col sm:flex-row justify-between items-center rounded-t-2xl sm:rounded-t-3xl p-6 sm:p-10 bg-[#1E293B] shadow-lg shadow-white h-auto sm:h-34 w-full gap-4 sm:gap-0'>
         <div className='text-center sm:text-left'>
                <p className='text-xs sm:text-sm text-gray-300'>© 2025 Flatzzy. All rights reserved.</p>
                <p className='text-xs text-gray-400 mt-1'>Flatzzy™ is a trademark of Flatzzy Technologies</p>
            </div>
            <ul className='flex gap-6 sm:gap-10 text-sm sm:text-base text-gray-300'>
                <li className='hover:cursor-pointer hover:text-white transition-colors'>Facebook</li>
                <li className='hover:cursor-pointer hover:text-white transition-colors'>Instagram</li>
                <li className='hover:cursor-pointer hover:text-white transition-colors'>Linkedin</li>
            </ul>
           
        </div>

    </div>
  )
}

export default Footer