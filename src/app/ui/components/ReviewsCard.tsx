"use client"
import { Popover, Rate } from 'antd';
import { Slider } from './ImageBeforeAfterSlider';
import 'react-before-after-slider-component/dist/build.css';
import Link from 'next/link';
export type ReviewsProps = {

    Data: {
        Name?: string
        TgUserName?: string,
        Comment?: string
        StarValue?: number,
        ImageBefore?: string,
        ImageAfter?: string,
    }
}
export default function ReviewsCard({ Data }: ReviewsProps) {
    return (<Popover placement="top" title={<p className="text-center">Отзыв</p>} content={
        <div className=" bg-white w-full rounded-[10px] flex items-center justify-center border shadow-md py-5 flex-col">
            <p className='text-black text-center font-bold' >{Data.Name ? Data.Name : "Аноним"}</p>
            {Data?.TgUserName && <Link className='text-blue-500 underline text-center' href={'https://t.me/' + Data.TgUserName} target='_blank'>@{Data.TgUserName}</Link>}

            <p className='text-black text-center '>{Data.Comment && ""}</p>
            {Data?.StarValue && <Rate disabled value={Data.StarValue} className='text-[20px]' />}
        </div>
    }>
        <div className="h-fit relative border rounded-[18.12px] p-3 flex items-start">
            <Slider ImageAfter={Data.ImageAfter} ImageBefore={Data.ImageBefore} />
        </div>
    </Popover>)
}