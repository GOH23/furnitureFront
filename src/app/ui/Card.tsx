import { PlusOutlined } from "@ant-design/icons";
import { Card, Image as Img, notification } from "antd";
import Meta from "antd/es/card/Meta";
import { BACKEND_URL, service_type } from "./hooks/constants";
import useProductsId from "./hooks/useProductsId";

export function SelectCard({ Name, Image, Price, serviceID, className }: { Name: string, Image: string, Price: number, serviceID: string, className?: string }) {
    const addProduct = useProductsId((state) => state.addProductId);
    const [api, contextHolder] = notification.useNotification();
    return (<Card
        className={"w-auto " + className}
        hoverable
        cover={<Img src={`${BACKEND_URL}${Image}`} />}
    >
        {contextHolder}
        <div className='flex'>
            <div>
                <p className='font-bold  text-[20px]'>{Name}</p>
                <p className='text-[15px]'>{Price} руб</p>
            </div>
            <button onClick={() => {
                addProduct(serviceID);
                api.success({
                    message: `Успешное добавление в корзину`,
                    description: "Товар добавлен в корзину", 
                    placement: "topLeft",
                    pauseOnHover: true,
                    showProgress: true
                })
            }} className='size-[50px] min-h-[50px] min-w-[50px]  ml-auto bg-[#0D1B39] rounded-[31px] duration-700 transition-all border-transparent border-[2px]  text-[24px] text-white hover:bg-white hover:text-[#0D1B39] hover:border-[#0D1B39]'>
                <PlusOutlined />
            </button>
        </div>
    </Card>)
}