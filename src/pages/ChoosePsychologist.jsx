// src/pages/ChoosePsychologist.jsx
import PsychologistCard from "../components/landing_page/PsychologistCard.jsx";
import {useEffect, useState} from "react";
import TopNav from "../components/topnav/TopNav.jsx";
import SearchIcon from "../assets/images/search.svg";
import Footer from "../components/footer/Footer.jsx";
import useFetchPsychologists from "../hooks/psychologist/useFetchPsychologists.js";
import {useNavigate} from "react-router-dom";

function PsychologistCard2({ psychologist }) {
    const navigate = useNavigate();

    const handleButtonClick = () => {
        navigate(`/psychologist-info/${psychologist.system_users.id}`);
    };

    return (
        <div className="bg-white p-5 rounded-3xl font-roboto drop-shadow-md flex flex-col h-full">
            <div className="flex flex-col gap-7 flex-grow">
                <div className="flex flex-row gap-5 justify-start items-center">
                    <img src={psychologist.img} alt="Psychologist" className="rounded-full w-24 h-24 filter grayscale" />
                    <div className="flex flex-col">
                        <h1 className="font-semibold text-xl">
                            {psychologist.system_users.name} {psychologist.system_users.surname}
                        </h1>
                        <p className="text-gray-500 text-md">
                            {psychologist.specialist_type}
                        </p>
                    </div>
                </div>
                <p className="text-gray-700">
                    {psychologist.mini_description}
                </p>
                <div className="flex flex-wrap gap-2 mb-10">
                    {psychologist.specializations.map((practice, index) => (
                        <span key={index} className="rounded-lg bg-[#D3DBA8] p-1 px-2 text-xs">
                            {practice}
                        </span>
                    ))}
                </div>
            </div>
            <button
                className="rounded-2xl bg-[#D3DBA8] w-full h-10 text-sm font-semibold mt-auto"
                onClick={handleButtonClick}
            >
                Записаться
            </button>
        </div>
    );
}

const psychologists = [{
    name: "Иван Иванов",
    img: "https://xsgames.co/randomusers/assets/avatars/male/10.jpg",
    speciality: "Клинический психолог",
    description: "Иван Иванов — психолог с 10-летним стажем работы. Он специализируется на клинической психологии и помогает людям справиться с депрессией, тревожностью и другими психологическими проблемами.",
    practices: ["КПТ", "Психоанализ", "Гештальт-терапия"]
}, {
    name: "Мария Петрова",
    img: "https://xsgames.co/randomusers/assets/avatars/female/17.jpg",
    speciality: "Психотерапевт",
    description: "Мария Петрова — психотерапевт с 5-летним стажем работы. Она специализируется на психотерапии и помогает людям справиться с проблемами в отношениях, стрессом и другими психологическими проблемами.",
    practices: ["КПТ", "Гештальт-терапия", "Гуманистическая психотерапия", "КПТ", "Гештальт-терапия", "Гуманистическая психотерапия", "КПТ", "Гештальт-терапия", "Гуманистическая психотерапия"]
}, {
    name: "Алексей Сидоров",
    img: "https://xsgames.co/randomusers/assets/avatars/male/17.jpg",
    speciality: "Когнитивный психолог",
    description: "Алексей Сидоров — психолог с 7-летним стажем работы. Он специализируется на когнитивной психологии и помогает людям справиться с проблемами внимания, памяти и другими психологическими проблемами.",
    practices: ["КПТ", "Психоанализ", "Гештальт-терапия"]
}, {
    name: "Елена Кузнецова",
    img: "https://xsgames.co/randomusers/assets/avatars/female/25.jpg",
    speciality: "Психолог-консультант",
    description: "Елена Кузнецова — психолог с 3-летним стажем работы. Она специализируется на консультировании и помогает людям справиться с проблемами в работе, учебе и другими психологическими проблемами.",
    practices: ["КПТ", "Психоанализ", "Гештальт-терапия"]
}, {
    name: "Анна Смирнова",
    img: "https://xsgames.co/randomusers/assets/avatars/female/35.jpg",
    speciality: "Психолог-практик",
    description: "Анна Смирнова — психолог с 2-летним стажем работы. Она специализируется на практической психологии и помогает людям справиться с проблемами в поведении, эмоциях и другими психологическими проблемами.",
    practices: ["КПТ", "Психоанализ", "Гештальт-терапия"]
}, {
    name: "Дмитрий Иванов",
    img: "https://xsgames.co/randomusers/assets/avatars/male/71.jpg",
    speciality: "Психолог-консультант",
    description: "Дмитрий Иванов — психолог с 4-летним стажем работы. Он специализируется на консультировании и помогает людям справиться с проблемами в работе, учебе и другими психологическими проблемами.",
    practices: ["КПТ", "Психоанализ", "Гештальт-терапия"]
}];

function ChoosePsychologist() {
    const { psychologists, loading, error } = useFetchPsychologists();

    return (
        <div>
            <TopNav />
            <div className="flex flex-col gap-5 my-9">
                <h1 className="font-semibold font-[#39442B]">
                    Идеальный специалист для вас:
                </h1>
                {/* Search */}
                <div className="relative">
                    <input type="text" id="search" className="rounded-2xl p-2 px-4 drop-shadow-md w-full pr-10"
                           placeholder="Поиск по запросу" />
                    <img src={SearchIcon} alt="Search"
                         className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5" />
                </div>
                {/* Dropdown menu */}
                <select name="psychologist" id="psychologist" className="rounded-xl p-2 border-1 border-gray-300 w-36">
                    <option value="CBT">Когнитивно-поведенческая терапия</option>
                    <option value="Psychoanalysis">Психоанализ</option>
                    <option value="Gestalt">Гештальт-терапия</option>
                    <option value="Humanistic">Гуманистическая психотерапия</option>
                </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {loading ? (
                    <div>Loading...</div>
                ) : error ? (
                    <div>Error: {error}</div>
                ) : (
                    psychologists.map(psychologist => (
                        <PsychologistCard2 key={psychologist.name} psychologist={psychologist} />
                    ))
                )}
            </div>

            <Footer />
        </div>
    );
}

export default ChoosePsychologist;