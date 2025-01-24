"use client"
import Link from "next/link";
import { BACKEND_URL } from "../hooks/constants";
import { PersonalType } from "../TeamPage";
import { Image, Popover } from 'antd'
export default function PersonalCard({ userPhoto, Name, userTelegramName }: PersonalType) {
    return <div className="max-h-[350px] flex flex-col items-center p-1 justify-center rounded-xl  duration-700">
        <Popover placement="top" title={<p className="text-black text-center font-bold">{Name}</p>} content={<div className="flex justify-center">
            <Link href={userTelegramName ? `https://t.me/${userTelegramName}` : ""} className="bg-blue-500  hover:bg-blue-400 transition-all duration-500 p-2 rounded-md text-white hover:text-white" target="_blank">Написать в телеграм</Link>
        </div>}>
            <img className="h-[350px] w-fit border rounded-md" src={BACKEND_URL + userPhoto} alt="" />
        </Popover>
    </div>
}