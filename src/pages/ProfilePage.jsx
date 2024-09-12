import PropTypes from 'prop-types';
import {useNavigate} from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetchPsychologistsBySpecialization from '../hooks/psychologist/useFetchPsychologistsBySpecialization.js';
import useFetchUserDetails from '../hooks/useFetchUserDetails';
import TopNav from "../components/topnav/TopNav.jsx";
import Footer from "../components/footer/Footer.jsx";
import userIcon from '../assets/images/user.svg';
import newConsultationIcon from '../assets/images/profile/new_consult.svg';
import starIcon from '../assets/images/profile/star.svg';
import giftIcon from '../assets/images/profile/gift.svg';
import {PaymentTable} from "../components/PaymentTable.jsx";
import useFetchCustomerReservations from "../hooks/useFetchCustomerReservations.ts";
import {useState} from "react";

const payments = [
    {date: '01/01/2023', amount: '500', status: 'Completed'},
    {date: '15/01/2023', amount: '1000', status: 'Pending'},
    {date: '20/01/2023', amount: '1500', status: 'Failed'},
];

function ProfilePage() {
    const {user, logout} = useAuth();
    const navigate = useNavigate();
    const [specialization, setSpecialization] = useState('');
    const {
        psychologists,
        loading: loadingPsychologists,
        error: errorPsychologists
    } = useFetchPsychologistsBySpecialization(specialization);
    const {
        upcomingReservations,
        finishedReservations,
        loading: loadingReservations,
        error: errorReservations
    } = useFetchCustomerReservations(user.id);
    const {
        user: userDetails,
        error: errorUserDetails,
        loading: loadingUserDetails
    } = useFetchUserDetails(user.id);

    if (loadingPsychologists || loadingReservations || loadingUserDetails) return <div>Loading...</div>;
    if (errorPsychologists || errorReservations || errorUserDetails) return <div>Error: {errorPsychologists || errorReservations || errorUserDetails}</div>;

    const handleProfileClick = () => {
        navigate(`/update-user/${user.id}`);
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="container mx-auto p-4">
            <TopNav/>
            <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
                <div>
                    <div className={"flex flex-row justify-between items-center mb-7"}>
                        <h1 className="text-2xl font-bold">
                            Добро пожаловать в личный кабинет, {userDetails?.name}!
                        </h1>
                        <button
                            className={"rounded-2xl bg-red-500 text-white px-7 h-10"}
                            onClick={handleLogoutClick}
                        >
                            Logout
                        </button>
                        <button
                            className={"rounded-2xl bg-[#E5E7EB] px-7 h-10 flex items-center"}
                            onClick={handleProfileClick}
                        >
                            Мой профиль
                            <img src={userIcon} alt="User Icon" className="ml-2 h-6 w-6"/>
                        </button>
                    </div>

                    <div className={"flex flex-row gap-5 justify-between"}>
                        <div className={"rounded-3xl bg-[#E9EFC8] p-5 w-full"}>
                            <h3>Предстощая сессия:</h3>
                            <p>12/12/2023 10:00</p>
                        </div>
                        <div className={"rounded-3xl bg-[#DBEAFE] p-5 w-full"}>
                            <h3>Всего консультаций:</h3>
                            <p>15</p>
                        </div>
                        <div className={"rounded-3xl bg-[#E9EFC8] p-5 w-full"}>
                            <h3>Баланс счета:</h3>
                            <p>500 рублей</p>
                        </div>
                    </div>
                </div>
            </div>

            {upcomingSessions(upcomingReservations)}
            {finishedSessions(finishedReservations)}

            <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
                <h1 className="text-2xl font-bold mb-5">
                    Сводка по платежам:
                </h1>
                <PaymentTable payments={payments}/>
                <button className={"flex justify-end mt-4 mb-0"}>
                    <p>
                        Показать все
                    </p>
                </button>
            </div>

            <div className={"flex flex-col gap-3 mx-10 drop-shadow-md mb-10 font-normal"}>
                <button className={"rounded-3xl bg-[#E9EFC8]"}>
                    <div className={"flex flex-row gap-2 justify-center py-6"}>
                        <img src={newConsultationIcon} alt="New Consultation Icon"/>
                        <p>Записаться на новую консультацию</p>
                    </div>
                </button>
                <button className={"rounded-3xl bg-[#39442B]"}>
                    <div className={"flex flex-row gap-2 justify-center py-6 text-white"}>
                        <img src={starIcon} alt="Star Icon"/>
                        <p>Купить абонемент</p>
                    </div>
                </button>
                <button className={"rounded-3xl bg-[#EEE8E3]"}>
                    <div className={"flex flex-row gap-2 justify-center py-6"}>
                        <img src={giftIcon} alt="Gift Icon"/>
                        <p>Подарочный сертификат</p>
                    </div>
                </button>
            </div>

            <Footer/>
        </div>
    );
}

function getStatusColor(status) {
    switch (status) {
        case 'confirmed':
            return 'bg-[#E9EFC8]';
        case 'finished':
            return 'bg-[#E5E7EB]';
        case 'pending':
            return 'bg-[#DBEAFE]';
        case 'canceled':
            return 'bg-[#FECACA]';
        default:
            return 'bg-[#E9EFC8]';
    }
}

function upcomingSessions(upcomingSessions) {
    return (
        <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-5">
                Предстоящие сессии:
            </h1>
            <div className={"flex flex-col gap-2 overflow-auto max-h-96"}>
                {upcomingSessions.map((session) => upcomingSession(session.slots[0].time, session.status, session.format, session.slots[0].psychologists.system_users.name, session.slots[0].psychologists.system_users.surname, session.slots[0].psychologists.system_users.patronymic))}
            </div>
        </div>
    )
}

function finishedSessions(finishedSessions) {
    return (
        <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-5">
                Прошедшие сессии:
            </h1>
            <div className={"flex flex-col gap-2 overflow-auto max-h-96"}>
                {finishedSessions.map((session) => upcomingSession(session.slots[0].time, session.status, session.format, session.slots[0].psychologists.system_users.name, session.slots[0].psychologists.system_users.surname, session.slots[0].psychologists.system_users.patronymic))}
            </div>
        </div>
    )
}

function upcomingSession(time, status, format, name, surname, patronymic) {
    const statusColor = getStatusColor(status);
    return (
        <div className={`rounded-3xl p-5 w-full flex flex-row justify-between ${statusColor}`}>
            <div className={"flex flex-col gap-1"}>
                <h3 className={"font-bold"}>{time}</h3>
                <p className={"text-gray-500"}>{name} {surname} {patronymic} - {format}</p>
                <p>{status}</p>
            </div>
            <div className={"flex flex-row gap-5"}>
                <button className="rounded-xl bg-black bg-opacity-10 my-auto py-2 px-8">
                    Перенести
                </button>
                <button className="rounded-xl bg-[#39442B] my-auto py-2 px-8 text-white">
                    Отменить
                </button>
            </div>
        </div>
    );
}

ProfilePage.propTypes = {
    userDetails: PropTypes.shape({
        name: PropTypes.string,
        email: PropTypes.string,
        phone: PropTypes.string,
        fullName: PropTypes.string,
        telegramNickname: PropTypes.string,
    }),
};

export default ProfilePage;