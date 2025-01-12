"use client"
import { Box, AppBar, IconButton } from "@mui/material";
import { Badge, Card, Col, Input, InputNumber, InputNumberProps, Menu, Radio, Row, Spin, Typography } from "antd";
import { AnimatePresence } from "framer-motion";
import { motion } from 'framer-motion'
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa6";
import { IoIosPricetags } from "react-icons/io";
import Button from "./Button";
import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdClose } from "react-icons/io";
import { Drawer, Button as ANTDButton } from "antd";
import { ShopFilled } from "@ant-design/icons"
import Meta from "antd/es/card/Meta";
import { usePathname, useRouter } from 'next/navigation'
import useProductsId from "./hooks/useProductsId";
import ModalShopCart from "./components/ModalShopCart";
import { BACKEND_URL, category_type } from "./hooks/constants";
export default function Header() {
    const pathname = usePathname()
    const [OnShopCartOpened, SetOnShopCartOpened] = useState(false)
    const [MenuOpened, SetMenuOpened] = useState(false)
    const [CalculateOpened, SetCalculateOpened] = useState(false)
    const products = useProductsId((state) => state.products);

    const [Service, SetFetchedServ] = useState<{ categories: category_type[], loading: boolean }>({
        categories: [],
        loading: true
    })
    const OnSelectedCategoryChanged = async () => {

        const fetchedData = await fetch(BACKEND_URL + '/furniture?limit=3').then(res => res.json());
        SetFetchedServ({
            categories: fetchedData,
            loading: false
        })
    }
    useEffect(() => {
        OnSelectedCategoryChanged()
    }, [])

    const AnimProps = { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true } }
    return (<div className={`relative ${pathname == "/" ? "md:h-[1084px] sm:h-[542px] h-[542px]" : "h-fit"}`} >
        <div className={`flex flex-row justify-around ${pathname == "/" ? "max-sm:bg-[#E58411]" : "bg-[#E58411]"} h-fit md:p-1 p-3`} >
            <div className="md:hidden max-sm:block block">
                <Button OnClick={() => SetMenuOpened(!MenuOpened)} Icon={!MenuOpened ? RxHamburgerMenu : IoMdClose}></Button>
            </div>
            <div className='mr-auto  font-bold text-[28px]'>
                <Link href={'/'}>Panto</Link>
            </div>
            <div className="max-sm:hidden flex flex-row basis-1/2 justify-around">
                {Service.loading ? <></> : <HeaderItem toPath="/services" text="Услуги" subItems={Service.categories?.map((el) => { return { text: el.serviceName, toPath: `/services?furnitureName=${el.serviceName}` } })} />}
                <HeaderItem toPath="/examples" text="Портфолио" />
                {/* <HeaderItem toPath="/our_team" text="Команда" /> */}
                <HeaderItem toPath="/reviews" text="Отзывы" />
            </div>
            <div onClick={() => {
                SetOnShopCartOpened(true)
            }} className='ml-auto mr-5 flex gap-x-2 bg-[#E58411] shadow-md p-1 rounded-md'>
                {/* <SettingFilled className='text-3xl cursor-pointer hover:scale-110 duration-500 transition-all' /> */}
                <Badge size="small" className='text-white' count={products.length}>
                    <ShopFilled className='text-3xl cursor-pointer  hover:scale-110 duration-500 transition-all' />
                </Badge>
            </div>

        </div>
        {pathname == "/" && <img className="absolute w-full object-cover top-0 -z-10 md:h-[1084px]  max-sm:h-[542px] h-[542px]" src="Rectangle 1441.png" />}
        {pathname == "/" && <div className="flex flex-col justify-center text-center items-center h-full">
            <motion.h1 {...AnimProps} transition={{ delay: .5, duration: 300, type: 'spring' }} className="md:text-[80px] sm:text-[40px] font-bold text-[30px]">Обивка и ремонт мягкой мебели
            </motion.h1>
            <motion.h1 {...AnimProps} transition={{ delay: .55, duration: 300, type: 'spring' }} className='md:text-[80px] sm:text-[40px] font-bold text-[30px]'> в Орехово-Зуево</motion.h1>
            <motion.p {...AnimProps} transition={{ delay: .65, duration: 300, type: 'spring' }}>Профессиональный ремонт,</motion.p>
            <motion.p {...AnimProps} transition={{ delay: .7, duration: 300, type: 'spring' }}>
                реставрация и перетяжка мягкой мебели любой сложности, в том числе старинной и антикварной.
            </motion.p>
            <motion.p {...AnimProps} transition={{ delay: .7, duration: 300, type: 'spring' }}>
                Разработка и производство мебели по индивидуальным размерам.
            </motion.p>
            <Button WithTranslateAnim ButtonText="Расчитать стоимость" OnClick={() => {
                SetCalculateOpened(true);
            }} Icon={IoIosPricetags} />
        </div>}
        <Drawer mask title="Меню" open={MenuOpened} onClose={() => SetMenuOpened(false)}>
            <Menu
                mode='inline'

                items={[
                    {
                        key: 'services',
                        label: "Услуги",
                        children: Service.loading ? [] : Service.categories!.map((el, ind) => { return { key: ind, label: el.serviceName } })
                    },
                    {
                        key: 'portfolio',
                        label: "Портфолио",
                    },
                    {
                        key: 'team',
                        label: "Команда",
                    },
                    // {
                    //     key: 'reviews',
                    //     label: "Отзывы",
                    // }
                ]}
            />
        </Drawer>
        <ModalShopCart onClose={() => SetOnShopCartOpened(!OnShopCartOpened)} Open={OnShopCartOpened} />
        <CalculatePrice CalculateOpened={CalculateOpened} SetCalculateOpened={SetCalculateOpened} />
    </div>)
}
type LinkType = { text: string, toPath: string }

