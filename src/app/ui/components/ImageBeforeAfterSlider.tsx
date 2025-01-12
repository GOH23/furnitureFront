"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

export const Slider = ({ ImageAfter, ImageBefore }: { ImageBefore?: string, ImageAfter?: string }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [FirstDragging, SetFirstDragging] = useState(false)
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
  if(!ImageBefore && !ImageBefore){
    return(<div className='flex w-full justify-center font-bold text-black items-start'>
      <p >Изображение отсутсвует</p>
    </div>)
  }
  return (
    <div className="w-full h-fit flex relative border" onMouseEnter={() => setIsEntering(true)} onMouseLeave={() => setIsEntering(false)} onMouseUp={handleMouseUp}>
      <AnimatePresence>
        {isEntering && <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-0 m-4 p-1 font-bold z-10 rounded-md bg-[#E58411]/90"><p>ДО</p></motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute right-0 m-4  p-1 font-bold rounded-md bottom-0 z-10 bg-[#E58411]/90"><p>ПОСЛЕ</p></motion.div>
        </>}
      </AnimatePresence>

      <div
        className="relative w-full min-h-[250px]   aspect-[70/45] my-auto overflow-hidden select-none"
        onMouseMove={handleMove}
        onMouseDown={handleMouseDown}
      >
        {ImageBefore && <Image
          alt=""
          fill
          draggable={false}
          priority
          src={ImageBefore}
        />}


        <div
          className="absolute top-0 left-0 min-h-[250px] right-0 w-full aspect-[70/45] my-auto overflow-hidden select-none"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          {ImageAfter && <Image
            alt=""
            fill
            draggable={false}
            priority
            src={ImageAfter}
          />}
        </div>
        <div
          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
          style={{
            left: `calc(${sliderPosition}% - 1px)`,
          }}
        >
          <div className="bg-white absolute rounded-full h-3 w-3 -left-1 top-[calc(50%-5px)]" />
        </div>
      </div>
    </div>
  );
};