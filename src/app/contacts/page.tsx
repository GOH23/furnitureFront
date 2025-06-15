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
        <main className="min-h-dvh py-8 px-4">
            <h1 className="font-bold text-[#1E1E1E] text-[42px] max-sm:text-[30px] text-center mb-8">
                Контакты
            </h1>
            <div className="flex justify-center items-start gap-8 flex-wrap max-w-6xl mx-auto">
                <div className="flex flex-col items-center bg-white p-8 rounded-lg shadow-md w-full max-w-2xl mx-auto">
                    <Description />
                    <div className="flex justify-center gap-8 mt-8">
                        <ContactButton href="" target="_blank" className="hover:scale-110 transition-transform">
                            <RiTelegram2Fill className="text-2xl" />
                        </ContactButton>
                        <ContactButton href="" target="_blank" className="hover:scale-110 transition-transform">
                            <FaVk className="text-2xl" />
                        </ContactButton>
                        <ContactButton href="" target="_blank" className="hover:scale-110 transition-transform">
                            <WhatsAppOutlined className="text-2xl" />
                        </ContactButton>
                    </div>
                </div>

                <div className="w-full lg:w-[500px] h-[400px] rounded-lg overflow-hidden shadow-md">
                    <iframe className="w-full h-full" src="https://yandex.ru/map-widget/v1/?um=constructor%3Aa31b9e8c864b9348c5587aaa2208d1be0c091d1f8a304691b79ffb68523b7450&amp;source=constructor"></iframe>
                </div>
            </div>
        </main>
    );
}