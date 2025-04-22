"use client"
import { Popover, Rate } from 'antd';
import { Slider } from './ImageBeforeAfterSlider';
import 'react-before-after-slider-component/dist/build.css';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';

export type ReviewsProps = {
    Data: {
        Name?: string
        TgUserName?: string,
        Comment?: string
        StarValue?: number,
        ImageBefore?: string,
        ImageAfter?: string,
    }
}

export default function ReviewsCard({ Data }: ReviewsProps) {
    const [isHovered, setIsHovered] = useState(false);
    
    const content = (
        <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white w-full max-w-xs rounded-xl flex items-center justify-center border shadow-lg py-5 px-4 flex-col gap-2"
        >
            <p className='text-black text-center font-bold text-lg'>{Data.Name ? Data.Name : "Аноним"}</p>
            
            {Data?.TgUserName && (
                <Link 
                    className='text-blue-500 underline text-center hover:text-blue-700 transition-colors duration-300' 
                    href={'https://t.me/' + Data.TgUserName} 
                    target='_blank'
                >
                    @{Data.TgUserName}
                </Link>
            )}

            {Data.Comment && (
                <p className='text-black text-center mt-2 italic'>{Data.Comment}</p>
            )}
            
            {Data?.StarValue && (
                <div className="mt-1">
                    <Rate 
                        disabled 
                        value={Data.StarValue} 
                        className='text-[20px]' 
                    />
                </div>
            )}
        </motion.div>
    );

    return (
        <motion.div

            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-fit"
        >
            <Popover 
                placement="top" 
                title={
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center justify-center py-2 border-b"
                    >
                        <p className="text-center font-bold text-lg text-[#E58411]">Отзыв клиента</p>
                    </motion.div>
                } 
                content={content}
                overlayClassName="review-popover"
            >
                <div className={`
                    h-fit relative border rounded-[18px] p-3 flex items-start
                    transition-all duration-300 
                    ${isHovered ? 'shadow-xl border-[#E58411]' : 'shadow-md border-gray-200'}
                `}>
                    <Slider ImageAfter={Data.ImageAfter} ImageBefore={Data.ImageBefore} />
                    
                    {/* Indicator for reviews */}
                    <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                        className="absolute -top-3 -right-3 bg-[#E58411] text-white rounded-full p-2 shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                    </motion.div>
                    
                    {Data?.StarValue && (
                        <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-lg p-1 px-2 shadow-sm">
                            <Rate disabled defaultValue={Data.StarValue} className="text-[14px]" />
                        </div>
                    )}
                    
                   
                    
                   
                </div>
            </Popover>
        </motion.div>
    );
}