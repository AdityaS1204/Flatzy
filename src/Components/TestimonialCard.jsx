import { User } from 'lucide-react'

const TestimonialCard = ({review}) => {
    return (
        <div className='rounded-lg sm:rounded-xl p-3 sm:p-4 flex flex-col border gap-2 sm:gap-3 border-white/20 bg-white/10 backdrop-blur-sm w-64 sm:w-84'>
            <div className="flex items-center gap-2 sm:gap-3">
                <User color='white' size={'24px'} className="sm:w-[30px] sm:h-[30px]" />
                <div className='flex flex-col text-white'>
                    <p className='text-sm sm:text-base font-medium'>{review.user}</p>
                    <p className='text-white/70 pb-1 sm:pb-2 text-xs sm:text-sm'>Verified User</p>
                </div>
            </div>
            <p className='text-white/90 text-xs sm:text-sm leading-relaxed'>{review.review}</p>
        </div>
    )
}

export default TestimonialCard