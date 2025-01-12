"use client"

import PersonalCard from "./components/PersonalCard"

export type PersonalType = {
    Name: string,
    userTelegramName?: string,
    userPhoto?: string
}
export default function OurTeamPage({ data }: { data: PersonalType[] }) {
    
    return (<>
        <p className="font-bold text-[#1E1E1E] text-[42px] max-sm:text-[30px] text-center">Наша команда</p>
        <div className='flex gap-1 justify-center'>
            {data.map((el, key) => <PersonalCard key={key} {...el} />)}
        </div>
    </>)
}