import React, { useEffect, useRef, useState } from 'react';
import { convertMillion } from '../../functions/functions';

const Carousel = ({ depthData }) => {
    console.log('depthData--', depthData)
    const [currentSlide, setCurrentSlide] = useState(0);
    const [PricesMenu, setPricesMenu] = useState([
        {
            title: 'Daily Volume',
            value: "2,332,323"
        },
        {
            title: 'Pooled ADA',
            value: "12,337,777"
        },
        {
            title: 'Pooled AGIX',
            value: "1,337,727"
        },
        {
            title: 'Holders:',
            value: "122,323"
        },
        {
            title: 'Market cap:',
            value: "10,337,777"
        },
        {
            title: 'Diluted Market Cap:',
            value: "2,332,323"
        },
        {
            title: 'Diluted Market Cap:',
            value: convertMillion(depthData?.dilutedMarketCap)
        },
        {
            title: 'Circulating supply:',
            value: convertMillion(depthData?.circulatingSupply)
        },
        {
            title: 'Max Supply',
            value: 32332
        },
        {
            title: '% Pooled',
            value: `${depthData?.tokenA}`
        },
        {
            title: '1 ADA:',
            value: `${depthData?.tokenBDecimals} + ${depthData?.tokenA}`
        },
    ]);
    const sliderRef = useRef();
    console.log("PricesMenu", depthData);

    useEffect(() => {
        const len = PricesMenu.length;
        if (currentSlide > 0) {

        }
    }, [currentSlide, PricesMenu])

    const handleNextSlide = () => {

        console.log("sliderRef>>>", sliderRef.current)
        sliderRef.current.scrollBy({
            top: 0,
            left: 200,
            behavior: "smooth",
        })
        setCurrentSlide(prev => prev + 1);
    };

    const handlePrevSlide = () => {
        sliderRef.current.scrollBy({
            top: 0,
            left: -200,
            behavior: "smooth",
        })
        setCurrentSlide(currentSlide - 1);
    };

    return (
        <div className="px-2 hidden rounded-lg md:flex lg:flex xl:flex  gap-8 w-full text-sm overflow-hidden " style={{ color: 'white', visibility: 'hidden' }}>
            <div className="slider-container flex w-[82%] gap-4"

            >
                <div ref={sliderRef} className='price-menu flex gap-2 text-xs w-[80rem] overflow-hidden'>
                    {
                        PricesMenu?.map(menu => (
                            <div className='flex bg-[#000] rounded-lg p-2 items-center'>
                                <span className='w-[8rem]'>{menu?.title}</span>
                                <span>{menu?.value}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
            <button onClick={handlePrevSlide} disabled={currentSlide === 0}><i className="fa-solid fa-angle-left text-white text-xl hover:text-yellow-500" /></button>
            <button onClick={handleNextSlide} disabled={currentSlide === 10}><i className="fa-solid fa-angle-right text-white text-xl hover:text-yellow-500" /></button>
        </div>
    );
};

export default Carousel;
