"use client"
import { Rate } from 'antd';
import { motion } from 'framer-motion';
import { useState } from 'react';

export type ReviewsProps = {
    Data: {
        Name?: string
        TgUserName?: string,
        Comment?: string
        StarValue?: number,
    }
}

export default function ReviewsCard({ Data }: ReviewsProps) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="h-fit"
        >
            <div className={`
                h-fit relative border rounded-[18px] p-6 flex flex-col items-center justify-center
                transition-all duration-300 bg-white
                ${isHovered ? 'shadow-xl border-[#E58411]' : 'shadow-md border-gray-200'}
            `}>
                <p className='text-black text-center font-bold text-lg mb-2'>{Data.Name ? Data.Name : "Аноним"}</p>
                
                {Data.Comment && (
                    <p className='text-black text-center mt-2 italic mb-4'>{Data.Comment}</p>
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
            </div>
        </motion.div>
    );
}