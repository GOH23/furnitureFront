import { ArrowRightOutlined } from "@ant-design/icons"
import Link from "next/link"
import {motion} from 'framer-motion'
export type ChosingCardProps = {
    TitleName: string,
    Description: string,
    Delay?: number
}
export default function ChosingCard({ TitleName, Description,Delay }: ChosingCardProps) {
    return (<motion.div initial={{x: -10,opacity: 0}} transition={{delay: Delay,duration: 2}} viewport={{once: true}} whileInView={{x: 0,opacity: 1}} className="text-[#1E1E1E]">
        <p className="font-bold text-[24px]">{TitleName}</p>
        <p className="text-[16px] leading-[1.85] max-w-[284px]">{Description}</p>
        <Link className="text-[#E58411] text-[16px]" href={"/aboutus"}>
            Показать больше <ArrowRightOutlined />
        </Link>
    </motion.div>)
}