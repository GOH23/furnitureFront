"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Slider = ({ ImageAfter, ImageBefore }: { ImageBefore?: string, ImageAfter?: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
 

  const handleMove = (event: any) => {
    if (!isDragging) return;

    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(event.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));

    setSliderPosition(percent);
  };
  
  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  
  const handleTouchMove = (event: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = event.touches[0];
    const rect = event.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(touch.clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    
    setSliderPosition(percent);
  };
  
  if(!ImageBefore && !ImageAfter){
    return(
      <div className='flex w-full justify-center font-bold text-black items-start'>
        <p>Изображение отсутсвует</p>
      </div>
    );
  }
  
  return (
    <div 
      className="w-full h-fit flex relative border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300" 
      onMouseEnter={() => setIsEntering(true)} 
      onMouseLeave={() => {setIsEntering(false); setIsDragging(false);}} 
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
    >
      {/* <AnimatePresence>
        {isEntering && <>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 10 }} 
            transition={{ duration: 0.3 }}
            className="absolute bottom-0 left-0 m-4 p-2 font-bold z-10 rounded-md bg-[#E58411]/90 text-white shadow-md"
          >
            <p>ДО</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: 10 }} 
            transition={{ duration: 0.3, delay: 0.1 }}
            className="absolute right-0 m-4 p-2 font-bold rounded-md bottom-0 z-10 bg-[#E58411]/90 text-white shadow-md"
          >
            <p>ПОСЛЕ</p>
          </motion.div>
        </>}
      </AnimatePresence> */}

      <div
        className="relative w-full min-h-[250px] aspect-[70/45] my-auto overflow-hidden select-none cursor-ew-resize"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
        onTouchMove={handleTouchMove}
        onTouchStart={handleMouseDown}
      >
        {ImageBefore && (
          <Image
            alt="До"
            fill
            draggable={false}
            priority
            src={ImageBefore}
            className="object-cover"
          />
        )}

        <div
          className="absolute top-0 left-0 min-h-[250px] right-0 w-full aspect-[70/45] my-auto overflow-hidden select-none transition-[clip-path] duration-300 ease-out"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {ImageAfter && (
            <Image
              alt="После"
              fill
              draggable={false}
              priority
              src={ImageAfter}
              className="object-cover"
            />
          )}
        </div>
        
        <motion.div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
          animate={isDragging ? { scale: [1, 1.1, 1] } : {}}
          transition={{ repeat: isDragging ? Infinity : 0, duration: 0.5 }}
        >
          <motion.div 
            className="bg-white absolute rounded-full shadow-lg border-2 border-[#E58411]" 
            style={{
              height: isDragging ? "24px" : "16px", 
              width: isDragging ? "24px" : "16px",
              left: isDragging ? "-11px" : "-7px",
              top: `calc(50% - ${isDragging ? "12px" : "8px"})`
            }}
            animate={isEntering && !isDragging ? { scale: [1, 1.2, 1] } : {}}
            transition={{ repeat: isEntering && !isDragging ? Infinity : 0, duration: 1.5 }}
          />
        </motion.div>
        
        {isEntering && !isDragging && (
          <motion.div 
            className="absolute bottom-0 left-0 right-0 text-center text-white text-sm bg-black/50 py-1"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            Перетащите ползунок для сравнения
          </motion.div>
        )}
      </div>
    </div>
  );
};