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
import icon1 from "../assets/images/cards/emotion1.svg";
import icon2 from "../assets/images/cards/emotion2.svg";
import icon3 from "../assets/images/cards/emotion3.svg";
import icon4 from "../assets/images/cards/emotion4.svg";
import icon5 from "../assets/images/cards/emotion5.svg";
import icon6 from "../assets/images/cards/emotion6.svg";
import icon7 from "../assets/images/cards/emotion7.svg";
import icon8 from "../assets/images/cards/emotion8.svg";

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
        { index: 1, title: "Эмоциональные состояния", description: "Агрессия, ревность, страх, апатия и тд.", icon: icon1, iconX: "130px", iconY: "10px" },
        { index: 2, title: "Состояния души", description: "C родителями/партнерами", icon: icon2, iconX: "130px", iconY: "80px" },
        { index: 3, title: "Коммуникативные трудности", description: "Обидчивость, застенчивость,\n" +
                "конфликтность и тд.", icon: icon3, iconX: "160px", iconY: "40px" },
        { index: 4, title: "Депрессивные, \n" +
                "невротические \n" +
                "состояния", description: "Личностные кризисы", icon: icon4, iconX: "180px", iconY: "100px" },
        { index: 5, title: "Психосоматические\n" +
                "расстройства", description: "", icon: icon5, iconX: "130px", iconY: "110px" },
        { index: 6, title: "Фобические\n" +
                "расстройства", description: "Панические состояния", icon: icon6, iconX: "130px", iconY: "110px" },
        { index: 7, title: "Зависимости", description: "В том числе и химические", icon: icon7, iconX: "130px", iconY: "10px" },
        { index: 8, title: "Работа с детьми \n" +
                "и семьями", description: "", icon: icon8, iconX: "60px", iconY: "130px" },
    ];

    return (
        <div className="">
            <div className="flex flex-col gap-8">
                <div className="md:hidden">
                    <button onClick={toggleDrawer} className="text-black">Menu</button>
                </div>
                <div className="hidden md:block">
                    <TopNav />
                </div>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer} />
                <div className="flex flex-grow flex-col gap-5 w-full h-full">
                    <div className="flex h-auto w-full">
                        <Hero/>
                    </div>
                    <div className="flex h-48 md:h-52 w-full -mb-11">
                        <BigButton
                            text={"ЗАПИСАТЬСЯ"}
                            icon={<img src={Arrow} alt="Arrow" />}
                            onClick={handleNavigateToSelectPsychologist}
                        />
                    </div>
                </div>
            </div>
            <div className="mt-0 md:my-32 md:pt-0">
                <Accordeon contentElements={contentElements} header={<span>ХОТИТЕ УЗНАТЬ БОЛЬШЕ О <span className="font-kodchasan">METOD</span></span>} />
            </div>
            <div className="flex flex-row h-40 md:h-56 py-9 -mb-5 md:mb-2 mt-7 ">
                <span className="rounded-3xl bg-white border-greenDark w-full h-full flex items-center justify-center">
                    <p className="font-bold">
                        Запросы с которыми работаем:
                    </p>
                </span>
            </div>
            <div className="">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-auto md:h-custom-440">
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
            <div className={"mt-32"}>
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    <Carousel psychologists={psychologists}/>
                )}
            </div>
            <div className="flex h-40 w-full mb-24 mt-8">
            <BigButton
                    text={"ОТКРЫТЬ ПОЛНЫЙ СПИСОК"}
                    icon={<img src={Arrow} alt="Arrow" />}
                    onClick={handleNavigateToSelectPsychologist}
                />
            </div>
            <div className={""}>
                <Footer />
            </div>
        </div>
    );
}

export default LandingPage;