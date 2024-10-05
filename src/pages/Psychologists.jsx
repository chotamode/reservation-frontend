import TopNav from "../components/topnav/TopNav.jsx";
import Hero from "../components/landing_page/Hero.jsx";
import Arrow from "../assets/images/arrow.svg";
import BigButton from "../components/landing_page/BigButton.jsx";
import Drawer from "../components/landing_page/Drawer.jsx";
import {useState} from "react";
import Footer from "../components/footer/Footer.jsx";

function Psychologists() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div>
            <div className="flex flex-col gap-8 h-screen">
                <div className="md:hidden">
                    <button onClick={toggleDrawer} className="text-black">Menu</button>
                </div>
                <div className="hidden md:block">
                    <TopNav/>
                </div>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
                <div className="flex flex-grow flex-col w-full h-full">
                    <div className="flex w-full">
                        <Hero/>
                    </div>
                    <div className="bg-white text-black p-10 rounded-3xl font-raleway flex flex-col gap-5 border-black mt-16">
                        <h1 className={"text-2xl font-semibold"}>
                            Вы следуете за своим призванием, мы заботимся об организации
                        </h1>
                        <p>Мы активно поддерживаем молодых специалистов и даем им возможность реализовать свой
                            профессиональный
                            путь на нашей платформе, а нашим клиентам — сделать первые шаги к себе</p>
                    </div>
                    {/*<div className="flex h-1/4 w-full">
                        <BigButton text={"ЗАПИСАТЬСЯ"} icon={<img src={Arrow} alt="Arrow"/>}/>
                    </div>
                    */}
                </div>
            </div>


            <div className="bg-white p-10 rounded-3xl font-roboto flex flex-col gap-2 border-black">
                <h1 className="text-2xl font-bold mb-5">
                    Давайте познакомимся?
                </h1>

                <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="font-bold">
                        Полное имя
                    </label>
                    <input type="text" id="name" className="rounded-lg p-2 border-1 border-gray-300"/>
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <input type="email" id="email" className="rounded-lg p-2 border-1 border-gray-300"/>
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="phone" className="font-bold">
                        Номер телефона
                    </label>
                    <input type="text" id="phone" className="rounded-lg p-2 border-1 border-gray-300"/>
                </div>

                <button className="rounded-lg bg-[#D3DBA8] mt-5 mx-auto w-full">
                    <p className="text-black p-2">
                        Отправить
                    </p>
                </button>
            </div>

            <Footer/>
        </div>
    );
}

export default Psychologists;