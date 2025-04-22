'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import useSWR from 'swr';
import { category_type, fetcher } from './hooks/constants';
import { Row, Col, Form, Select, Input, Skeleton, Modal } from 'antd';
import { useCallback, useState } from 'react';
import { SelectCard } from './Card';
import { FilterOutlined } from '@ant-design/icons';

export default function ServicePage({ category }: { category: category_type[] }) {
    const [form] = Form.useForm();
    const router = useRouter()
    const pathname = usePathname()
    const params = useSearchParams();
    const { data, isLoading } = useSWR(`/furniture/services?${params.has("furnitureName") && `furnitureName=${params.get("furnitureName")}`}&${params.has("serviceName") && `serviceName=${params.get("serviceName")}`}`, fetcher);
    const [FilterModalOpened, SetFilterModalOpened] = useState(false)
    const createQueryString = useCallback(
        (name: string, value: string) => {
            const param = new URLSearchParams(params.toString())
            param.set(name, value)
            return param.toString()
        },
        [params]
    )
    function isCategory(val: any): val is { category: string } {
        return val.category !== undefined
    }
    function isServiceName(val: any): val is { serviceName: string } {
        return val.serviceName !== undefined
    }
    return (<div className='text-[#1E1E1E] relative my-5 min-h-dvh'>
        <p className='font-bold text-[#1E1E1E] text-[42px] max-sm:text-[30px] text-center'>Наши услуги</p>
        <div className='absolute cursor-pointer max-sm:block hidden right-0 text-4xl text-white bg-[#E58411] p-1 rounded-s-md' onClick={() => { SetFilterModalOpened(true) }}>
            <FilterOutlined />
        </div>
        <Row justify={'center'}>
            <Col span={16}>
                {isLoading ? <Skeleton active /> : <div className='flex justify-center items-stretch  flex-wrap gap-2'>
                    {(data as any[]).map((el, ind) => <SelectCard className='max-w-[250px] h-full' key={ind} {...el} />)}
                </div>}
            </Col>
            <Col className='max-sm:hidden' span={4}>
                <Form
                    form={form}
                    initialValues={{ category: params.get("furnitureName") ?? "Все" }}
                    onValuesChange={(values: any) => {
                        if (isCategory(values)) {
                            if(values.category == "Все"){
                                router.push(pathname);
                                return;
                            }
                            router.push(pathname + "?" + createQueryString("furnitureName", values.category))
                        } else if (isServiceName(values)) {
                            router.push(pathname + "?" + createQueryString("serviceName", values.serviceName))
                        }
                    }}
                    className='w-full sticky border rounded-md p-1'>
                    <p className="font-bold text-center">Фильтры</p>
                    <Form.Item name={"serviceName"}>
                        <Input placeholder="Поиск по названию" />
                    </Form.Item>
                    <Form.Item name={"category"}>
                        <Select
                            
                            options={[...category.map((el, key) => {
                                return { value: el.serviceName, label: el.serviceName }
                            }),{value: "Все",label: "Все"}]}
                        />
                    </Form.Item>
                </Form>
            </Col>
        </Row>
        <Modal title="Фильтры" open={FilterModalOpened} onCancel={() => SetFilterModalOpened(false)}>
            <Form
                form={form}

                initialValues={{ category: params.get("furnitureName") }}
                onValuesChange={(values: any) => {
                    if (isCategory(values)) {
                        router.push(pathname + "?" + createQueryString("furnitureName", values.category))
                    } else if (isServiceName(values)) {
                        router.push(pathname + "?" + createQueryString("serviceName", values.serviceName))
                    }
                }}
                className='w-full border rounded-md p-1'>
                <Form.Item name={"serviceName"}>
                    <Input placeholder="Поиск по названию" />
                </Form.Item>
                <Form.Item name={"category"}>
                    <Select

                        options={[...category.map((el, key) => {
                            return { value: el.serviceName, label: el.serviceName }
                        }),{value: "Все",label: "Все"}]}
                    />
                </Form.Item>
            </Form>
        </Modal>
    </div>)
}

