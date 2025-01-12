import { IconType } from "react-icons"

export type ButtonProps = {
    OnClick?: () => void
    ButtonText?: string,
    Icon?: IconType,
    WithTranslateAnim?: boolean
}
export default function Button({ OnClick, ButtonText, Icon,WithTranslateAnim }: ButtonProps) {
    return (<button className={`
        border border-transparent
        bg-gradient-to-r flex items-center gap-x-2 rounded-md font-bold bg-[#E58411] px-3 py-2
        duration-700 transition-all
        hover:bg-white hover:text-black hover:border-[#E58411]
        ${WithTranslateAnim && "hover:-translate-y-2"}
    `} onClick={OnClick}>
        {ButtonText}
        {Icon && <Icon className="text-2xl" />}
    </button>)
}