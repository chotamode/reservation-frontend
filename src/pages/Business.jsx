import React, { useState } from 'react';
import TopNav from "../components/topnav/TopNav.jsx";
import BusinessChubziki from "../assets/images/business/business_chubziki.svg";
import Footer from "../components/footer/Footer.jsx";
import BigButton from "../components/landing_page/BigButton.jsx";
import Arrow from "./../assets/images/arrow.svg";
import FreeDurov from "../assets/images/business/free_durov.svg";
import SupportCard from "../components/business/SupportCard.jsx";
import GalochkaList from "../components/business/GalochkaList.jsx";
import BusinessChubzik from "../assets/images/business/business_chubzik.svg";
import DialogChubzik from "../assets/images/business/dialog_chubzik.svg";
import Modal from "../components/Modal.jsx";
import ContactForm from "../components/ContactForm.jsx";
import useLeaveRequest from "../hooks/useLeaveRequest.js";

function Business() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { leaveRequest, loading, error, success } = useLeaveRequest();

    const galochkaItems = [
        "Общаться с психологом из дома, офиса или в пути",
        "Выбирать формат консультаций",
        "Чувствовать себя в безопасности",
        "Заботиться о своём ментальном здоровье"
    ];

    const handleButtonClick = () => {
        setIsModalOpen(true);
    };

    const handleFormSubmit = async (formData) => {
        await leaveRequest(formData.name, formData.email, formData.phone, formData.contactMethod);
        if (success) {
            setIsModalOpen(false);
        }
    };

    return (
        <div className={"-mt-4 -md:pt-5 -md:mt-4"}>
            <TopNav/>
            <div className="bg-white p-6 md:p-28 rounded-3xl my-10 font-raleway flex flex-col md:flex-row justify-between items-center">
                <div className="flex flex-col gap-5 text-2xl md:text-5xl w-full md:w-[23.375rem]">
                    <h1>Поддержка каждого члена вашей команды</h1>
                    <p className="text-lg md:text-xl">
                        Запустите программу психологической поддержки сотрудников
                    </p>
                </div>
                <img src={BusinessChubziki} alt="BusinessChubziki" className="w-full md:w-auto mt-6 md:mt-0"/>
            </div>

            <div className="h-44">
                <BigButton text="ОСТАВИТЬ ЗАЯВКУ" icon={<img src={Arrow} alt="Arrow"/>} onClick={handleButtonClick}/>
            </div>

            <div className="bg-white p-6 md:p-28 rounded-3xl my-10 font-raleway border-1">
                <h1 className="text-2xl md:text-5xl font-bold">Программа поддержки</h1>
                <div className="px-4 md:px-10">
                    <div className="flex flex-col md:flex-row gap-5 w-full my-12">
                        <SupportCard
                            imgSrc={FreeDurov}
                            title="Психологическое образование"
                            description="Вебинары, памятки, материалы для рассылки"
                        />
                        <SupportCard
                            imgSrc={DialogChubzik}
                            title="Консультации"
                            description="Общение с психологом в формате видео или переписки"
                        />
                    </div>
                    <button className="rounded-2xl bg-[#D3DBA8] w-full h-14 text-xl font-bold" onClick={handleButtonClick}>
                        Оставить заявку
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 md:p-28 rounded-3xl my-10 font-raleway border-1">
                <h1 className="text-2xl md:text-5xl font-bold">Сотрудникам будет просто</h1>
                <div className="flex flex-col gap-5 w-full my-2 md:my-12 px-4 md:px-10">
                    <div className="flex flex-col md:flex-row gap-5 w-full my-12">
                        <GalochkaList items={galochkaItems}/>
                    </div>
                    <button className="rounded-2xl bg-[#D3DBA8] w-full h-14 text-xl font-bold" onClick={handleButtonClick}>
                        Оставить заявку
                    </button>
                </div>
            </div>

            <div className="bg-white p-6 md:p-28 rounded-3xl my-10 font-raleway border-1">
                <h1 className="text-2xl md:text-5xl font-bold">Программа поддержки</h1>
                <div className="px-4 md:px-10">
                    <div className="flex flex-col md:flex-row gap-5 w-full my-12">
                        <p className="flex flex-col gap-5 bg-[#DEECFF] w-full rounded-3xl p-6 md:p-11 text-lg font-normal justify-center">
                            Оставьте свои данные, чтобы мы связались с вами
                            и помогли выбрать формат поддержки для вашей команды.
                        </p>
                        <img src={BusinessChubzik} alt="BusinessChubzik"
                             className="w-10/12 md:w-auto mt-6 md:mt-0 mx-auto md:ml-20"/>
                    </div>
                    <button className="rounded-2xl bg-[#D3DBA8] w-full h-14 text-xl font-bold" onClick={handleButtonClick}>
                        Оставить заявку
                    </button>
                </div>
            </div>

            <div className={"mt-28"}>
                <Footer/>
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} header="Оставить заявку">
                <ContactForm onSubmit={handleFormSubmit} loading={loading} error={error} />
            </Modal>
        </div>
    );
}

export default Business;