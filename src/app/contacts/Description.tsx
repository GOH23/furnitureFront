"use client"
import { Descriptions } from "antd";
import Item from "antd/es/descriptions/Item";

export function Description() {
    return (
        <Descriptions className="max-w-[250px]" layout="vertical" title="Контактные данные">
            <Item label="Наш адрес">Наш адрес: г. Орехово-Зуевский р-н п. Верея</Item>
            <Item label="Наш телефон"><a className="text-blue-500 underline" href="tel:8999999999">Позвонить</a></Item>
        </Descriptions>
    )
}