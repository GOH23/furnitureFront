import { useState } from "react"
import { AnimatePresence, motion } from 'framer-motion'
export default function SelectComponent({ items,Selected,SetState }: { items: string[],SetState: (state: string)=>void,Selected: string}) {

    return (<div className="flex justify-center rounded-[44px]  p-[6px] bg-[#EEEEEE]">
        {items.map((el, ind) => <SelectSubComponent key={ind} SetSelected={SetState} Selected={Selected} itemName={el} />)}
    </div>)
}
export function SelectSubComponent({ itemName, Selected, SetSelected }: { itemName: string, Selected: string, SetSelected: (state: string) => void }) {
    return (<div onClick={() => SetSelected(itemName)} className={`rounded-[32px] z-10 p-[10px] cursor-pointer relative`}>
        <p className="text-[#1E1E1E] relative z-30 font-medium text-[18px] max-sm:text-center max-sm:text-[13px] transition-all duration-700 hover:scale-110 hover:-translate-y-2">{itemName}</p>
        <AnimatePresence>
            {Selected == itemName && <motion.div exit={{opacity: 0,x: 10}} initial={{opacity: 0,x: -10}} animate={{opacity: 1,x: 0}} className="absolute z-20 bg-[#FFFFFF] size-full top-0 rounded-[32px] left-0"></motion.div>}
        </AnimatePresence>
    </div>)
}