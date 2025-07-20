import React from 'react';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-2xl font-bold flex items-center gap-2">
        <div className="w-3 h-3 bg-green-700 rotate-45"></div>
        <span>Flatzzy</span>
      </div>
      <ul className="flex gap-6 text-gray-700 font-medium">
        <a href="#"><li className="cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100 ">Home</li></a>
        <a href="#services"><li className="hover:text-black cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100">Service</li></a>
        <a href="#refer"><li className="hover:text-black cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100">Refer & Earn</li></a>
        <a href="#testimonials"><li className="hover:text-black cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100">Testimonials</li></a>
        <a href="#"><li className="hover:text-black cursor-pointer px-3 py-1 rounded-full hover:bg-gray-100">Contact Us</li></a>
      </ul>
      <button className="bg-black text-white px-5 py-2 rounded-full">Let's talk</button>
    </nav>
  );
};

export default Navbar;
