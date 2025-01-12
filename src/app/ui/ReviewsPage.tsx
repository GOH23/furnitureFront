"use client"
import { motion } from "framer-motion";
import { Slider } from "./components/ImageBeforeAfterSlider";

export default function ReviewsPage(){
    return (<div className='text-[#1E1E1E] justify-around flex my-5 min-h-dvh'>
        <motion.div initial={{x: -100,opacity: 0}} animate={{x: 0,opacity: 1}}>
            <Slider/>
        </motion.div>
        <motion.div initial={{x: 100,opacity: 0}} animate={{x: 0,opacity: 1}}>
            <Slider/>
        </motion.div>
    </div>)
}