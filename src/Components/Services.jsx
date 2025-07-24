import { motion } from 'motion/react';
import { Rocket } from 'lucide-react'
import { ownerImg } from '../assets';
const students = [
  'Verified PG Listings with Photos',
  'Admin Dashboard for Property Management',
  'Seamless Property Uploads with Cloudinary',
  'Secure Admin Login & JWT Auth',
  'Fast Deployment on Vercel (Serverless)'
];

const tenants = [
  'Verified PG Listings with Photos',
  'Admin Dashboard for Property Management',
  'Seamless Property Uploads with Cloudinary',
  'Secure Admin Login & JWT Auth',
  'Fast Deployment on Vercel (Serverless)'
];

const itemVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function Services() {
  return (
    <section className="px-4 py-8 sm:py-16 w-full h-full">
      <div className="max-w-6xl mx-auto h-full flex justify-center flex-col">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-[#1E293B] text-center flex flex-col items-center justify-center"
        >
          What We Offer
          <svg  height="18" viewBox="0 0 244 18" fill="none" xmlns="http://www.w3.org/2000/svg" className='-mt-2 w-36 md:w-96 sm:w-1/3' >
            <path d="M2 15C28.7091 14.386 56.1273 9.43542 82.1667 3.55556C88.371 2.15458 74.4315 12.9041 72.6111 14.4445C70.3962 16.3186 72.5804 15.8416 74.6667 15.5556C87.1938 13.8381 99.6274 11.5943 112 9.00001C122.347 6.83046 132.742 5.02884 143.111 3.00001C144.581 2.71242 149.327 0.990733 146.556 4.00001C143.755 7.04066 140.942 12.6869 137.556 14.9445C136.909 15.3756 139.061 15.5303 139.833 15.4445C153.933 13.8778 167.964 12.1715 182 10.0556C194 8.24653 205.672 6.77731 217.667 5.77778C225.73 5.10587 234.145 4.96388 242 3.00001" stroke="#2563EB" stroke-width="3" stroke-linecap="round" />
          </svg>
        </motion.h2>  

        <div className="overflow-hidden w-full flex justify-center items-center gap-4 sm:gap-6 h-full mb-16 sm:mb-28 bg-white shadow-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#E2E8F0]">
          <motion.div className="flex flex-col lg:flex-row gap-8 sm:gap-20 w-max h-full px-2">
            <motion.div
              className='flex justify-center items-start flex-col h-auto sm:h-96 w-full lg:w-1/2'
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <p className='text-xl sm:text-2xl md:text-3xl font-semibold my-2 sm:my-3 text-[#1E293B]'>For Students</p>
              <p className='text-lg sm:text-xl my-4 sm:my-6 text-start text-[#64748B]'>Find Your Perfect Stay – Hassle-Free</p>
              <p className='text-sm sm:text-base text-[#64748B]'>Looking for a clean, safe, and budget-friendly place near your college or office? We list only verified PGs and apartments with real photos and complete details. Browse properties, check amenities, and connect with trusted owners — all in one place.
                <br />
                We make your rental search stress-free, transparent, and fast.</p>
            </motion.div>
            <motion.div
              className='right w-full sm:w-96 h-64 sm:h-96 shadow-2xl rounded-xl sm:rounded-2xl'
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img src={'https://www.colive.com/blog/wp-content/uploads/2022/07/Pg.jpg'} alt="students in pg" className='h-full w-full rounded-xl sm:rounded-2xl object-cover' />
            </motion.div>
          </motion.div>
        </div>

        <div className="overflow-hidden w-full flex justify-center items-center gap-4 sm:gap-6 h-full bg-white shadow-xl p-4 sm:p-6 rounded-xl sm:rounded-2xl border border-[#E2E8F0]">
          <div className="flex flex-col lg:flex-row gap-8 sm:gap-20 w-max h-full px-2">
            <motion.div
              className='right w-full sm:w-96 h-64 sm:h-96 order-2 lg:order-1'
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img src={ownerImg} alt="students in pg" className='h-full w-full rounded-xl sm:rounded-2xl object-cover shadow-2xl' />
            </motion.div>
            <motion.div
                className='flex justify-center items-start flex-col h-auto sm:h-96 w-full lg:w-1/2 order-1 lg:order-2'
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >

<p className='text-xl sm:text-2xl md:text-3xl font-semibold my-2 sm:my-3 text-[#1E293B]'>For Owners</p>
              <p className='text-lg sm:text-xl my-4 sm:my-6 text-[#64748B]'>List Your Property with Ease</p>
              <p className='text-sm sm:text-base text-start text-[#64748B]'>Own a PG or flat for rent? Reach thousands of potential tenants by listing your property on our platform. Easily upload property photos, set rent details, and manage bookings through your whatsapp.
                <br />
                With Flatzzy, managing your rental business has never been easier.</p>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
