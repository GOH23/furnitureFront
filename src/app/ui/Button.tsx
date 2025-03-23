import { IconType } from "react-icons"
import { motion } from "framer-motion"

export type ButtonProps = {
    OnClick?: () => void
    ButtonText?: string,
    Icon?: IconType,
    WithTranslateAnim?: boolean,
    size?: 'small' | 'medium' | 'large',
    variant?: 'primary' | 'secondary' | 'outline',
    fullWidth?: boolean
}

export default function Button({ 
    OnClick, 
    ButtonText, 
    Icon, 
    WithTranslateAnim = false,
    size = 'medium',
    variant = 'primary',
    fullWidth = false
}: ButtonProps) {
    const sizeClasses = {
        small: 'px-2 py-1 text-sm',
        medium: 'px-3 py-2 text-base',
        large: 'px-4 py-3 text-lg'
    };

    const variantClasses = {
        primary: 'bg-[#E58411] text-white hover:bg-white hover:text-[#E58411] hover:border-[#E58411]',
        secondary: 'bg-[#F7F7F7] text-[#1E1E1E] hover:bg-[#E58411]/10 hover:text-[#E58411] hover:border-[#E58411]',
        outline: 'bg-transparent text-[#E58411] border-[#E58411] hover:bg-[#E58411] hover:text-white'
    };

    return (
        <motion.button 
            className={`
                border border-transparent
                flex items-center justify-center gap-x-2 rounded-md font-bold
                shadow-sm hover:shadow-md
                transition-all duration-300
                ${sizeClasses[size]}
                ${variantClasses[variant]}
                ${fullWidth ? 'w-full' : ''}
            `} 
            onClick={OnClick}
            whileHover={WithTranslateAnim ? { y: -8 } : { scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
            }}
        >
            {ButtonText && <span>{ButtonText}</span>}
            {Icon && (
                <motion.div
                    animate={{ rotate: [0, 10, 0] }}
                    transition={{ 
                        repeat: Infinity, 
                        repeatType: "reverse", 
                        duration: 1,
                        repeatDelay: 1
                    }}
                >
                    <Icon className={`
                        ${size === 'small' ? 'text-xl' : size === 'medium' ? 'text-2xl' : 'text-3xl'}
                    `} />
                </motion.div>
            )}
        </motion.button>
    )
}