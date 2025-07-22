import { motion } from 'motion/react'
import React from 'react'

const Footer = () => {
  return (
    <div className='relative flex flex-col justify-center items-center w-full'>
        <motion.p
        initial={{opacity:0,y:100}}
    whileInView={{opacity:1,y:-20}}
        transition={{duration:1.5}}
        className='text-[250px] font-semibold text-neutral-700 tracking-wide mask-b-from-20% mask-[#81BFDA]'>Flatzy</motion.p>
        <div className='relative -mt-16 z-10 flex justify-between items-center rounded-t-3xl p-10 bg-white h-34 w-full'>
         <div className='text-center'>
                <p className='text-sm text-gray-600'>© 2025 Flatzzy. All rights reserved.</p>
                <p className='text-xs text-gray-500 mt-1'>Flatzzy™ is a trademark of Flatzzy Technologies</p>
            </div>
            <ul className='flex gap-10'>
                <li className='hover:cursor-pointer'>Facebook</li>
                <li className='hover:cursor-pointer'>Instagram</li>
                <li className='hover:cursor-pointer'>Linkedin</li>
            </ul>
           
        </div>

    </div>
  )
}

export default Footer