import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { whatsappRedirect } from '../Utils/Whatsapp';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const msg = "hey, there i am [your name],\n i want to know more about the services you are offering";

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <nav className="flex justify-between items-center px-4 md:px-8 py-4 bg-white shadow-md sticky top-0 z-50">
      <div className="text-xl md:text-2xl font-bold flex items-center gap-2">
        <span className='text-[#2563EB]'>Flatzy</span>
      </div>
      
      {/* Desktop Menu */}
      <ul className="hidden md:flex gap-6 text-[#64748B] font-medium">
      <Link to="/">  <a href="#"><li className="cursor-pointer px-3 py-1 rounded-full hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Home</li></a></Link>
        <a href="#services"><li className="cursor-pointer px-3 py-1 rounded-full hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Service</li></a>
        <a href="#refer"><li className="cursor-pointer px-3 py-1 rounded-full hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Refer & Earn</li></a>
        <a href="#testimonials"><li className="cursor-pointer px-3 py-1 rounded-full hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Testimonials</li></a>
        <a href="#" onClick={()=>whatsappRedirect(msg)}><li className="cursor-pointer px-3 py-1 rounded-full hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Contact Us</li></a>
      </ul>

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden p-2 rounded-md hover:bg-[#F1F5F9] transition-colors"
        aria-label="Toggle menu"
      >
        {isMenuOpen ? (
          <X className="w-6 h-6 text-[#64748B]" />
        ) : (
          <Menu className="w-6 h-6 text-[#64748B]" />
        )}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-t border-[#E2E8F0] md:hidden">
          <ul className="flex flex-col py-4">
            <a href="#" onClick={closeMenu}>
              <li className="cursor-pointer px-6 py-3 hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Home</li>
            </a>
            <a href="#services" onClick={closeMenu}>
              <li className="cursor-pointer px-6 py-3 hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Service</li>
            </a>
            <a href="#refer" onClick={closeMenu}>
              <li className="cursor-pointer px-6 py-3 hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Refer & Earn</li>
            </a>
            <a href="#testimonials" onClick={closeMenu}>
              <li className="cursor-pointer px-6 py-3 hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Testimonials</li>
            </a>
            <a href="#" onClick={() => { whatsappRedirect(msg); closeMenu(); }}>
              <li className="cursor-pointer px-6 py-3 hover:bg-[#F1F5F9] hover:text-[#1E293B] transition-colors">Contact Us</li>
            </a>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
