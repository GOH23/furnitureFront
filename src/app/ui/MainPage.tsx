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
import 'swiper/css/effect-cards';
import { EffectCoverflow, Navigation, Pagination, Autoplay } from "swiper/modules";
import { ArrowRightOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewsCard from "./components/ReviewsCard";
import Button from "./Button";

// Custom icon wrapper to convert Ant Design icon to React-icons compatible type
import { IconType } from "react-icons";
import React from "react";

// Convert AntDesign icon to IconType
const convertAntIcon = (AntIcon: typeof ArrowRightOutlined): IconType => {
  const IconComponent = (props: any) => {
    return <AntIcon {...props} />;
  };
  return IconComponent as IconType;
};

const ArrowRightIcon = convertAntIcon(ArrowRightOutlined);

// Animation variants for staggered animations
const staggerContainer = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const fadeInUp = {
    hidden: { y: 30, opacity: 0 },
    show: { 
        y: 0, 
        opacity: 1,
        transition: {
            type: "spring",
            duration: 0.8
        }
    }
};

export function MainPage({ category }: { category: category_type[] }) {
    const [Category, SetCategory] = useState(category);
    const [SelectedCategory, SetSelected] = useState(category[0].serviceName);
    const [FetchedServ, SetFetchedServ] = useState<any[]>();
    const [activeSection, setActiveSection] = useState(0);

    const OnSelectedCategoryChanged = async (state: string) => {
        SetSelected(state);
        const fetchedData = await fetch(BACKEND_URL + `/furniture/services?furnitureName=${state}`).then(res => res.json());
        SetFetchedServ(fetchedData);
    }
    
    useEffect(() => { OnSelectedCategoryChanged(SelectedCategory) }, []);
    
    // Scroll animation handler
    useEffect(() => {
        const handleScroll = () => {
            const sections = document.querySelectorAll('.section-animate');
            const scrollY = window.scrollY;
            
            sections.forEach((section, index) => {
                const sectionTop = (section as HTMLElement).offsetTop - 500;
                
                if (scrollY > sectionTop) {
                    setActiveSection(index);
                }
            });
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    return (
        <div className="overflow-x-hidden">
            {/* Why Choose Us Section */}
            <motion.div 
                className="grid max-sm:gap-y-10 justify-items-center content-center sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 min-h-[420px] section-animate"
                variants={staggerContainer}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
            >
                <motion.div 
                    variants={fadeInUp} 
                    className="font-bold md:text-right lg:text-left sm:text-center max-sm:text-[30px] text-[#1E1E1E] text-[42px]"
                >
                    <p className="max-sm:text-center">Почему</p>
                    <p className="max-sm:text-center">Выбирают нас</p>
                </motion.div>
                <ChosingCard Delay={.15} TitleName="Роскошные удобства" Description={`Преимущество аренды рабочего места у нас заключается в том, что вы получаете комфортное обслуживание и все необходимые удобства.`} />
                <ChosingCard Delay={.3} TitleName="Доступная цена" Description="Вы можете получить перетяжку мебели высочайшего качества по доступной цене и при этом пользоваться удобствами, которые есть только у нас." />
                <ChosingCard Delay={.45} TitleName="Множество вариантов" Description="Мы предлагаем множество уникальных вариантов рабочего пространства, так что вы можете выбрать рабочее пространство по своему вкусу." />
            </motion.div>
            
            {/* Best Selling Products Section */}
            <motion.div 
                className="min-h-[706px] flex items-center max-sm:min-h-fit flex-col py-16 section-animate"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <motion.p 
                    variants={fadeInUp} 
                    className="font-bold text-[#1E1E1E] text-[42px] max-sm:text-[30px] max-sm:text-center mb-6"
                >
                    Самый продаваемый продукт
                </motion.p>
                
                <motion.div variants={fadeInUp}>
                    <SelectComponent Selected={SelectedCategory} SetState={OnSelectedCategoryChanged} items={Category.map((el) => el.serviceName)} />
                </motion.div>
                
                <motion.div 
                    variants={fadeInUp}
                    className="w-full max-w-[1200px] my-8"
                >
                    <Swiper
                        modules={[Navigation, EffectCoverflow, Autoplay]}
                        className="w-full"
                        effect="coverflow"
                        coverflowEffect={{
                            rotate: 0,
                            stretch: 0,
                            depth: 100,
                            modifier: 2.5,
                            slideShadows: false
                        }}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true
                        }}
                        breakpoints={{
                            100: {
                                slidesPerView: 1,
                                spaceBetween: 10
                            },
                            480: {
                                slidesPerView: 2,
                                spaceBetween: 20
                            },
                            640: {
                                slidesPerView: 3,
                                spaceBetween: 30
                            },
                            960: {
                                slidesPerView: 4,
                                spaceBetween: 30
                            }
                        }}
                        navigation
                        loop={true}
                        wrapperClass={"md:flex md:justify-center"}
                    >
                        {FetchedServ ? FetchedServ.map((el, key) => {
                            return (
                                <SwiperSlide key={key} className="p-3">
                                    <SelectCard {...el} />
                                </SwiperSlide>
                            );
                        }) : 
                        <SwiperSlide className='flex w-full h-[200px] justify-center'>
                            <div className="flex items-center justify-center">
                                <div className="animate-pulse w-full h-48 bg-gray-200 rounded-lg"></div>
                            </div>
                        </SwiperSlide>}
                    </Swiper>
                </motion.div>
                
                <motion.div variants={fadeInUp}>
                    <Link className="text-[#E58411] text-[16px] hover-transition hover:text-[#d77300]" href={`/services?furnitureName=${SelectedCategory}`}>
                        Показать больше <ArrowRightIcon className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                </motion.div>
            </motion.div>
            
            {/* Experience Section */}
            <motion.div 
                className='grid grid-cols-2 my-[100px] section-animate'
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className='relative max-md:hidden w-fit'>
                    <motion.div 
                        initial={{ top: "0px", opacity: 0 }} 
                        whileInView={{ top: '-66px', opacity: 1 }} 
                        viewport={{ once: true }} 
                        transition={{ duration: .9, type: 'spring', delay: 0.5 }} 
                        className="absolute -z-10 rounded-e-[20px] left-0 block w-[499px] bg-[#F7F7F7] h-[422px]"
                    ></motion.div>
                    <motion.div 
                        initial={{ right: "300px", opacity: 0 }} 
                        whileInView={{ right: '-60px', opacity: 1 }} 
                        viewport={{ once: true }} 
                        transition={{ duration: .9, type: 'spring', delay: 0.3 }} 
                        className="absolute translate-y-1/4 -z-10 rounded-e-[20px] block w-[90px]  bg-[#F7F7F7] h-[301px]"
                    ></motion.div>
                    <motion.img 
                        initial={{ x: -100, opacity: 0 }} 
                        transition={{ duration: .9, type: 'spring', delay: 0.1 }} 
                        viewport={{ once: true }} 
                        whileInView={{ x: 0, opacity: 1 }} 
                        src="/Static/Rectangle 1446.png" 
                        className="rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                </div>
                <div className="text-black max-sm:col-span-2 flex flex-col relative justify-center">
                    <motion.p 
                        variants={fadeInUp} 
                        className='uppercase max-sm:text-center text-[#E58411] font-bold relative'
                    >
                        опыт
                    </motion.p>
                    <motion.h2 
                        variants={fadeInUp} 
                        className="text-[#1E1E1E] max-sm:text-center max-sm:max-w-full font-bold text-[42px] max-w-[413px]"
                    >
                        Мы обеспечим вам наилучший сервис
                    </motion.h2>
                    <motion.p 
                        variants={fadeInUp} 
                        className='leading-[185%] max-sm:text-[#1E1E1E] max-w-[556px]'
                    >
                        Вам не нужно беспокоиться о результате, потому что все эти интерьеры созданы профессионалами в своей области в элегантном и ярком стиле с использованием высококачественных материалов
                    </motion.p>
                    <motion.div variants={fadeInUp} className="mt-4">
                        <Button 
                            ButtonText="Показать больше" 
                            Icon={ArrowRightIcon} 
                            WithTranslateAnim={true}
                            variant="outline"
                            OnClick={() => window.location.href = '/services'}
                        />
                    </motion.div>
                </div>
            </motion.div>
            
            {/* Materials Section */}
            <motion.div 
                className='grid grid-cols-2 my-[270px] section-animate'
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <div className="text-black justify-self-end max-sm:col-span-2 flex flex-col relative justify-center">
                    <motion.p 
                        variants={fadeInUp} 
                        className='uppercase max-sm:text-center text-[#E58411] font-bold'
                    >
                        материалы
                    </motion.p>
                    <motion.h2 
                        variants={fadeInUp} 
                        className="text-[#1E1E1E] max-sm:text-[#1E1E1E] max-sm:text-center max-sm:max-w-full font-bold text-[42px] max-w-[413px]"
                    >
                        Очень серьезные материалы для изготовления мебели
                    </motion.h2>
                    <motion.p 
                        variants={fadeInUp} 
                        className='leading-[185%] max-sm:text-[#1E1E1E] max-w-[556px]'
                    >
                        Потому что panto очень серьезно относилась к обивке и ремонту  мебели для нашей среды обитания, используя очень дорогие и известные материалы, но по относительно низкой цене
                    </motion.p>
                    <motion.div variants={fadeInUp} className="mt-4">
                        <Button 
                            ButtonText="Показать больше" 
                            Icon={ArrowRightIcon} 
                            WithTranslateAnim={true}
                            variant="primary"
                            OnClick={() => window.location.href = '/services'}
                        />
                    </motion.div>
                </div>
                <div className='relative max-md:hidden'>
                    <motion.img 
                        initial={{ x: 100, opacity: 0 }} 
                        viewport={{ once: true }} 
                        whileInView={{ x: 0, opacity: 1 }} 
                        transition={{ duration: .9, type: 'spring', delay: 0.1 }} 
                        className="right-0 shadow-xl rounded-[20px] absolute hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        src="/Static/Rectangle 1446 (2).png" 
                    />
                    <motion.img 
                        initial={{ x: -100, opacity: 0 }} 
                        viewport={{ once: true }} 
                        whileInView={{ x: 0, opacity: 1 }} 
                        transition={{ duration: .9, type: 'spring', delay: 0.2 }} 
                        className="left-[170px] shadow-xl -top-[120px] rounded-[20px] absolute hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        src="/Static/Rectangle 1450 (1).png" 
                    />
                    <motion.img 
                        initial={{ x: -100, opacity: 0 }} 
                        viewport={{ once: true }} 
                        whileInView={{ x: 0, opacity: 1 }} 
                        transition={{ duration: .9, type: 'spring', delay: 0.3 }} 
                        className="left-[170px] shadow-xl rounded-[20px] -bottom-[120px] absolute hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                        src="/Static/Rectangle 1450.png" 
                    />
                </div>
            </motion.div>
            
            {/* Reviews Section */}
            <motion.div 
                className="mb-16 section-animate"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={staggerContainer}
            >
                <motion.p 
                    variants={fadeInUp} 
                    className="font-bold text-[#1E1E1E] text-[42px] max-sm:text-[30px] text-center mb-8"
                >
                    Отзывы наших клиентов
                </motion.p>
                
                <motion.div variants={fadeInUp}>
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        className="w-full max-w-[1200px]"
                        pagination={{ 
                            clickable: true,
                            dynamicBullets: true
                        }}
                        navigation
                        loop={true}
                        breakpoints={{
                            100: {
                                slidesPerView: 1,
                                spaceBetween: 20
                            },
                            680: {
                                slidesPerView: 2,
                                spaceBetween: 30
                            },
                            940: {
                                slidesPerView: 3, 
                                spaceBetween: 40
                            }
                        }}
                    >
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 5,
                                Name: "Иванова",
                                Comment: "Работа выполнена на ура, всё сделали в срок. Спасибо большое!"
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 4,
                                Name: "Петров",
                                Comment: "Очень довольна результатом, мастер справился на отлично. Рекомендую!"
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 5,
                                Name: "Сидорова",
                                Comment: "Всё сделали быстро и качественно. Спасибо за отличную работу!"
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 4,
                                Name: "Козлов",
                                Comment: "Мастер молодец, всё аккуратно и вовремя. Рекомендую всем!"
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 5,
                                Name: "Смирнова",
                                Comment: "Результат превзошел ожидания, работа выполнена профессионально. Спасибо!"
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 4,
                                Name: "Новиков",
                                Comment: "Очень рада, что обратилась именно к вам. Всё сделали вовремя и качественно."
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 5,
                                Name: "Морозова",
                                Comment: "Отличная работа, всё чётко и в срок. Спасибо за профессионализм!"
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 4,
                                Name: "Волков",
                                Comment: "Всё прошло гладко, мастер знает своё дело. Рекомендую без сомнений!"
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 5,
                                Name: "Лебедева",
                                Comment: "Качество работы на высоте, рекомендую всем, кто ищет надёжного мастера."
                            }} />
                        </SwiperSlide>
                        <SwiperSlide className="p-5">
                            <ReviewsCard Data={{
                                StarValue: 4,
                                Name: "Соколов",
                                Comment: "Спасибо за быструю и аккуратную работу. Очень довольна результатом!"
                            }} />
                        </SwiperSlide>
                    </Swiper>
                </motion.div>
{/*                 
                <motion.div 
                    variants={fadeInUp}
                    className="flex justify-center mt-10"
                >
                    <Button 
                        ButtonText="Все отзывы" 
                        WithTranslateAnim={true}
                        variant="secondary"
                        OnClick={() => window.location.href = '/reviews'}
                    />
                </motion.div> */}
            </motion.div>
        </div>
    );
}