import TestimonialCard from "./TestimonialCard"
import Marquee from "react-fast-marquee";


const Testimonial = () => {


    const reviews = [
        {
            user: "Aarav Mehta",
            review: "Found a clean and affordable PG near my college within minutes. The photos and details were exactly right!"
        },
        {
            user: "Sanya Kapoor",
            review: "Finally, a site that lists verified PGs without any brokers. Booking my stay was super simple and fast."
        },
        {
            user: "Rohan Verma",
            review: "I've shifted PGs 3 times during my degree — this platform saved me so much time every single time."
        },
        {
            user: "Nisha Patil",
            review: "What I loved the most is the transparency — all PGs have real photos and honest info. No surprises!"
        },
        {
            user: "Devika Sharma",
            review: "The property management dashboard for owners is so smooth. I listed my rooms in just a few clicks."
        },
        {
            user: "Kabir Rao",
            review: "Referred a friend and got ₹500! Plus, he actually found a great PG through the site. Win-win!"
        }
    ];
    

    return (
        <section className='flex relative flex-col items-center w-full overflow-x-clip py-8 sm:py-12'>
             <div className='md:block hidden absolute -left-[30%] -top-48 gradient h-[400px] w-[400px] blur-[9rem]' />
            <div className="w-11/12 md:w-8/12 flex flex-col items-center gap-4 sm:gap-6">
                {/* heading */}
                <h3 className="text-white font-semibold text-xl sm:text-2xl md:text-4xl text-center mt-6 sm:mt-11">What Our Tenants and Students Say</h3>
                {/* p sub heading */}
                <p className="text-white/90 text-sm sm:text-lg text-center md:w-7/12 w-full">Real stories from people who found their perfect stay through our platform — hear what makes us their trusted choice.</p>
            </div>
            <div className="flex flex-col gap-4 mt-12 sm:mt-20 w-11/12 md:w-9/12 overflow-x-clip">
                <Marquee pauseOnHover  speed={50} gradient gradientColor="#1E40AF" gradientWidth={100} className="" direction="left" autoFill loop={0}>
                    <div className="flex gap-2 sm:gap-3">
                        {reviews.map((review, index) => (
                            <TestimonialCard key={index} review={review} />

                        ))}
                    </div>
                </Marquee>
                <Marquee pauseOnHover gradient gradientColor="#1E40AF" gradientWidth={100} loop={0} autoFill direction="right">
                    <div className="flex gap-2 sm:gap-3 mb-6 sm:mb-10">
                        {reviews.map((review, index) => (
                            <TestimonialCard key={index} review={review} />

                        ))}
                    </div>
                </Marquee>

            </div>
        </section>
    )
}

export default Testimonial