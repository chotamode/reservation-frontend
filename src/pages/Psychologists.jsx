import TopNav from "../components/topnav/TopNav.jsx";
import Hero from "../components/landing_page/Hero.jsx";
import Arrow from "../assets/images/arrow.svg";
import BigButton from "../components/landing_page/BigButton.jsx";
import Drawer from "../components/landing_page/Drawer.jsx";
import {useState} from "react";
import Footer from "../components/footer/Footer.jsx";
import PsychologistRegistrationForm from "../components/auth/PsychologistRegistrationForm.jsx";

function Psychologists() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    return (
        <div>
            <div className="flex flex-col h-[38rem] gap-8 ">
                <div className="md:hidden">
                    <button onClick={toggleDrawer} className="text-black">Menu</button>
                </div>
                <div className="hidden md:block">
                    <TopNav/>
                </div>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
                <div className="flex flex-grow flex-col gap-8 w-full h-full">
                    <div className="flex h-[25.5rem] w-full">
                        <Hero/>
                    </div>

                    {/*<div className="flex h-1/4 w-full">
                        <BigButton text={"ЗАПИСАТЬСЯ"} icon={<img src={Arrow} alt="Arrow"/>}/>
                    </div>
                    */}
                </div>
            </div>

            <div className="bg-white text-black p-10 rounded-3xl  mb-10 font-raleway flex flex-col gap-5 border-black">
                <h1 className={"text-2xl font-semibold"}>
                    Вы следуете за своим призванием, мы заботимся об организации
                </h1>
                <p>Мы активно поддерживаем молодых специалистов и даем им возможность реализовать свой профессиональный
                    путь на нашей платформе, а нашим клиентам — сделать первые шаги к себе</p>
            </div>


            <div className="bg-white p-10 rounded-3xl mb-20 font-roboto flex flex-col gap-2 border-black">
                <h1 className="text-2xl font-bold mb-5">
                    Давайте познакомимся?
                </h1>

                <PsychologistRegistrationForm/>


            </div>

            <Footer/>
        </div>
    );
}

export default Psychologists;