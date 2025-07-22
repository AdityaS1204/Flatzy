// components/Hero.jsx
import React, { useEffect, useState } from 'react';

const images = [
  'https://cdn.pixabay.com/photo/2015/06/15/16/05/replicas-810316_1280.jpg',
  'https://cdn.pixabay.com/photo/2015/03/09/15/55/bridge-665928_1280.jpg',
  'https://cdn.pixabay.com/photo/2014/06/14/05/54/car-368636_1280.jpg',
];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className="relative h-[90vh] w-11/12 bg-cover bg-center transition-all duration-1000 rounded-4xl m-10 overflow-auto"
      style={{ backgroundImage: `url(${images[current]})` }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-6 text-white">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Find Your Perfect Home or Sell<br />with Confidence
        </h1>
        <p className="mt-4 text-lg max-w-xl">
          Explore a seamless way to buy, sell, and connect with trusted Real estate professionals.
        </p>

        <div className="bg-white rounded-full mt-10 px-6 py-4 shadow-md flex flex-col md:flex-row items-stretch gap-4 w-full max-w-4xl">
          <input
            type="text"
            placeholder="Enter your location"
            className="flex-1 px-4 py-2 rounded-full border focus:outline-none"
          />
          <select className="flex-1 px-4 py-2 rounded-full border focus:outline-none">
            <option disabled selected>Property Type</option>
            <option>Apartment</option>
            <option>Villa</option>
            <option>Flat</option>
            <option>Studio</option>
          </select>
          <select className="flex-1 px-4 py-2 rounded-full border focus:outline-none">
            <option disabled selected>Max Price</option>
            <option>$3,000</option>
            <option>$5,000</option>
            <option>$10,000</option>
            <option>$20,000</option>
          </select>
          <button className="bg-black text-white px-6 py-2 rounded-full">
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
