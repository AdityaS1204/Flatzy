import { User } from 'lucide-react'

const TestimonialCard = ({review}) => {
    return (
        <div className='rounded-xl p-4 flex flex-col border gap-3 border-neutral-100 w-84'>
            <div className="flex items-center gap-3">
                <User color='white' size={'30px'} />
                <div className='flex flex-col text-white'>
                    <p>{review.user}</p>
                    <p className='text-neutral-100 pb-2'>{review.username}</p>
                </div>
            </div>
            <p className='text-white'>{review.review}</p>
        </div>
    )
}

export default TestimonialCard