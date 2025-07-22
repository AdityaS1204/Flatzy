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
    <section className="px-4 py-16 w-full h-full ">
      <div className="max-w-6xl mx-auto h-full flex justify-center flex-col">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-3xl md:text-4xl font-bold mb-16 text-gray-800 text-center flex flex-col items-center justify-center"
        >
          What We Offer
          <svg width="244" height="18" viewBox="0 0 244 18" fill="none" xmlns="http://www.w3.org/2000/svg" className='-mt-2' >
            <path d="M2 15C28.7091 14.386 56.1273 9.43542 82.1667 3.55556C88.371 2.15458 74.4315 12.9041 72.6111 14.4445C70.3962 16.3186 72.5804 15.8416 74.6667 15.5556C87.1938 13.8381 99.6274 11.5943 112 9.00001C122.347 6.83046 132.742 5.02884 143.111 3.00001C144.581 2.71242 149.327 0.990733 146.556 4.00001C143.755 7.04066 140.942 12.6869 137.556 14.9445C136.909 15.3756 139.061 15.5303 139.833 15.4445C153.933 13.8778 167.964 12.1715 182 10.0556C194 8.24653 205.672 6.77731 217.667 5.77778C225.73 5.10587 234.145 4.96388 242 3.00001" stroke="#ffffff" stroke-width="3" stroke-linecap="round" />
          </svg>
        </motion.h2>

        <div className="overflow-hidden w-full flex justify-center items-center gap-6 h-full mb-28 bg-[#F5F0CD] shadow-2xl  p-6 rounded-2xl">
          <motion.div className="flex gap-20 w-max h-full px-2">
            <motion.div
              className='flex justify-center items-start flex-col h-96 w-1/2'
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <p className='text-3xl font-semibold my-3'>For Students</p>
              <p className='text-xl  my-6 text-start'>Find Your Perfect Stay – Hassle-Free</p>
              <p>Looking for a clean, safe, and budget-friendly place near your college or office? We list only verified PGs and apartments with real photos and complete details. Browse properties, check amenities, and connect with trusted owners — all in one place.
                <br />
                We make your rental search stress-free, transparent, and fast.</p>
            </motion.div>
            <motion.div
              className='right w-96 h-96 shadow-2xl rounded-2xl'
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img src={'https://www.colive.com/blog/wp-content/uploads/2022/07/Pg.jpg'} alt="students in pg" className='h-full w-full rounded-2xl object-cover' />
            </motion.div>
          </motion.div>
        </div>

        <div className="overflow-hidden w-full flex justify-center items-center gap-6 h-full bg-[#F5F0CD] shadow-2xl  p-6 rounded-2xl">
          <div className="flex gap-20 w-max h-full px-2">
            <motion.div
              className='right w-96 h-96'
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >
              <img src={ownerImg} alt="students in pg" className='h-full w-full rounded-2xl object-cover shadow-2xl' />
            </motion.div>
            <motion.div
                className='flex justify-center items-start flex-col h-96 w-1/2'
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: false, amount: 0.2 }}
            >

<p className='text-3xl font-semibold my-3'>For Owners</p>
              <p className='text-xl  my-6 text-'>List Your Property with Ease</p>
              <p className='text-start'>Own a PG or flat for rent? Reach thousands of potential tenants by listing your property on our platform. Easily upload property photos, set rent details, and manage bookings through your whatsapp.
                <br />
                With Flatzzy, managing your rental business has never been easier.</p>
              </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
