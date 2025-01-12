import { PlusOutlined } from "@ant-design/icons";
import { Card,Image as Img } from "antd";
import Meta from "antd/es/card/Meta";
import { BACKEND_URL, service_type } from "./hooks/constants";
import useProductsId from "./hooks/useProductsId";

export function SelectCard({ Name, Image, Price, serviceID, className }: { Name: string, Image: string, Price: number, serviceID: string, className?: string }) {
    const addProduct = useProductsId((state) => state.addProductId);
    return (<Card
        className={"w-auto " + className}
        hoverable
        cover={<Img src={`${BACKEND_URL}${Image}`}/>}
    >
        <div className='flex'>
            <div>
                <p className='font-bold  text-[20px]'>{Name}</p>
                <p className='text-[15px]'>{Price} руб</p>
            </div>
            <button onClick={()=>addProduct(serviceID)} className='size-[50px] min-h-[50px] min-w-[50px]  ml-auto bg-[#0D1B39] rounded-[31px] duration-700 transition-all border-transparent border-[2px]  text-[24px] text-white hover:bg-white hover:text-[#0D1B39] hover:border-[#0D1B39]'>
                <PlusOutlined />
            </button>
        </div>
    </Card>)
}