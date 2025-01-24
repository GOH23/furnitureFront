import { RiTelegram2Fill } from "react-icons/ri";
import { BACKEND_URL } from "../ui/hooks/constants";
import OurWork from "../ui/OurWork";
import ServicePage from "../ui/ServicePage";
import ContactButton from "./ContactButton";
import { FaVk } from "react-icons/fa6";
import { WhatsAppOutlined } from "@ant-design/icons";
import { Description } from "./Description";

export default async function Examples() {


    return (
        <main className="min-h-dvh">
            <p  className=" font-bold  text-[#1E1E1E] text-[42px] max-sm:text-[30px] text-center">Отзывы наших клиентов</p>
            <div className="flex justify-center items-center flex-wrap">
                <div className="flex flex-col justify-center  my-3 lg:h-[500px]">
                    <Description />
                    <div className="flex justify-around">
                        <ContactButton href="" target="_blank">
                            <RiTelegram2Fill />
                        </ContactButton>
                        <ContactButton href="" target="_blank">
                            <FaVk />
                        </ContactButton>
                        <ContactButton href="" target="_blank">
                            <WhatsAppOutlined />
                        </ContactButton>
                    </div>
                </div>

                <iframe className="lg:w-[400px] h-[400px]" src="https://yandex.ru/map-widget/v1/?um=constructor%3Af2ee9d0c2b0b9f605601536fc1023cd720e1b230f8e21e847d7742a7d501b5b9&amp;source=constructor" />
            </div>
        </main>
    );
}