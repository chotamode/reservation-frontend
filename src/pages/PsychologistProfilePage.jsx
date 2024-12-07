import { useParams, useNavigate } from 'react-router-dom';
import useFetchPsychologist from '../hooks/psychologist/useFetchPsychologist.js';
import useAuth from '../hooks/useAuth';
import { useEffect, useState } from 'react';
import TopNav from "../components/topnav/TopNav.jsx";
import Footer from "../components/footer/Footer.jsx";
import userIcon from "../assets/images/user.svg";
import PsychologistCalendar from "../components/Calendar.jsx";
import { PaymentTable } from "../components/PaymentTable.jsx";
import useFetchPsychologistUpcomingSessions from '../hooks/psychologist/useFetchPsychologistUpcomingSession.js';
import useFetchPsychologistFinishedSessions from '../hooks/psychologist/useFetchPsychologistFinishedSessions.js';
import useFetchPsychologistCanceledSessions from '../hooks/psychologist/useFetchPsychologistCanceledSessions.js';
import useFetchUserDetails from "../hooks/useFetchUserDetails.js";

const payments = [{ date: '01/01/2023', amount: '500', status: 'Completed' }, {
    date: '15/01/2023', amount: '1000', status: 'Pending'
}, { date: '20/01/2023', amount: '1500', status: 'Failed' },];

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

function upcomingSession(session) {
    const statusColor = (session.reservation) ? getStatusColor(session.reservation.status) : 'bg-[#DBEAFE]';

    return (<div className={`rounded-3xl p-5 w-full flex flex-row justify-between ${statusColor}`}>
        <div className={"flex flex-col gap-1"}>
            <h3 className={"font-bold"}>{session.slots ? new Date(session.slots.time).toLocaleString() : new Date(session.time).toLocaleString()}</h3>
            {session.reservation ? (<>
                    <p className={"text-gray-500"}>{session.reservation.customers.system_users.name} {session.reservation.customers.system_users.surname} - {session.reservation.format}</p>
                    <p>{session.reservation.status}</p>
                </>) : (<p>Not reserved</p>)}
        </div>
        {session.reservation ? (session.reservation.status === 'confirmed' && (<div className={"flex flex-row gap-5"}>
                    <button className="rounded-xl bg-black bg-opacity-10 my-auto py-2 px-8">
                        Перенести
                    </button>
                    <button className="rounded-xl bg-[#39442B] my-auto py-2 px-8 text-white">
                        Отменить
                    </button>
                </div>)) : (<></>)}
    </div>);
}

function PsychologistProfilePage() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, isPsychologist, logout } = useAuth();
    const { psychologist, error: psychologistError } = useFetchPsychologist(id);
    const { user: userDetails, error: errorUserDetails, loading: loadingUserDetails } = useFetchUserDetails(user.id);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { upcomingSessions, loading: loadingUpcoming, error: errorUpcoming } = useFetchPsychologistUpcomingSessions(id);
    const { finishedSessions, loading: loadingFinished, error: errorFinished } = useFetchPsychologistFinishedSessions(id);
    const { canceledSessions, loading: loadingCanceled, error: errorCanceled } = useFetchPsychologistCanceledSessions(id);

    if (loadingUserDetails || loadingUpcoming || loadingFinished) return <div>Loading...</div>;
    if (psychologistError || error || errorUserDetails || errorUpcoming || errorFinished) return <div>Error: {psychologistError || error || errorUserDetails || errorUpcoming || errorFinished}</div>;

    const combinedSessions = finishedSessions.concat(canceledSessions).sort((a, b) => new Date(b.time) - new Date(a.time));

    const handleSlotAdd = (slot) => {
        // Add slot to backend
    };

    const handleSlotDelete = (slot) => {
        // Delete slot from backend
    };

    const handleSlotUpdate = (slot) => {
        // Update slot in backend
    };

    const handleProfileClick = () => {
        navigate(`/update-user/${user.id}`);
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    const transformEntitiesToEvents = (entities) => {
        return entities.map(entity => {
            let start, end, title, id;

            if (entity.time) {
                // First type of entity
                id = entity.id;
                start = new Date(entity.time);
                end = new Date(new Date(entity.time).getTime() + entity.duration * 60000);
                if(entity.reservation){
                    title = `${entity.reservation.customers.system_users.name} ${entity.reservation.customers.system_users.surname} - ${entity.reservation.status}`;
                } else {
                    title = 'Not reserved';
                }
            } else if (entity.slots) {
                // Second type of entity
                id = entity.slots.id;
                start = new Date(entity.slots.time);
                end = new Date(new Date(entity.slots.time).getTime() + entity.slots.duration * 60000);
                title = `${entity.reservation.customers.system_users.name} ${entity.reservation.customers.system_users.surname} - ${entity.reservation.status}`;
            }

            return { start, end, title, id };
        });
    };

    const events = [
        ...transformEntitiesToEvents(upcomingSessions),
        ...transformEntitiesToEvents(finishedSessions),
        ...transformEntitiesToEvents(canceledSessions)
    ];

    return (<div>
            <TopNav/>

            <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
                <div>xw
                    <div className={"flex flex-row justify-between items-center mb-7"}>
                        <h1 className="text-2xl font-bold">
                            Добро пожаловать в личный кабинет, Мария!
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
                    </div>

                </div>

            </div>

            <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                    Управление расписанием
                </h1>

                <PsychologistCalendar
                    slots={events}
                    onSlotAdd={handleSlotAdd}
                    onSlotDelete={handleSlotDelete}
                    onSlotUpdate={handleSlotUpdate}
                    psychologistId={id}
                />

            </div>

            <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
                <h1 className="text-2xl font-bold mb-5">
                    Предстоящие сессии:
                </h1>
                {upcomingSessions.map((session) => upcomingSession(session))}
                <div className="flex justify-end mt-4 mb-0">
                    <button>
                        <p>
                            Показать все
                        </p>
                    </button>
                </div>
            </div>

            <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
                <h1 className="text-2xl font-bold mb-5">
                    Прошедшие сессии:
                </h1>
                <div className={"flex flex-col gap-2 overflow-auto max-h-96"}>
                    {combinedSessions.map((session) => upcomingSession(session))}
                </div>

            </div>

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

            <Footer/>
        </div>);
}

export default PsychologistProfilePage;