import { ArrowRight } from 'lucide-react'
import React from 'react'
import { whatsappRedirect } from '../Utils/Whatsapp'

const ReferNEarn = () => {

   const msg = "hey, there i am [your name],\n i want to refer a property to you"
    return (
        <section className='h-full w-full flex flex-col justify-center items-center mb-10'>
            <div className='h-full w-full flex flex-col justify-center items-center my-10'>
                <h1 className='text-4xl font-bold'>Refer & Earn Rewards!</h1>
                <p className='text-lg'>Invite friends. They book a PG, you earn cash. It’s that simple.</p>
            </div>
            <div className='flex justify-evenly w-8/12 h-full'>
                <div className='rounded-3xl border-2 hover:ring-2 hover:ring-cyan-400 border-blue-700 bg-white p-8 h-96 w-96'>
                    <p className='text-2xl font-semibold my-3'>Refer a Property & Earn ₹500!</p>
                    <p className='text-lg p-3'>Know someone who owns a PG or rental flat? Refer their property to us — once it’s verified and listed, you earn ₹500 straight to your wallet.</p>
                    <button className='bg-blue-700 text-white px-4 py-2 rounded-full flex gap-1 group jsutify-center items-center hover:cursor-pointer' onClick={whatsappRedirect(msg)}>Refer Property <ArrowRight className='w-11 h-7  group-hover:translate-x-1.5 transition-all duration-300'/></button>
                </div>
                <div className='rounded-3xl border-2 hover:ring-2 hover:ring-cyan-400 border-blue-700 bg-white p-8 h-96 w-96'>
                    <p className='text-2xl font-semibold my-3'>Refer a Friend & Earn up to ₹1000!</p>
                    <p className='text-lg p-3'>Have friends looking for a place to stay? Send them our way. When they book through us, you earn up to ₹1000 per referral!</p>
                    <button className='bg-blue-700 text-white px-4 py-2 rounded-full flex gap-1 group jsutify-center items-center hover:cursor-pointer'>Refer Friend <ArrowRight className='w-11 h-7  group-hover:translate-x-1.5 transition-all duration-300'/></button>
                </div>
            </div>
        </section>
    )
}

export default ReferNEarn