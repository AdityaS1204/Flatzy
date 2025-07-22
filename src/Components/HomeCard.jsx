// components/HomeCard.jsx
import React from 'react';

const HomeCard = () => {
  return (
    <div className="flex justify-center px-4 mt-12">
      <div className="bg-white rounded-3xl shadow-lg p-6 max-w-5xl w-full border">
        <div className="rounded-2xl overflow-hidden border mb-6">
          <div className="h-60 bg-blue-400 bg-[repeating-linear-gradient(135deg,_#3b82f6_0_10px,_white_10px_20px)]" />
        </div>
        <div className="grid grid-cols-2 gap-6">
          <div className="border rounded-xl p-4 text-center">Property Info</div>
          <div className="border rounded-xl p-4 text-center">Property Info</div>
          <div className="border rounded-xl p-4 text-center">Property Info</div>
          <div className="border rounded-xl p-4 text-center">Property Info</div>
        </div>
      </div>
    </div>
  );
};

export default HomeCard;
