import Link from "next/link";
import { RiTelegram2Fill } from "react-icons/ri";
export default function Footer() {
    return (<div className="min-h-[462px] mt-auto grid content-center justify-items-center grid-cols-5 bg-[#F7F7F7]">
        <div className="col-span-2 max-w-[300px] max-sm:col-span-full max-sm:text-center text-black">
            <p className="font-bold text-[28px] mb-[30px]">Panto</p>
        </div>
        <div className="col-span-1 max-sm:col-span-full flex flex-col gap-y-1 justify-center">
            <p className="text-[#F6973F] text-[17px]">Услуги</p>
            <p className="text-[#1E1E1E] text-[17px]">Услуги</p>
            <p className="text-[#1E1E1E] text-[17px]">Услуги</p>
            <p className="text-[#1E1E1E] text-[17px]">Услуги</p>
        </div>
        <div className=" col-span-1 max-sm:col-span-full flex flex-col gap-y-1 justify-center">
            <p className="text-[#F6973F] text-[17px]">Наши социальные сети</p>
            <Link className="flex gap-x-2 justify-center items-center text-[17px] text-[#1E1E1E]" href={''}>
                <RiTelegram2Fill />
                <p className="text-center">Наш телеграм</p>
            </Link>
            <Link className="flex gap-x-2 justify-center items-center text-[17px] text-[#1E1E1E]" href={''}>

                <p className="text-center">Скоро</p>
            </Link>
            <Link className="flex gap-x-2 justify-center items-center text-[17px] text-[#1E1E1E]" href={''}>

                <p className="text-center">Скоро</p>
            </Link>
            <Link className="flex gap-x-2 justify-center items-center text-[17px] text-[#1E1E1E]" href={''}>

                <p className="text-center">Скоро</p>
            </Link>
        </div>
    </div>)
}