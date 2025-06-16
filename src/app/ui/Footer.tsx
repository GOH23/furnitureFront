import Link from "next/link";
import { RiTelegram2Fill, RiInstagramFill, RiVkFill, RiWhatsappFill } from "react-icons/ri";
export default function Footer() {
    return (<div className="min-h-[462px] mt-auto grid content-center justify-items-center bg-[#F7F7F7]">

        <div className=" col-span-1 max-sm:col-span-full flex flex-col gap-y-4 justify-center">
            <p className="text-[#F6973F] text-[17px] mb-2">Наши социальные сети</p>
            <Link className="flex gap-x-3 justify-center items-center text-[17px] text-[#1E1E1E] hover:text-[#F6973F] transition-colors" href={'https://t.me/PeretyajkaRF'}>
                <RiTelegram2Fill className="text-xl" />
                <p className="text-center">Наш телеграм</p>
            </Link>
            <Link className="flex gap-x-3 justify-center items-center text-[17px] text-[#1E1E1E] hover:text-[#F6973F] transition-colors" href={''}>
                <RiInstagramFill className="text-xl" />
                <p className="text-center">Instagram</p>
            </Link>
            <Link className="flex gap-x-3 justify-center items-center text-[17px] text-[#1E1E1E] hover:text-[#F6973F] transition-colors" href={''}>
                <RiVkFill className="text-xl" />
                <p className="text-center">ВКонтакте</p>
            </Link>
            <Link className="flex gap-x-3 justify-center items-center text-[17px] text-[#1E1E1E] hover:text-[#F6973F] transition-colors" href={''}>
                <RiWhatsappFill className="text-xl" />
                <p className="text-center">WhatsApp</p>
            </Link>
        </div>
    </div>)
}