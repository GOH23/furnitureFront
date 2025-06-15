"use client"
import { Descriptions } from "antd";
import Item from "antd/es/descriptions/Item";

export function Description() {
    return (
        <Descriptions 
            className=" bg-white rounded-lg p-4 shadow-sm" 
            layout="vertical" 
            title={<h2 className="text-xl font-bold text-[#1E1E1E] mb-4">Контактные данные</h2>}
        >
            <Item label={<span className="text-[#1E1E1E] font-medium">Наш адрес</span>}>
                Г. Орехово-Зуево Северная улица, 30вл1
            </Item>
            <Item label={<span className="text-[#1E1E1E] font-medium">Наш телефон</span>}>
                <a 
                    className="text-[#E58411] hover:text-[#E58411]/80 transition-colors duration-300 flex items-center gap-2" 
                    href="tel:8999999999"
                >
                    <span>Позвонить</span>
                </a>
            </Item>
        </Descriptions>
    )
}