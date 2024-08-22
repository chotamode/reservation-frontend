import TopNav from "../components/landing_page/TopNav.jsx";
import Hero from "../components/landing_page/Hero.jsx";
import BigButton from "../components/landing_page/BigButton.jsx";
import Arrow from "./../assets/images/arrow.svg";
import Accordeon from "../components/landing_page/Accordeon.jsx";
import {useState} from "react";
import Drawer from "../components/landing_page/Drawer.jsx";

function LandingPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const contentElements = [
        { title: "О проекте", text: "METOD - это онлайн-платформа, которая помогает людям найти психолога и записаться на консультацию онлайн." },
        { title: "Как работает METOD?", text: "Мы собрали для вас лучших психологов, которые помогут вам решить ваши проблемы. Выберите психолога, который вам подходит, и запишитесь на консультацию онлайн." },
    ];

    return (
        <div className="mx-32">
            <div className="flex flex-col gap-8 h-screen py-10">
                <div className="md:hidden">
                    <button onClick={toggleDrawer} className="text-black">Menu</button>
                </div>
                <div className="hidden md:block">
                    <TopNav />
                </div>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
                <div className="flex flex-grow flex-col gap-8 w-full h-full">
                    <div className="flex h-2/3 w-full">
                        <Hero />
                    </div>
                    <div className="flex h-1/3 w-full">
                        <BigButton text={"ЗАПИСАТЬСЯ"} icon={<img src={Arrow} alt="Arrow" />} />
                    </div>
                </div>
            </div>
            <div className="my-32">
                <Accordeon contentElements={contentElements} />
            </div>
            <div className="h-screen bg-gray-200"></div>
        </div>
    );
}

export default LandingPage;