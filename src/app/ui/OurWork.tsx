"use client"
import { Image } from "antd"

const examples: string[] = [
    "4lG2RLzml64_1x.jpg", "5P0TFP7z12Q_1x.jpg", "fv3IFSLh7vA_1x.jpg", "lRPnOAfolxo_1x.jpg", "Nb-GBvion5Q_1x.jpg", "rhLMzwGgbB8_1x.jpg", "uugmXVRTk-0_1x.jpg", "VjihBH4mncg_1x.jpg",
    "image_2025-06-16_22-07-2229.png", "image_2025-06-16_22-07-291.png", "image_2025-06-16_22-07-29.png", "image_2025-06-16_22-07-282.png", "image_2025-06-16_22-07-28.png", "image_2025-06-16_22-07-2912.png", "XXL_height.webp"
]
export default function OurWork() {
    return (<div className="my-20">
        <p className="font-bold text-[#1E1E1E] text-[42px] max-sm:text-[30px] text-center">Примеры готовых работ </p>

        <div className="flex mx-auto justify-center container gap-3 flex-wrap">
            <Image.PreviewGroup>
                {examples.map((el, ind) => <Image key={ind} className="object-cover" width={300} height={400} src={`/examples/${el}`} />)}
            </Image.PreviewGroup>
        </div>

    </div>)
}