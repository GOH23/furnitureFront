import { Badge, Button, Form, Input, Modal, Radio, Image } from "antd"
import { useEffect, useState } from "react"
import { useInView } from "react-intersection-observer";
import useProductsId from "../hooks/useProductsId";
import { OrderedListOutlined, TableOutlined } from "@ant-design/icons";
import useViewSelected, { ViewSelected } from "../hooks/useViewSelected";
import useSWR from "swr";
import { BACKEND_URL, fetcher, service_type } from "../hooks/constants";
export type ShopCartType = {
    Open?: boolean
    onClose: () => void,
    Lazy?: boolean
}
export default function ModalShopCart({ onClose, Open, }: ShopCartType) {
    const viewSelected = useViewSelected((state) => state.viewSelected);
    const [Products, SetProducts] = useState<service_type[]>([])
    const [CountRendered, SetCountRendered] = useState(5)
    const SetViewSelected = useViewSelected((state) => state.setViewSelected);
    const productsId = useProductsId((state) => state.products);
    const { data, isLoading, error, mutate } = useSWR(
        productsId.length > 0 ? `/furniture/service/${productsId.join(',')}` : null,
        async (url) => {
            const ids = url.split('/').pop()!.split(',');
            const responses = await Promise.all(ids.slice(0, CountRendered).map(id => fetcher(`/furniture/service/${id}`)));
            return responses;
        }
    );
    const { ref, inView, entry } = useInView({
        threshold: 0,
    });
    useEffect(() => {
        if (data) SetProducts(data);
    }, [data]);
    useEffect(() => {
        if (inView) {
            if (productsId.length > CountRendered) {
                SetCountRendered((prevState) => prevState + 5);
                mutate(productsId)
            }
        }
    }, [inView])
    return <Modal footer={
        <Form layout="inline">
            <Form.Item>
                <Input prefix={<img src="https://ifellow.ru/academy/tg.png" className="size-5 object-cover" />} placeholder="Telegram никнейм" />
            </Form.Item>
            <Form.Item>
                <Button type="primary">Отправить данные менеджеру</Button>
            </Form.Item>
        </Form>
    } title={<div className="flex items-center">
        <div className="flex items-center gap-x-2">
            <p>Корзина</p>
            <Badge count={productsId.length} className="site-badge-count-100" />
        </div>
        <Radio.Group className="ml-auto mr-7" onChange={(el) => SetViewSelected(el.target.value as ViewSelected)} defaultValue={viewSelected} buttonStyle="solid">
            <Radio.Button value="view1"><OrderedListOutlined /></Radio.Button>
            <Radio.Button value="view2" ><TableOutlined /></Radio.Button>
        </Radio.Group>
    </div>} loading={isLoading} open={Open} onCancel={onClose} >
        {viewSelected == "view1" ? <div className="max-h-[500px] flex flex-col gap-y-2 overflow-auto">
            {Products?.map((el: service_type, ind) => <div key={ind} ref={Products.length == ind + 1 ? ref : null} className="min-h-[120px] p-5 rounded-md border border-[#]" >
                <div className="flex flex-col justify-center">
                    <p className="font-bold text-[17px]">{el.Name}</p>
                    <p className="font-bold text-[14px] text-gray-500">{el.Price && `${el.Price} руб.`} </p>
                </div>
            </div>)}
        </div> : <div className="grid grid-cols-3 gap-1 max-h-[500px] overflow-y-scroll">
            {Products?.map((el: service_type, ind) => <div key={ind} ref={Products.length == ind + 1 ? ref : null} className="min-h-[120px] p-5 rounded-md border border-[#]" >
                <div className="flex flex-col justify-center">
                    <Image src={BACKEND_URL + el.Image}/>
                    <p className="font-bold text-center text-[17px]">{el.Name}</p>
                    <p className="font-bold text-[14px] text-right text-gray-500">{el.Price && `${el.Price} руб.`} </p>
                </div>
            </div>)}
        </div>}
    </Modal>
}