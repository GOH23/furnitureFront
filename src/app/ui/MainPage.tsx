"use client"
import { BACKEND_URL, category_type } from "./hooks/constants";
import ChosingCard from "./components/ChosingCard";

import SelectComponent from "./components/SelectComponent";

import { Swiper, SwiperSlide } from 'swiper/react';
import { SelectCard } from "./Card";
import { motion } from 'framer-motion'
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Navigation } from "swiper/modules";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewsCard from "./components/ReviewsCard";

export function MainPage({ category }: { category: category_type[] }) {
    const [Category, SetCategory] = useState(category);
    const [SelectedCategory, SetSelected] = useState(category[0].serviceName);
    const [FetchedServ, SetFetchedServ] = useState<any[]>()

    const OnSelectedCategoryChanged = async (state: string) => {
        SetSelected(state);
        const fetchedData = await fetch(BACKEND_URL + `/furniture/services?furnitureName=${state}`).then(res => res.json());
        SetFetchedServ(fetchedData)
    }
    useEffect(() => { OnSelectedCategoryChanged(SelectedCategory) }, [])
    return (
        <div className="overflow-x-hidden">
            <div className="grid max-sm:gap-y-10 justify-items-center content-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[420px] ">
                <motion.div initial={{ y: -30, opacity: 0 }} transition={{ delay: .1, duration: 2 }} viewport={{ once: true }} whileInView={{ y: 0, opacity: 1 }} className="font-bold md:text-right lg:text-left sm:text-center max-sm:text-[30px] text-[#1E1E1E] text-[42px]">
                    <p className="max-sm:text-center">Почему</p>
                    <p className="max-sm:text-center">Выбирают нас</p>
                </motion.div>
                <ChosingCard Delay={.25} TitleName="Роскошные удобства" Description={`Преимущество аренды рабочего места у нас заключается в том, что вы получаете комфортное обслуживание и все необходимые удобства.`} />
                <ChosingCard Delay={.5} TitleName="Доступная цена" Description="Вы можете получить перетяжку мебели высочайшего качества по доступной цене и при этом пользоваться удобствами, которые есть только у нас." />
                <ChosingCard Delay={.75} TitleName="Множество вариантов" Description="Мы предлагаем множество уникальных вариантов рабочего пространства, так что вы можете выбрать рабочее пространство по своему вкусу." />
            </div>
            <div className="min-h-[706px] flex items-center max-sm:min-h-fit flex-col">
                <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="font-bold  text-[#1E1E1E] text-[42px] max-sm:text-[30px] max-sm:text-center">Самый продаваемый продукт</motion.p>
                <SelectComponent Selected={SelectedCategory} SetState={OnSelectedCategoryChanged} items={Category.map((el) => el.serviceName)} />
                <Swiper
                    modules={[Navigation]}
                    className="w-full max-w-[1200px]"

                    breakpoints={{

                        100: {
                            slidesPerView: 1
                        },

                        480: {
                            slidesPerView: 2
                        },

                        640: {
                            slidesPerView: 3
                        },
                        960: {
                            slidesPerView: 4,

                        }
                    }}
                    navigation
                    wrapperClass={"md:flex md:justify-center"}
                >
                    {FetchedServ ? FetchedServ.map((el, key) => {
                        return <SwiperSlide key={key} className="p-3">
                            <SelectCard  {...el} />
                        </SwiperSlide>
                    }) : <SwiperSlide className='flex w-full h-[200px] justify-center'>

                    </SwiperSlide>}


                </Swiper>
                <Link className="text-[#E58411] text-[16px]" href={`/services?furnitureName=${SelectedCategory}`}>
                    Показать больше <ArrowRightOutlined />
                </Link>
            </div>
            <div className='grid grid-cols-2 my-[100px]'>
                <div className='relative max-md:hidden w-fit'>
                    <motion.div initial={{ top: "0px", opacity: 0 }} whileInView={{ top: '-66px', opacity: 1 }} viewport={{ once: true }} transition={{ duration: .9, type: 'tween', delay: 1 }} className="absolute -z-10 rounded-e-[20px] left-0 block w-[499px]  bg-[#F7F7F7] h-[422px]"></motion.div>
                    <motion.div initial={{ right: "300px", opacity: 0 }} whileInView={{ right: '-60px', opacity: 1 }} viewport={{ once: true }} transition={{ duration: .9, type: 'tween', delay: .75 }} className="absolute translate-y-1/4 -z-10 rounded-e-[20px] block w-[90px]  bg-[#F7F7F7] h-[301px]"></motion.div>
                    <motion.img initial={{ x: -100, opacity: 0 }} transition={{ duration: .9, type: 'tween', delay: .25 }} viewport={{ once: true }} whileInView={{ x: 0, opacity: 1 }} src="/Static/Rectangle 1446.png" />
                </div>
                <div className="text-black max-sm:col-span-2 flex flex-col relative justify-center">

                    <motion.p initial={{ left: 100, opacity: 0 }} whileInView={{ left: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: .9, type: 'tween', delay: .45 }} className='uppercase max-sm:text-center text-[#E58411] font-bold '>опыт</motion.p>
                    <motion.h2 initial={{ left: 100, opacity: 0 }} whileInView={{ left: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: .9, type: 'tween', delay: .55 }} className="text-[#1E1E1E]  max-sm:text-center max-sm:max-w-full font-bold text-[42px] max-w-[413px]">Мы обеспечим вам наилучший сервис</motion.h2>
                    <motion.p initial={{ left: 100, opacity: 0 }} whileInView={{ left: 0, opacity: 1 }} viewport={{ once: true }} transition={{ duration: .9, type: 'tween', delay: .6 }} className='leading-[185%] max-sm:text-[#1E1E1E] max-w-[556px]'>
                        Вам не нужно беспокоиться о результате, потому что все эти интерьеры созданы профессионалами в своей области в элегантном и ярком стиле с использованием высококачественных материалов
                    </motion.p>
                    <Link className="text-[#E58411] text-[16px]" href={`/services`}>
                        Показать больше <ArrowRightOutlined />
                    </Link>
                </div>
            </div>
            <div className='grid grid-cols-2 my-[270px]'>
                <div className="text-black justify-self-end max-sm:col-span-2 flex flex-col relative justify-center">

                    <motion.p initial={{ x: -100, opacity: 0 }} viewport={{ once: true }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .9, type: 'tween', delay: .45 }} className='uppercase max-sm:text-center text-[#E58411] font-bold '>материалы</motion.p>
                    <motion.h2 initial={{ x: -100, opacity: 0 }} viewport={{ once: true }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .9, type: 'tween', delay: .5 }} className="text-[#1E1E1E] max-sm:text-[#1E1E1E] max-sm:text-center max-sm:max-w-full font-bold text-[42px] max-w-[413px]">Очень серьезные материалы для изготовления мебели</motion.h2>
                    <motion.p initial={{ x: -100, opacity: 0 }} viewport={{ once: true }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .9, type: 'tween', delay: .55 }} className='leading-[185%] max-sm:text-[#1E1E1E] max-w-[556px]'>
                        Потому что panto очень серьезно относилась к обивке и ремонту  мебели для нашей среды обитания, используя очень дорогие и известные материалы, но по относительно низкой цене
                    </motion.p>
                    <Link className="text-[#E58411] text-[16px]" href={`/services`}>
                        Показать больше <ArrowRightOutlined />
                    </Link>
                </div>
                <div className='relative max-md:hidden '>
                    <motion.img initial={{ x: 100, opacity: 0 }} viewport={{ once: true }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .9, type: 'tween', delay: .25 }} className="right-0 shadow-xl rounded-[20px]  absolute" src="/Static/Rectangle 1446 (2).png" />
                    <motion.img initial={{ x: -100, opacity: 0 }} viewport={{ once: true }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .9, type: 'tween', delay: .25 }} className="left-[170px] shadow-xl -top-[120px] rounded-[20px] absolute" src="/Static/Rectangle 1450 (1).png" />
                    <motion.img initial={{ x: -100, opacity: 0 }} viewport={{ once: true }} whileInView={{ x: 0, opacity: 1 }} transition={{ duration: .9, type: 'tween', delay: .25 }} className="left-[170px] shadow-xl rounded-[20px]  -bottom-[120px] absolute" src="/Static/Rectangle 1450.png" />
                </div>

            </div>
            <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className=" font-bold  text-[#1E1E1E] text-[42px] max-sm:text-[30px] text-center">Отзывы наших клиентов</motion.p>

            <Swiper
                modules={[Navigation]}
                className="w-full max-w-[1200px] "
                allowTouchMove={false}
                navigation

                breakpoints={{

                    100: {
                        slidesPerView: 1
                    },

                    680: {
                        slidesPerView: 2
                    },

                    940: {
                        slidesPerView: 3
                    },

                }}

            >

                <SwiperSlide className="p-3">
                    <ReviewsCard Data={{
                        StarValue: 3,
                        TgUserName: "TG1",
                        ImageAfter: "/reviews/noroot_9_.jpg",
                        ImageBefore: "/reviews/noroot_8_.jpg"
                    }} />
                </SwiperSlide>
                <SwiperSlide className="p-3">
                    <ReviewsCard Data={{
                        StarValue: 3,
                        TgUserName: "TG1",
                        ImageAfter: "/reviews/noroot_9_.jpg",
                        ImageBefore: "/reviews/noroot_8_.jpg"
                    }} />
                </SwiperSlide>
                <SwiperSlide className="p-3">
                    <ReviewsCard Data={{
                        StarValue: 4,
                        ImageAfter: "/reviews/noroot_9_.jpg",
                        ImageBefore: "/reviews/noroot_8_.jpg"
                    }} />
                </SwiperSlide>
                <SwiperSlide className="p-3">
                    <ReviewsCard Data={{
                        StarValue: 5,
                        ImageAfter: "/reviews/noroot_9_.jpg",
                        ImageBefore: "/reviews/noroot_8_.jpg"
                    }} />
                </SwiperSlide><SwiperSlide className="p-3">
                    <ReviewsCard Data={{
                        StarValue: 2,
                        ImageAfter: "/reviews/noroot_9_.jpg",
                        ImageBefore: "/reviews/noroot_8_.jpg"
                    }} />
                </SwiperSlide>
                <SwiperSlide className="p-3">
                    <ReviewsCard Data={{
                        StarValue: 3,
                        ImageAfter: "/reviews/noroot_9_.jpg",
                        ImageBefore: "/reviews/noroot_8_.jpg"
                    }} />
                </SwiperSlide>
            </Swiper>

            {/* <div className="flex-row justify-center flex items-center max-sm:min-h-fit">

                <ReviewsCard ImageBefore={""} ImageAfter={""} />
                <ReviewsCard ImageBefore={""} ImageAfter={""} />
            </div> */}
        </div >
    )
}