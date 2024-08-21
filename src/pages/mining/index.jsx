import React from 'react'
import comingSoon from '../../assests/AddedImages/Coming_soon_mining.png'
const Mining = () => {
  return (
    <div className='w-full flex justify-center items-center'>
      <img src={comingSoon} alt='coming-soon' className='w-[20rem] 2xl:w-[40rem] pt-12 2xl:pt-40'/>
    </div>
  )
}

export default Mining;
