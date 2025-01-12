import Link from "next/link";
import { BACKEND_URL } from "../hooks/constants";
import { PersonalType } from "../TeamPage";
import { Image} from 'antd'
export default function PersonalCard({ userPhoto,Name,userTelegramName}: PersonalType) {
    return <div className="max-h-72 flex flex-col items-center p-1 justify-center rounded-xl border duration-700 border-gray-200 hover:border-[#E58411]">
        <Image className="max-h-32" src={BACKEND_URL + userPhoto} alt="" />
        <p className="text-black font-bold">{Name}</p>
        {userTelegramName && <Link href={`https://t.me/${userTelegramName}`} className="bg-blue-500 hover:bg-blue-400 duration-500 p-1 rounded-md text-white" target="_blank">Написать в телеграм</Link>}
    </div>
}