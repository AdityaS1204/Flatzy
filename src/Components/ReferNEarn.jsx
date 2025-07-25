import { ArrowRight, X, CheckCircle } from 'lucide-react'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { whatsappRedirect } from '../Utils/Whatsapp'

const ReferNEarn = () => {
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [isSuccess, setIsSuccess] = useState(false);
   const [formData, setFormData] = useState({
     name: '',
     whatsapp: ''
   });

   const msg = "hey, there i am [your name],\n i want to refer a property to you"

   const handleInputChange = (field, value) => {
     setFormData(prev => ({
       ...prev,
       [field]: value
     }));
   };

   const handleSubmit = (e) => {
     e.preventDefault();
     // Simulate form submission
     setTimeout(() => {
       setIsSuccess(true);
       setTimeout(() => {
         setIsModalOpen(false);
         setIsSuccess(false);
         setFormData({ name: '', whatsapp: '' });
       }, 3000);
     }, 7000);
   };

   const openModal = () => {
     setIsModalOpen(true);
     setIsSuccess(false);
   };

   const closeModal = () => {
     setIsModalOpen(false);
     setIsSuccess(false);
     setFormData({ name: '', whatsapp: '' });
   };

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
                    <button className='bg-[#F59E0B] text-white px-4 py-2 rounded-full flex gap-1 group justify-center items-center hover:cursor-pointer mt-4 hover:bg-[#D97706] transition-colors' onClick={openModal}>Refer Friend <ArrowRight className='w-8 h-5 sm:w-11 sm:h-7 group-hover:translate-x-1.5 transition-all duration-300'/></button>
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 50 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 50 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="bg-white rounded-2xl p-6 w-full max-w-md relative"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>

                            {/* Success Message */}
                            <AnimatePresence mode="wait">
                                {isSuccess ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.3 }}
                                        className="text-center py-8"
                                    >
                                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-800 mb-2">Success!</h3>
                                        <p className="text-gray-600 text-sm leading-relaxed">
                                            You will get your referral ID via WhatsApp. Share it with your friend when he gets a PG or flat on rent from us. He should share the referral number to get referral benefit.
                                        </p>
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="form"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">Refer a Friend</h3>
                                        
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    Name
                                                </label>
                                                <input
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] text-gray-900"
                                                    placeholder="Enter your full name"
                                                    required
                                                />
                                            </div>

                                            <div>
                                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                                    WhatsApp Number
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={formData.whatsapp}
                                                    onChange={(e) => handleInputChange('whatsapp', e.target.value)}
                                                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#F59E0B] focus:border-[#F59E0B] text-gray-900"
                                                    placeholder="Enter your WhatsApp number"
                                                    required
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                className="w-full bg-[#F59E0B] text-white py-3 rounded-xl font-semibold text-base hover:bg-[#D97706] transition-colors mt-6"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Submit
                                            </motion.button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default ReferNEarn