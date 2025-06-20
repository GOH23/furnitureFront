"use client"
import Link from "next/link";
import { BACKEND_URL } from "../hooks/constants";
import { PersonalType } from "../TeamPage";
import { motion } from 'framer-motion';

export default function PersonalCard({ userPhoto, Name, userTelegramName }: PersonalType) {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center p-4 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 max-w-[300px] w-full"
        >
            <div className="w-[250px] h-[250px] overflow-hidden rounded-lg mb-4">
                <img 
                    className="w-full h-full object-contain" 
                    src={userPhoto?.startsWith("/") ? BACKEND_URL + userPhoto : userPhoto} 
                    alt={Name} 
                />
            </div>
            <p className="text-black mt-auto text-center font-bold text-lg mb-2">{userTelegramName}</p>
           
        </motion.div>
    );
}