import { ArrowRight } from 'lucide-react'
import React from 'react'
import { whatsappRedirect } from '../Utils/Whatsapp'

const ReferNEarn = () => {

   const msg = "hey, there i am [your name],\n i want to refer a property to you"
    return (
        <section className='h-full w-full flex flex-col justify-center items-center mb-6 sm:mb-10'>
            <div className='h-full w-full flex flex-col justify-center items-center my-6 sm:my-10 px-4'>
                <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1E293B]'>Refer & Earn Rewards!</h1>
                <p className='text-base sm:text-lg text-center mt-2 text-[#64748B]'>Invite friends. They book a PG, you earn cash. It's that simple.</p>
            </div>
            <div className='flex flex-col lg:flex-row justify-evenly w-11/12 lg:w-8/12 h-full gap-6 lg:gap-0'>
                <div className='rounded-2xl sm:rounded-3xl border-2 hover:ring-2 hover:ring-[#2563EB] border-[#2563EB] bg-white p-6 sm:p-8 h-auto sm:h-96 w-full lg:w-96 shadow-lg'>
                    <p className='text-xl sm:text-2xl font-semibold my-2 sm:my-3 text-center text-[#1E293B]'>Refer a Property & Earn ₹500!</p>
                    <p className='text-sm sm:text-lg p-2 sm:p-3 text-[#64748B]'>Know someone who owns a PG or rental flat? Refer their property to us — once it's verified and listed, you earn ₹500 straight to your wallet.</p>
                    <button className='bg-[#2563EB] text-white px-4 py-2 rounded-full flex gap-1 group justify-center items-center hover:cursor-pointer mt-4 hover:bg-[#1E40AF] transition-colors' onClick={()=>whatsappRedirect(msg)}>Refer Property <ArrowRight className='w-8 h-5 sm:w-11 sm:h-7 group-hover:translate-x-1.5 transition-all duration-300'/></button>
                </div>
                <div className='rounded-2xl sm:rounded-3xl border-2 hover:ring-2 hover:ring-[#F59E0B] border-[#F59E0B] bg-white p-6 sm:p-8 h-auto sm:h-96 w-full lg:w-96 shadow-lg'>
                    <p className='text-xl sm:text-2xl font-semibold my-2 sm:my-3 text-center text-[#1E293B]'>Refer a Friend & Earn up to ₹1000!</p>
                    <p className='text-sm sm:text-lg p-2 sm:p-3 text-[#64748B]'>Have friends looking for a place to stay? Send them our way. When they book through us, you earn up to ₹1000 per referral!</p>
                    <button className='bg-[#F59E0B] text-white px-4 py-2 rounded-full flex gap-1 group justify-center items-center hover:cursor-pointer mt-4 hover:bg-[#D97706] transition-colors'>Refer Friend <ArrowRight className='w-8 h-5 sm:w-11 sm:h-7 group-hover:translate-x-1.5 transition-all duration-300'/></button>
                </div>
            </div>
        </section>
    )
}

export default ReferNEarn