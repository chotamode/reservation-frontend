import { useNavigate } from 'react-router-dom';
import TopNav from "../components/topnav/TopNav.jsx";
import Hero from "../components/landing_page/Hero.jsx";
import BigButton from "../components/landing_page/BigButton.jsx";
import Arrow from "./../assets/images/arrow.svg";
import Accordeon from "../components/landing_page/Accordeon.jsx";
import { useState } from "react";
import Drawer from "../components/landing_page/Drawer.jsx";
import Carousel from "../components/landing_page/Carousel.jsx";
import mockPsychologists from '../components/landing_page/mockPsychologists';
import Footer from "../components/footer/Footer.jsx";
import EmotionCard from "../components/landing_page/EmotionCard.jsx";

function LandingPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleOpenFullList = () => {
        navigate('/requests');
    };

    const handleNavigateToSelectPsychologist = () => {
        navigate('/select-psychologist');
    };

    const contentElements = [{
        title: "О проекте",
        text: "METOD - это онлайн-платформа, которая помогает людям найти психолога и записаться на консультацию онлайн."
    }, {
        title: "Как работает METOD?",
        text: "Мы собрали для вас лучших психологов, которые помогут вам решить ваши проблемы. Выберите психолога, который вам подходит, и запишитесь на консультацию онлайн."
    },];

    const emotionCardsData = [
        { index: 1, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд." },
        { index: 2, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд." },
        { index: 3, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд." },
        { index: 4, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд." },
        { index: 5, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд." },
        { index: 6, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд." },
        { index: 7, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд." },
        { index: 8, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд." }
    ];

    return (
        <div className="">
            <div className="flex flex-col gap-8 h-screen">
                <div className="md:hidden">
                    <button onClick={toggleDrawer} className="text-black">Menu</button>
                </div>
                <div className="hidden md:block">
                    <TopNav />
                </div>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
                <div className="flex flex-grow flex-col gap-8 w-full h-full">
                    <div className="flex h-3/4 w-full">
                        <Hero />
                    </div>
                    <div className="flex h-1/4 w-full">
                        <BigButton
                            text={"ЗАПИСАТЬСЯ"}
                            icon={<img src={Arrow} alt="Arrow" />}
                            onClick={handleNavigateToSelectPsychologist}
                        />
                    </div>
                </div>
            </div>
            <div className="my-32">
                <Accordeon contentElements={contentElements} header={<span>ХОТИТЕ УЗНАТЬ БОЛЬШЕ О <span className="font-kodchasan">METOD</span></span>} />
            </div>
            <div className="flex flex-row h-44 gap-5 mb-5">
                <span className="rounded-3xl bg-white border-1 border-greenDark w-full h-full flex items-center justify-center">
                    <p className="font-bold">
                        Запросы с которыми работаем:
                    </p>
                </span>
                <BigButton
                    text={"ОТКРЫТЬ ПОЛНЫЙ СПИСОК"}
                    icon={<img src={Arrow} alt="Arrow" />}
                    onClick={handleOpenFullList}
                />
            </div>
            <div className="">
                <div className="grid grid-cols-4 gap-5 h-custom-440">
                    {emotionCardsData.map((card, index) => (
                        <EmotionCard key={index} index={card.index} title={card.title} description={card.description} />
                    ))}
                </div>
                {/*<p className=" flex rounded-full bg-[#D3DBA8] border-1 border-black mt-5 w-3/4 font-raleway text-[0.813rem] text-center h-16 items-center justify-center font-medium">*/}
                {/*    Здесь представлены лишь те не многие направления, где мы можем вам помочь, откройте весь список для ознакомления!*/}
                {/*</p>*/}
            </div>
            <div className={"my-32"}>
                <Carousel psychologists={mockPsychologists} />
            </div>
            <div className="flex h-44 w-full">
                <BigButton
                    text={"ЗАПИСАТЬСЯ"}
                    icon={<img src={Arrow} alt="Arrow" />}
                    onClick={handleNavigateToSelectPsychologist}
                />
            </div>
            <div className={"py-32"}>
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;