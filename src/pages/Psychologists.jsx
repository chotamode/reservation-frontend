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
            <div className="flex flex-col gap-8">
                <div className={"-mt-4 -md:pt-5 -md:mt-4"}>
                    <TopNav/>
                </div>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
                <div className="flex flex-grow flex-col gap-8 w-full h-full">
                    <div className="flex h-3/4 w-full">
                        <Hero/>
                    </div>
                    <div className="flex h-48  w-full pb-10 -mb-12 md:mb-0">
                        <BigButton text={"ЗАПИСАТЬСЯ"} icon={<img src={Arrow} alt="Arrow"/>}/>
                    </div>
                </div>
            </div>

            <div className="bg-white text-black p-4 md:p-12 rounded-3xl pb-6 -mt-8 md:my-11 font-raleway flex flex-col gap-5 border-black mb-10 md:mb-20">
                <h1 className={"text-xl md:text-2xl font-bold"}>
                    Вы следуете за своим призванием, мы заботимся об организации!
                </h1>
                <p className={"bg-[#EDF2CF] border-[#EDF2CF] p-3 rounded-3xl text-base md:text-lg"}>
                    Мы активно поддерживаем молодых специалистов и даем им возможность реализовать свой профессиональный
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