import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function MySlider() {
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };


    
    return (
        <Slider {...settings}>
            <div className="px-2  rounded-lg flex gap-8 w-full text-xs" style={{ color: 'white' }}>
                <div className='bg-black  rounded-lg p-2 '>Daily volume </div>
                <div className='bg-black p-2 rounded-lg'>Pooled ADA </div>
                <div className='bg-black p-2 rounded-lg'>Pooled AGIX </div>
                <div className='bg-black p-2 rounded-lg'>Holders</div>
                <div className='bg-black p-2 rounded-lg'>Market cap</div>
                <div className='bg-black p-2 rounded-lg'>Diluted Market Cap </div>
                <div className='bg-black p-2 rounded-lg'>Circulating supply</div>
                <div className='bg-black p-2 rounded-lg'>Total supply </div>
                <div className='bg-black p-2 rounded-lg'>Max Supply</div>
                <div className='bg-black p-2 rounded-lg'>% Pooled AGIX</div>
                <div className='bg-black p-2 rounded-lg'>1 ADA</div>
            </div>
        </Slider>
    );
}

export default MySlider;
