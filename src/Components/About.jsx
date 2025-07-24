import { motion } from 'motion/react'
import { Rocket } from 'lucide-react'
import MarqueeComponent from './Marquee';
import { gridImg1, gridImg2, gridImg3,gridImg4 } from '../assets';
const About = () => {
    const imgSrc = [gridImg1, gridImg2, gridImg3, gridImg1, gridImg2, gridImg3,gridImg4]
    const students = [
        'Verified PG Listings with Photos',
        'Admin Dashboard for Property Management',
        'Seamless Property Uploads with Cloudinary',
        'Secure Admin Login & JWT Auth',
        'Fast Deployment on Vercel (Serverless)'
    ];


    return (
        <section className="px-4 py-8 sm:py-16 w-full">
            <div className="max-w-6xl mx-auto h-full flex justify-center flex-col">
                <motion.h2
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true, amount: 0.2 }}
                    className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 text-[#1E293B] text-center flex flex-col items-center justify-center"
                >
                    What we do
                    <svg  height="18" viewBox="0 0 244 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-2 w-36 md:w-96 sm:w-1/3">
                        <path d="M2 15C28.7091 14.386 56.1273 9.43542 82.1667 3.55556C88.371 2.15458 74.4315 12.9041 72.6111 14.4445C70.3962 16.3186 72.5804 15.8416 74.6667 15.5556C87.1938 13.8381 99.6274 11.5943 112 9.00001C122.347 6.83046 132.742 5.02884 143.111 3.00001C144.581 2.71242 149.327 0.990733 146.556 4.00001C143.755 7.04066 140.942 12.6869 137.556 14.9445C136.909 15.3756 139.061 15.5303 139.833 15.4445C153.933 13.8778 167.964 12.1715 182 10.0556C194 8.24653 205.672 6.77731 217.667 5.77778C225.73 5.10587 234.145 4.96388 242 3.00001" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" /></svg>

                </motion.h2>

                <div className="overflow-hidden w-full flex gap-4 sm:gap-6 h-full">
                    <motion.div
                        className="flex flex-col lg:flex-row gap-8 sm:gap-20 h-full px-2 w-full"
                        initial={{ opacity: 0, x: -100 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.7 }}
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <div className='flex flex-col justify-center items-start gap-4 sm:gap-5 h-auto sm:h-96 w-full lg:w-1/2'>
                        <p className='text-xl sm:text-2xl font-semibold text-[#1E293B]'>Our Mission</p>
                        <p className='text-sm sm:text-base text-[#64748B]'>To build a rental ecosystem that is trustworthy, tech-driven, and designed to help students, professionals, and property owners save time, effort, and money.</p>
                            <p className='text-sm sm:text-base text-[#64748B]'> At Flatzzy, we simplify the way people find and list rental spaces — whether it's a student searching for a budget-friendly PG or an owner looking to rent out a property.
                                <br />
                                We connect tenants and property owners through a reliable, transparent, and fast platform. No more fake listings, endless calls, or outdated property info.
                                <br />
                                From verified PGs and flats to easy uploads for owners — we bring rental convenience to your fingertips. </p>

                        </div>
                        <div className='right w-full lg:w-[500px] h-[300px] sm:h-[450px] flex flex-col gap-3 sm:gap-5'>
                            <div>
                                <MarqueeComponent direction="right" speed={25} imgSrc={imgSrc} />
                            </div>
                            <div>
                                <MarqueeComponent direction="left" speed={25} cardSize={'h-20 sm:h-28 w-32 sm:w-44'} imgSrc={imgSrc} />
                            </div>
                            <div>
                                <MarqueeComponent direction="right" speed={25} imgSrc={imgSrc} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About