export function HeaderItem({ text, subItems, toPath }: { text: string, toPath: string, subItems?: LinkType[] }) {
    const pathname = usePathname()
    const { push } = useRouter()
    const AnimProps = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } }
    const [OnEnter, SetOnEnter] = useState(false)
    return (<motion.div onMouseEnter={() => SetOnEnter(true)} onClick={() => {
        SetOnEnter(true)
        push(toPath)
    }} onMouseLeave={() => SetOnEnter(false)} className='duration-700 items-center gap-x-1 flex relative transition-all py-2 px-4 rounded-md cursor-pointer w-max border border-transparent hover:border-white'>
        <p>{text} </p>
        {subItems && <AnimatePresence mode="wait">
            {OnEnter ? <motion.div key={0} {...AnimProps} transition={{ type: 'spring', duration: .2 }}>
                <FaAngleUp />
            </motion.div> : <motion.div key={1} {...AnimProps} transition={{ type: 'spring', duration: .2 }}>
                <FaAngleDown />
            </motion.div>}
        </AnimatePresence>}
        <AnimatePresence>
            {OnEnter && <motion.div exit={{ opacity: 0 }} initial={{ opacity: 0 }} onMouseEnter={() => SetOnEnter(true)} animate={{ opacity: 1 }} transition={{ type: 'spring' }} className='absolute w-max gap-y-1 z-10 flex flex-col top-14'>
                {subItems?.map(({ text, toPath }, ind) => <motion.div whileHover={{}} key={ind} className={`duration-700 transition-all p-2 rounded-md cursor-pointer border border-transparent ${pathname != "/" ? `hover:border-[#E58411]` : 'hover:border-white'}`}>
                    <Link className={`${pathname != "/" && `text-[#E58411]`} font-bold`} href={toPath}>
                        <p >{text}</p>
                    </Link>
                </motion.div>)}
            </motion.div>}
        </AnimatePresence>
    </motion.div>)
}
type Steps = {
    SelectedStep: number
    StepOne?: "Кровать" | "Диван" | "Кресло" | "Стул" | "Банкетка" | "Пуфик",
    StepTwo?: "Ткань" | "Кожа" | "Экокожа" | "Еще думаю...",
    StepThree?: "В черте города" | "До 50 км от города" | "Более 50 км от города" | "До 20 км от города",
    StepFour?: "Работа + материал" | "Только работа",
    StepFive?: "Лифт есть" | "Лифта нету",
    FloorNum?: number,
    TgName: string
}
//Модальное окно расчета стоимости
export function CalculatePrice({ CalculateOpened, SetCalculateOpened }: { CalculateOpened: boolean, SetCalculateOpened: (state: boolean) => void }) {
    const [SelectedModal, SetSelected] = useState<Steps>({
        SelectedStep: 1,
        FloorNum: 1,
        TgName: ""
    })
    return (<Drawer mask footer={
        !(SelectedModal.SelectedStep > 5) && <div className="flex font-bold">

            <p className='underline cursor-pointer' onClick={() => {
                if (SelectedModal.SelectedStep == 1) SetCalculateOpened(false)
                SetSelected({ ...SelectedModal, SelectedStep: SelectedModal.SelectedStep == 1 ? 1 : --SelectedModal.SelectedStep })


            }}>{SelectedModal.SelectedStep == 1 ? "Закрыть окно" : "К предыдущему шагу"}</p>
            <p className='ml-auto'>Шаг {SelectedModal.SelectedStep} из 5</p>
        </div>
    } placement='left' title="Расчет стоимости" open={CalculateOpened} width="100vw" onClose={() => SetCalculateOpened(false)}>
        <AnimatePresence>
            <CalculatePriceStep CloseModal={()=>{SetCalculateOpened(false)}} SelectedModal={SelectedModal} SetSteps={SetSelected} />
        </AnimatePresence>
    </Drawer>)
}
export function CalculatePriceStep({ SelectedModal, SetSteps,CloseModal }: { SelectedModal: Steps, SetSteps: (state: Steps) => void,CloseModal: ()=>void }) {
    const { SelectedStep } = SelectedModal
    const [StepsData, _] = useState<{
        imageSource?: string, Value: string, Desc?: string
    }[][]>([
        [
            {
                imageSource: "/Steps/capitone-bed-min_270x162_b4d.jpg",
                Value: "Кровать",
            },
            {
                imageSource: "/Steps/capitone-sofa-min_270x162_b4d.jpg",
                Value: "Диван",

            },
            {
                imageSource: "/Steps/capitone-chair-2-min_270x162_b4d.jpg",
                Value: "Кресло",

            },
            {
                imageSource: "/Steps/capitone-chair-min_270x162_b4d.jpg",
                Value: "Банкетка",

            },
            {
                imageSource: "/Steps/capitone-poof-min_270x162_b4d.jpg",
                Value: "Пуфик",

            },
            {
                imageSource: "/Steps/capitone-panel-min_270x162_b4d.jpg",
                Value: "Простая",
                Desc: "геометрическая форма"
            },
            {
                imageSource: "/Steps/capitone-other-min_270x162_b4d.jpg",
                Value: "Сложная",
                Desc: "геометрическая форма"
            }
        ],
        [
            {
                imageSource: "/Steps/StepTwo/material-fabric-min_270x203_a38.jpg",
                Value: "Ткань",
                Desc: "Текстильные материалы"
            },
            {
                imageSource: "/Steps/StepTwo/material-ecoleather-min_270x203_a38.jpg",
                Value: "Экокожа",
                Desc: "Искусственная кожа"
            },
            {
                imageSource: "/Steps/StepTwo/material-leather-min_270x203_a38.jpg",
                Value: "Кожа",
                Desc: "Натуральная кожа"
            },
            {
                Value: "Еще думаю...",
                Desc: "Нужен совет"
            }
        ],
        [
            {
                Value: "В черте города"
            },
            {
                Value: "До 20 км от города"
            },
            {
                Value: "До 50 км от города"
            },
            {
                Value: "Более 50 км от города"
            }
        ],
        [
            {
                Value: "Работа + материал",
                Desc: "Услуга под ключ"
            },
            {
                Value: "Только работа",
                Desc: "Материал и фурнитура ваши"
            }
        ],
        [
            {
                Value: "Лифт есть",
            },
            {
                Value: "Лифта нету",
            }
        ]
    ])
    function OnChangeFirstStep<T extends keyof Steps>(selectedStep: T, value: Steps[T]): void {

        if (selectedStep == "StepOne") SetSteps({ ...SelectedModal, StepOne: value as Steps["StepOne"], SelectedStep: ++SelectedModal.SelectedStep })
        else if (selectedStep == "StepTwo") SetSteps({ ...SelectedModal, StepTwo: value as Steps["StepTwo"], SelectedStep: ++SelectedModal.SelectedStep })
        else if (selectedStep == "StepThree") SetSteps({ ...SelectedModal, StepThree: value as Steps["StepThree"], SelectedStep: ++SelectedModal.SelectedStep })
        else if (selectedStep == "StepFour") SetSteps({ ...SelectedModal, StepFour: value as Steps["StepFour"], SelectedStep: ++SelectedModal.SelectedStep })
        else if (selectedStep == "StepFive") {
            SetSteps({ ...SelectedModal, StepFive: value as Steps["StepFive"], SelectedStep: ++SelectedModal.SelectedStep })
            startTimer()
        }
    }
    const startTimer = () => {
        setTimeout(() => {
            SetFinalStep(false);
        }, 5000)
    }
    const [LoadingFinalStep, SetFinalStep] = useState(true)
    const onChange: InputNumberProps['onChange'] = (value) => {
        SetSteps({ ...SelectedModal, FloorNum: value as number })
    };

    switch (SelectedStep) {
        case 1:
            return <motion.div key={0} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", duration: 3, }} exit={{ x: 100, opacity: 0 }}>
                <p className='font-bold text-center text-lg'>Вид мебели</p>
                <p className="text-gray-400 text-center ">Что нужно перетянуть?</p>
                <Radio.Group className="flex justify-center" name="firstStep" value={SelectedModal.StepOne}>
                    <div className="grid gap-3  grid-cols-2">
                        {StepsData[0].map((el, ind) => <CalculatePriceCard StepData={{ StepName: "StepOne", OnChangeFirstStep: OnChangeFirstStep }} key={ind} {...el} />)}
                    </div>

                </Radio.Group>
            </motion.div>
        case 2:
            return <motion.div key={1} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", duration: 3 }} exit={{ x: 100, opacity: 0 }}>
                <p className='font-bold text-center text-lg'>Материал</p>
                <p className="text-gray-400 text-center ">В какой материал хотите перетянуть?</p>
                <Radio.Group className="flex justify-center" name="secondStep" value={SelectedModal.StepTwo}>
                    <div className="grid gap-3  grid-cols-2">
                        {StepsData[1].map((el, ind) => <CalculatePriceCard StepData={{ StepName: "StepTwo", OnChangeFirstStep: OnChangeFirstStep }} key={ind} {...el} />)}
                    </div>

                </Radio.Group>
            </motion.div>
        case 3:
            return <motion.div key={2} initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ type: "spring", duration: 3 }} exit={{ x: 100, opacity: 0 }}>
                <p className='font-bold text-center text-lg'>Где</p>
                <Radio.Group className="flex justify-center" name="thirdStep" value={SelectedModal.StepThree}>
                    <div className="grid gap-3  grid-cols-2">
                        {StepsData[2].map((el, ind) => <CalculatePriceCard StepData={{ StepName: "StepThree", OnChangeFirstStep: OnChangeFirstStep }} key={ind} {...el} />)}
                    </div>

                </Radio.Group>
            </motion.div>
        case 4:
            return <motion.div>
                <p className='font-bold text-center text-lg'>Какой материал</p>
                <Radio.Group className="flex justify-center" name="FourStep" value={SelectedModal.StepFour}>
                    <div className="grid gap-3  grid-cols-2">
                        {StepsData[3].map((el, ind) => <CalculatePriceCard StepData={{ StepName: "StepFour", OnChangeFirstStep: OnChangeFirstStep }} key={ind} {...el} />)}
                    </div>

                </Radio.Group>
            </motion.div>
        case 5:
            return <motion.div className="flex justify-center items-center flex-col">
                <p className='font-bold text-center text-lg'>На каком этаже</p>
                <InputNumber min={1} max={10} defaultValue={1} onChange={onChange} />
                <Radio.Group className="flex justify-center" name="FiveStep" value={SelectedModal.StepFour}>
                    <div className="grid gap-3  grid-cols-2">
                        {StepsData[4].map((el, ind) => <CalculatePriceCard StepData={{ StepName: "StepFive", OnChangeFirstStep: OnChangeFirstStep }} key={ind} {...el} />)}
                    </div>

                </Radio.Group>
            </motion.div>
        default:
            return <motion.div>
                {LoadingFinalStep ? <div className="flex justify-center items-center">
                    <Spin tip="Загружаем ваш расчет" size="large" />
                </div> : <div className="flex justify-center items-center flex-col gap-y-2"  >
                    <Input onChange={(el) => {
                        SetSteps({ ...SelectedModal, TgName: `https://t.me/${el.target.value}` })
                    }} className="max-w-96" prefix={<img src="https://ifellow.ru/academy/tg.png" className="size-5 object-cover" />} placeholder="Telegram никнейм" />
                    <ANTDButton onClick={async () => {
                        await fetch(BACKEND_URL + "/furniture/calculate", {
                            method: 'POST',
                            body: JSON.stringify(SelectedModal),
                            headers: {
                                "Content-Type": "application/json"
                            }
                        }).finally(() => {
                            SetSteps({
                                SelectedStep: 1,
                                FloorNum: 1,
                                TgName: ""
                            })
                        })
                    }} className="max-w-96 w-full">Отправить заявку менеджеру</ANTDButton>
                </div>}
            </motion.div>
    }
}
export function CalculatePriceCard({ imageSource, Value, Desc, StepData }: {
    imageSource?: string, Value: string, Desc?: string, StepData: {
        StepName: keyof Steps, OnChangeFirstStep: <T extends keyof Steps>(selectedStep: T, value: Steps[T]) => void
    }
}) {
    const { StepName, OnChangeFirstStep } = StepData;

    return (<div className='relative' onClick={() => {
        OnChangeFirstStep(StepName, Value as any)
    }}>
        <Card
            bordered={false}
            hoverable
            className={`h-full ${imageSource ? "" : "flex justify-center items-center"}`}
            cover={imageSource && <img alt="example" src={imageSource} />}
        >
            <Meta title={Value} description={Desc} />
        </Card>
        <Radio className="absolute z-10 top-0 right-0 m-2" value={Value} />
    </div>)
}