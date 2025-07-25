// components/HomeCard.jsx
import React from 'react';
import { whatsappRedirect } from '../Utils/Whatsapp';
const HomeCard = ({ property }) => {
  const { image, title, price, location, bedrooms, bathrooms, area,visitmsg,booknowmsg } = property;
  
  return (
    <div className="flex justify-center px-2 sm:px-4 mt-8 sm:mt-12">
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg p-4 sm:p-6 max-w-5xl w-full border border-[#E2E8F0] hover:shadow-xl transition-shadow duration-300">
        <div className="rounded-xl sm:rounded-2xl overflow-hidden border border-[#E2E8F0] mb-4 sm:mb-6">
          <img 
            src={image} 
            alt={title}
            className="w-full h-40 sm:h-60 object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>
        <div className="space-y-3 sm:space-y-4">
          <h3 className="text-lg sm:text-xl font-semibold text-[#1E293B]">{title}</h3>
          <p className="text-sm sm:text-base text-[#64748B]">{location}</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            <div className="border border-[#E2E8F0] rounded-lg sm:rounded-xl p-2 sm:p-3 text-center text-xs sm:text-sm text-[#1E293B] bg-[#F8FAFC]">
              <div className="font-semibold">{bedrooms}</div>
              <div className="text-[#64748B]">Bedrooms</div>
            </div>
            <div className="border border-[#E2E8F0] rounded-lg sm:rounded-xl p-2 sm:p-3 text-center text-xs sm:text-sm text-[#1E293B] bg-[#F8FAFC]">
              <div className="font-semibold">{bathrooms}</div>
              <div className="text-[#64748B]">Bathrooms</div>
            </div>
            <div className="border border-[#E2E8F0] rounded-lg sm:rounded-xl p-2 sm:p-3 text-center text-xs sm:text-sm text-[#1E293B] bg-[#F8FAFC]">
              <div className="font-semibold">{price}</div>
              <div className="text-[#64748B]">/month</div>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2">
            
            <button className="bg-[#2563EB] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#1E40AF] transition-colors duration-300" onClick={() => whatsappRedirect(visitmsg)}>Schedule a Visit</button>
            <button className="bg-[#2563EB] text-white px-3 sm:px-4 py-1 sm:py-2 rounded-lg text-xs sm:text-sm font-medium hover:bg-[#1E40AF] transition-colors duration-300" onClick={() => whatsappRedirect(booknowmsg)}>
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
