import {motion} from 'motion/react'
import { Navbar, Hero, HomeCard, Services, About, ReferNEarn, Footer,Testimonial, FAQ } from '../Components'
import Marquee from "react-fast-marquee";
import { whatsappRedirect } from '../Utils/Whatsapp';
import { Link } from 'react-router-dom';
import {gridImg1,gridImg2,gridImg3} from '../assets/index';
import { ArrowRightIcon } from 'lucide-react';
const Home = () => {

const chatmsg = "hey, there i want to know more about the services you are offering"
const listmsg = "hey, there i am [your name],\n i want to list my property:\n These are the details of the property:\n [property details]"

// Dummy property data
const trendingProperties = [
  {
    id: 1,
    image: gridImg1,
    title: "PG for Boys near Raisoni College",
    price: "₹6,500",
    location: "Hingna Road, Near Raisoni College, Nagpur",
    bedrooms: "1",
    bathrooms: "1",
    visitmsg: "hey, there i want to know more about the pg for boys in hingna road, near raisoni college, nagpur",
    booknowmsg: "hey, there i want to book the pg for boys in hingna road, near raisoni college, nagpur"
  },
  {
    id: 2,
    image: gridImg2,
    title: "2 BHK Flat near YCCE",
    price: "₹12,000",
    location: "Wanadongri, Near YCCE College, Nagpur",
    bedrooms: "2",
    bathrooms: "2",
    area: "900",
    visitmsg: "hey, there i want to know more about the 2 bhk flat in wanadongri, near ycce college, nagpur",
    booknowmsg: "hey, there i want to book the 2 bhk flat in wanadongri, near ycce college, nagpur"
  },
  {
    id: 3,
    image: gridImg3,
    title: "Girls PG with Mess Facility",
    price: "₹7,000",
    location: "Shraddhanand Peth, Near Raisoni College, Nagpur",
    bedrooms: "1",
    bathrooms: "1",
    area: "220",
    visitmsg: "hey, there i want to know more about the girls pg with mess facility in shraddhanand peth, near raisoni college, nagpur",
    booknowmsg: "hey, there i want to book the girls pg with mess facility in shraddhanand peth, near raisoni college, nagpur"
  }
];

  return (
    <div className="min-h-screen font-sans bg-[#F8FAFC]">
      <Navbar />
      <section className='flex flex-col items-center justify-center'>
        <Hero />
      </section>
      <div className="flex justify-center w-full gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
        <div className='flex flex-col sm:flex-row justify-between w-11/12 sm:w-6/12 gap-3 sm:gap-0'>
          <Link to="/listings"><button className="bg-[#2563EB] w-full text-white ring-2 ring-[#2563EB] px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:scale-105 hover:bg-[#1E40AF] hover:ring-[#1E40AF] hover:cursor-pointer duration-300 transition text-sm sm:text-base font-medium">
            Find Your Stay
          </button></Link>
          <button className="border-2 border-[#2563EB] text-[#2563EB] px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#2563EB] hover:text-white transition duration-300 text-sm sm:text-base font-medium" onClick={()=> whatsappRedirect(listmsg)}>
            List Your Property
          </button>
        </div>
      </div>
      <section className='w-full flex items-center justify-center my-8 sm:my-10'>
        <div className='flex w-11/12 sm:w-10/12 flex-col justify-center'>
          <h1 className='text-2xl sm:text-3xl md:text-5xl font-semibold text-center text-[#1E293B] mb-8'>Some trending Properties Near you</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-4">
            {trendingProperties.map((property, index) => (
              <div key={property.id} className="relative">
                <HomeCard property={property} />
              </div>
            ))}
          </div>
          <div className="flex justify-center">
            <Link to="/listings">
              <button className="bg-[#2563EB] text-white flex items-center justify-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full hover:bg-[#1E40AF] transition-colors duration-300 text-sm sm:text-base font-medium shadow-lg hover:shadow-xl">
                See More <ArrowRightIcon className="w-6 h-6" />
              </button>
            </Link>
          </div>
        </div>
      </section>
      <section id='services' className='min-h-screen bg-[#EFF6FF]'>
        <Services />
      </section>
      <section id='about' className='bg-[#FEF3C7]'>
        <About />
      </section>
      <section id='refer' className='bg-[#F8FAFC]'>
        <ReferNEarn />
      </section>
      <section id='testimonials' className='bg-[#1E40AF]'>
        <Testimonial/>
      </section>
      <section id='faq' className='bg-white'>
        <FAQ />
      </section>
      <footer className='bg-[#1E293B]'>
        <Footer/>
      </footer>
      <motion.div
      initial={{opacity:0,y:30}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.5,ease:'easeOut'}}
      viewport={{once:true,amount:0.3}}
       className='fixed bottom-6 hover:cursor-pointer sm:bottom-10 right-4 sm:right-10 bg-[#25D366] z-30 text-white p-3 sm:p-4 rounded-full shadow-lg text-sm sm:text-base font-medium' onClick={()=>whatsappRedirect(chatmsg)}>Chat On Whatsapp</motion.div>
    </div>
  )
}

export default Home