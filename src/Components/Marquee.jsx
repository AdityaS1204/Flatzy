import React from 'react'
import Marquee from 'react-fast-marquee';

const MarqueeComponent = ({direction,speed,cardSize,imgSrc}) => {
  return (
    <div>
       <Marquee pauseOnHover gradient gradientColor="" gradientWidth={0} loop={0} speed={speed} autoFill direction={direction} className="flex mask-r-from-96 mask-l-from-80 flex-col">
{imgSrc.map((img,index)=>(
    <div className='my-0 p-1'>
        <img src={img} alt="students in pg" className={`${cardSize ? cardSize:'h-28 w-34'} rounded-2xl object-cover`} />
    </div>
))}
</Marquee>
    </div>
  )
}

export default MarqueeComponent