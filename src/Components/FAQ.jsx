import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How do I find a PG or rental property on Flatzzy?",
      answer: "Simply browse our verified listings, filter by location, budget, and amenities. All properties have real photos and complete details. Contact us directly through the platform for viewings and bookings."
    },
    {
      question: "Are all properties on Flatzzy verified?",
      answer: "Yes! We personally verify every property before listing. This includes checking photos, amenities, and owner details to ensure you get accurate, trustworthy information."
    },
    {
      question: "How much does it cost to list my property?",
      answer: "Listing your property on Flatzzy is completely free! We only charge a small commission when you successfully rent out your property through our platform."
    },
    {
      question: "Can I book a property without visiting it first?",
      answer: "While we provide detailed photos and information, we always recommend visiting the property before making a final decision. Our platform makes it easy to schedule viewings with property owners."
    },
    {
      question: "What happens if I have issues with my rental?",
      answer: "We provide support throughout your rental journey. If you encounter any issues, our customer service team is available to help mediate between tenants and property owners."
    },
    {
      question: "How does the referral program work?",
      answer: "Refer friends to book properties and earn up to ₹1000 per successful referral. Refer property owners to list with us and earn ₹500 per verified listing. Rewards are paid directly to your wallet."
    },
    {
      question: "Do you charge any hidden fees?",
      answer: "No hidden fees! Our platform is transparent about all costs. Property owners get tenants in less time, and tenants pay a small commission only on successful bookings."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="px-4 py-8 sm:py-16 w-full">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, amount: 0.2 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-[#1E293B] text-center flex flex-col items-center justify-center"
        >
          Frequently Asked Questions
          <svg width="244" height="18" viewBox="0 0 244 18" fill="none" xmlns="http://www.w3.org/2000/svg" className="-mt-2">
            <path d="M2 15C28.7091 14.386 56.1273 9.43542 82.1667 3.55556C88.371 2.15458 74.4315 12.9041 72.6111 14.4445C70.3962 16.3186 72.5804 15.8416 74.6667 15.5556C87.1938 13.8381 99.6274 11.5943 112 9.00001C122.347 6.83046 132.742 5.02884 143.111 3.00001C144.581 2.71242 149.327 0.990733 146.556 4.00001C143.755 7.04066 140.942 12.6869 137.556 14.9445C136.909 15.3756 139.061 15.5303 139.833 15.4445C153.933 13.8778 167.964 12.1715 182 10.0556C194 8.24653 205.672 6.77731 217.667 5.77778C225.73 5.10587 234.145 4.96388 242 3.00001" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" />
          </svg>
        </motion.h2>

        <div className="space-y-3 sm:space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden border border-[#E2E8F0]"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-4 sm:px-6 py-3 sm:py-4 text-left flex justify-between items-center hover:bg-[#F8FAFC] transition-colors duration-200"
              >
                <h3 className="text-base sm:text-lg font-semibold text-[#1E293B] pr-2 sm:pr-4">
                  {faq.question}
                </h3>
                <div className="flex-shrink-0">
                  {openIndex === index ? (
                    <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#2563EB]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#64748B]" />
                  )}
                </div>
              </button>
              
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 sm:px-6 pb-3 sm:pb-4">
                      <p className="text-sm sm:text-base text-[#64748B] leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
          className="mt-8 sm:mt-12 text-center"
        >
          <p className="text-sm sm:text-base text-[#64748B] mb-3 sm:mb-4">
            Still have questions? We're here to help!
          </p>
          <button className="bg-[#2563EB] text-white px-6 sm:px-8 py-2 sm:py-3 rounded-full hover:bg-[#1E40AF] transition-colors duration-300 font-semibold text-sm sm:text-base">
            Contact Support
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ; 