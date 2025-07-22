import React from 'react';
import { whatsappRedirect } from '../Utils/Whatsapp';
const Navbar = () => {
  const msg = "hey, there i am [your name],\n i want to know more about the services you are offering";
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold flex items-center gap-2">
        <span className='text-blue-700'>Flatzy</span>
      </div>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <a href="#"><li className="cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100 ">Home</li></a>
        <a href="#services"><li className="hover:text-black cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100">Service</li></a>
        <a href="#refer"><li className="hover:text-black cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100">Refer & Earn</li></a>
        <a href="#testimonials"><li className="hover:text-black cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100">Testimonials</li></a>
        <a href="#" onClick={()=>whatsappRedirect(msg)}><li className="hover:text-black cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100">Contact Us</li></a>
      </ul>
    </nav>
  );
};

export default Navbar;
