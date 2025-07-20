import {motion} from 'motion/react'
import { Navbar, Hero, HomeCard, Services, About, ReferNEarn, Footer,Testimonial, FAQ } from '../Components'
import Marquee from "react-fast-marquee";
import { whatsappRedirect } from '../Utils/Whatsapp';

const Home = () => {

const msg = "hey, there i want to know more about the services you are offering"

  return (
    <div className="min-h-screen font-sans bg-[#FADA7A]">
      <Navbar />
      <section className='flex flex-col items-center justify-center'>
        <Hero />
      </section>
      <div className="flex justify-center w-full gap-4 mt-8">
        <div className='flex justify-between w-6/12'>
          <button className="bg-black text-white ring-2 ring-white px-6 py-3 rounded-full hover:scale-105 hover:cursor-pointer duration-300 transition">
            Find Your Stay
          </button>
          <button className="border  text-black ring-2 ring-black px-6 py-3 rounded-full hover:bg-gray-100 transition duration-300">
            List Your Property
          </button>
        </div>
      </div>
      <section className='w-full flex items-center justify-center my-10'>
        <div className='flex w-10/12 flex-col justify-center'>
          <h1 className='text-5xl font-semibold text-center'>Some trending Properties Near you</h1>
          <Marquee pauseOnHover gradient gradientColor="#FADA7A" gradientWidth={100} loop={0} autoFill direction="right">
            <div className="flex gap-3">
              <HomeCard />
            </div>
          </Marquee>
        </div>
      </section>
      <section id='services' className='min-h-screen bg-[#81BFDA]'>
        <Services />
      </section>
      <section id='about' className='bg-[#F5F0CD] '>
        <About />
      </section>
      <section id='refer' className='bg-[#FADA7A]'>
        <ReferNEarn />
      </section>
      <section id='testimonials' className='bg-[#1447E6]'>
        <Testimonial/>
      </section>
      <section id='faq' className='bg-white'>
        <FAQ />
      </section>
      <footer className='bg-[#81BFDA]'>
        <Footer/>
      </footer>
      <motion.div
      initial={{opacity:0,y:30}}
      whileInView={{opacity:1,y:0}}
      transition={{duration:0.5,ease:'easeOut'}}
      viewport={{once:true,amount:0.3}}
       className='fixed bottom-10 right-10 bg-green-600 z-30 text-black p-4 rounded-full shadow-lg' onClick={whatsappRedirect(msg)}>Chat On Whatsapp</motion.div>
    </div>
  )
}

export default Home