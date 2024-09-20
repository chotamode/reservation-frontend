// src/pages/LandingPage.jsx
import { useNavigate } from 'react-router-dom';
import TopNav from "../components/topnav/TopNav.jsx";
import Hero from "../components/landing_page/Hero.jsx";
import BigButton from "../components/landing_page/BigButton.jsx";
import Arrow from "./../assets/images/arrow.svg";
import Accordeon from "../components/landing_page/Accordeon.jsx";
import { useState } from "react";
import Drawer from "../components/landing_page/Drawer.jsx";
import Carousel from "../components/landing_page/Carousel.jsx";
import Footer from "../components/footer/Footer.jsx";
import EmotionCard from "../components/landing_page/EmotionCard.jsx";
import useFetchPsychologists from '../hooks/psychologist/useFetchPsychologists';

function LandingPage() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const { psychologists, loading, error } = useFetchPsychologists();

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
        text: "Метод это безопасное пространство, помогающее наполнить себя и свое состояние. Мы бережно создаём «Метод» в котором вы можете освободиться от не нужных и лишних мыслей. Останьтесь наедине со своими чувствами, проведите время с собой. \n" +
            "\n" +
            "В команде проекта собрались специалисты, отражающие нашу любовь и сакральный подход  к психологии. Мы дорожим своей профессиональной репутацией и поэтому выбирая своего терапевта, вы можете быть абсолютно спокойны."
    }, {
        title: "Как работает METOD?",
        text: "Приём и запись на консультацию осуществляется на нашей платформе. Вы можете выбрать для себя удобную дату и время, а так же самостоятельно ознакомиться и записаться к специалисту.\n" +
            "Точное время консультации обговаривается  непосредственно на консультации, но как правило составляет 50-60 минут.\n" +
            "\n" +
            "Так же вы можете заполнить анкету и указать ваш запрос, мы свяжемся с вами и предложим несколько вариантов психологов. Наша команда состоит из терапевтов работающих в разных направлениях и методах. Поэтому вы можете быть спокойны, что с вашим запросом мы можем вам помочь."
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
                {/*<BigButton*/}
                {/*    text={"ОТКРЫТЬ ПОЛНЫЙ СПИСОК"}*/}
                {/*    icon={<img src={Arrow} alt="Arrow" />}*/}
                {/*    onClick={handleOpenFullList}*/}
                {/*/>*/}
            </div>
            <div className="">
                <div className="grid grid-cols-4 gap-5 h-custom-440">
                    {emotionCardsData.map((card, index) => (
                        <EmotionCard
                            key={index}
                            index={card.index}
                            title={card.title}
                            description={card.description}
                            icon={card.icon}
                            iconX={card.iconX}
                            iconY={card.iconY}
                        />
                    ))}
                </div>
            </div>
            <div className={"my-32"}>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <Carousel psychologists={psychologists}/>
                )}
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