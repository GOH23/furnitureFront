import { PlusOutlined } from "@ant-design/icons";
import { Card, Image as Img, notification } from "antd";
import Meta from "antd/es/card/Meta";
import { BACKEND_URL, service_type } from "./hooks/constants";
import useProductsId from "./hooks/useProductsId";
import { motion } from "framer-motion";
import { useState } from "react";

export function SelectCard({ Name, Image, Price, serviceID, className }: { Name: string, Image: string, Price: number, serviceID: string, className?: string }) {
    const addProduct = useProductsId((state) => state.addProductId);
    const [api, contextHolder] = notification.useNotification();
    const [isHovered, setIsHovered] = useState(false);
    
    // Проверяем, является ли изображение абсолютным URL
    const isFullUrl = Image?.startsWith('http://') || Image?.startsWith('https://');
    const imageSrc = isFullUrl ? Image : `${BACKEND_URL}${Image}`;
    
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Card
                className={`w-auto ${className} rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col`}
                hoverable
                bodyStyle={{
                    padding: '16px',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    flex: 1
                }}
                cover={
                    <div className="overflow-hidden h-[200px]">
                        <Img 
                            src={imageSrc}
                            className={`transition-transform duration-700 w-full h-full object-cover ${isHovered ? 'scale-110' : 'scale-100'}`}
                            preview={false}
                        />
                        <div 
                            className={`absolute inset-0 bg-black bg-opacity-0 transition-all duration-500 ${isHovered ? 'bg-opacity-10' : ''}`}
                        />
                    </div>
                }
            >
                {contextHolder}
                <div className='flex m-auto mt-auto'>
                    <motion.div
                        initial={{ x: 0 }}
                        animate={isHovered ? { x: -5 } : { x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <p className='font-bold text-[20px] text-[#1E1E1E]'>{Name}</p>
                        <p className='text-[15px] text-[#E58411] font-semibold'>{Price} руб</p>
                    </motion.div>
                    <motion.button 
                        whileHover={{ 
                            scale: 1.1,
                            rotate: 90,
                        }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                        onClick={() => {
                            addProduct(serviceID);
                            api.success({
                                message: `Успешное добавление в корзину`,
                                description: "Товар добавлен в корзину", 
                                placement: "topLeft",
                                pauseOnHover: true,
                                showProgress: true
                            });
                        }} 
                        className='size-[50px] min-h-[50px] z-20 min-w-[50px] ml-auto bg-[#E58411] rounded-[31px] text-[24px] text-white hover:bg-white hover:text-[#E58411] hover:border-[#E58411] border-transparent border-[2px] transition-colors duration-300'
                    >
                        <PlusOutlined />
                    </motion.button>
                </div>
            </Card>
        </motion.div>
    );
}