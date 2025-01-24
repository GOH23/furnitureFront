import React from "react"

export type ContactsType = {
    href: string,
    target?: "_blank",
    children?: React.ReactNode
}
export default function ContactButton({href,target,children}: ContactsType){
    return(<a className="bg-[#E58411] flex justify-center items-center text-2xl size-[40px] duration-700 hover:opacity-80 rounded-md border border-transparent " href={href} target={target}>
        {children}
    </a>)
}