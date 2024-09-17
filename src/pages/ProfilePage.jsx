import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import useFetchPsychologistsBySpecialization from '../hooks/psychologist/useFetchPsychologistsBySpecialization.js';
import useFetchUserDetails from '../hooks/useFetchUserDetails';
import TopNav from "../components/topnav/TopNav.jsx";
import Footer from "../components/footer/Footer.jsx";
import userIcon from '../assets/images/user.svg';
import newConsultationIcon from '../assets/images/profile/new_consult.svg';
import starIcon from '../assets/images/profile/star.svg';
import giftIcon from '../assets/images/profile/gift.svg';
import { PaymentTable } from "../components/PaymentTable.jsx";
import useFetchCustomerReservations from "../hooks/useFetchCustomerReservations.ts";
import { useState } from "react";
import useRescheduleReservation from "../hooks/slot/useRescheduleReservation.ts";
import useCancelReservation from "../hooks/slot/useCancelReservation.ts";
import AppointmentWindow from "../components/AppointmentWindow.jsx";
import Modal from "../components/Modal.jsx";
import useFetchNearestSlots from "../hooks/slot/useFetchNearestSlots.js";
import useFetchFinishedSessionsCount from '../hooks/slot/useFetchFinishedSessionsCount.js';
import ActivateCertificateModal from "../components/ActivateCertificateModal.jsx";
import useFetchUserBalance from "../hooks/useFetchUserBalance.js";
import useFetchNearestSession from "../hooks/useFetchNearestSession.js";

const payments = [
    { date: '01/01/2023', amount: '500', status: 'Completed' },
    { date: '15/01/2023', amount: '1000', status: 'Pending' },
    { date: '20/01/2023', amount: '1500', status: 'Failed' },
];

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

function ProfilePage() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [specialization, setSpecialization] = useState('');
    const { psychologists, loading: loadingPsychologists, error: errorPsychologists } = useFetchPsychologistsBySpecialization(specialization);
    const { upcomingReservations, finishedReservations, canceledReservations, loading: loadingReservations, error: errorReservations } = useFetchCustomerReservations(user.id);
    const { user: userDetails, error: errorUserDetails, loading: loadingUserDetails } = useFetchUserDetails(user.id);
    const { slots: nearestSlots, loading: loadingNearestSlots, error: errorNearestSlots } = useFetchNearestSlots(user.id, 1);
    const { count: finishedSessionsCount, loading: loadingFinishedSessionsCount, error: errorFinishedSessionsCount } = useFetchFinishedSessionsCount(user.id);
    const { balance, loading: loadingBalance, error: errorBalance } = useFetchUserBalance(user.id);
    const { nearestSession, loading: loadingNearestSession, error: errorNearestSession } = useFetchNearestSession(user.id);


  const { rescheduleReservation, error: rescheduleError, loading: rescheduleLoading } = useRescheduleReservation();
    const { cancelReservation, error: cancelError, loading: cancelLoading } = useCancelReservation();

    const [isAppointmentWindowOpen, setAppointmentWindowOpen] = useState(false);
    const [isActivateModalOpen, setActivateModalOpen] = useState(false);
    const [reservationToReschedule, setReservationToReschedule] = useState(null);
    const [psychologistId, setPsychologistId] = useState(null);
    const [isCancelModalOpen, setCancelModalOpen] = useState(false);
    const [reservationToCancel, setReservationToCancel] = useState(null);


    if (loadingPsychologists || loadingReservations || loadingUserDetails || loadingNearestSlots || loadingFinishedSessionsCount || loadingBalance || loadingNearestSession) return <div>Loading...</div>;
    if (errorPsychologists || errorReservations || errorUserDetails || errorNearestSlots || errorFinishedSessionsCount || errorBalance || errorNearestSession) return <div>Error: {errorPsychologists || errorReservations || errorUserDetails || errorNearestSlots || errorFinishedSessionsCount}</div>;

    const handleActivateCertificateClick = () => {
        setActivateModalOpen(true);
    };

    const handleProfileClick = () => {
        navigate(`/update-user/${user.id}`);
    };

    const handleLogoutClick = () => {
        logout();
        navigate('/');
    };

    const handleNewConsultationClick = () => {
        navigate('/select-psychologist');
    };

    const handleBuySubscriptionClick = () => {
        navigate('/select-psychologist');
    }

    const handleGiftCertificateClick = () => {
        navigate('/gift-certificate');
    }

    const handleReschedule = (reservationId, psychologistId) => {
        setReservationToReschedule(reservationId);
        setPsychologistId(psychologistId);
        setAppointmentWindowOpen(true);
    };

    const handleCancel = async () => {
        if (reservationToCancel) {
            await cancelReservation(reservationToCancel);
            setCancelModalOpen(false);
            setReservationToCancel(null);
            // Update the UI after cancellation
            // You might need to refetch the reservations or update the state directly
        }
    };

    const showCancelModal = (reservationId) => {
        setReservationToCancel(reservationId);
        setCancelModalOpen(true);
    };

    const handleSlotSelect = async (newSlotId) => {
        if (reservationToReschedule) {
            await rescheduleReservation(reservationToReschedule, newSlotId);
            setAppointmentWindowOpen(false);
            setReservationToReschedule(null);
            setPsychologistId(null);
        }
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
                        <button className={"rounded-2xl bg-red-500 text-white px-7 h-10"} onClick={handleLogoutClick}>
                            Logout
                        </button>

                        <button
                            className="rounded-3xl bg-[#E9EFC8] p-2"
                            onClick={handleActivateCertificateClick}
                        >
                            Активировать сертификат
                        </button>

                        <button className={"rounded-2xl bg-[#E5E7EB] px-7 h-10 flex items-center"}
                                onClick={handleProfileClick}>
                            Мой профиль
                            <img src={userIcon} alt="User Icon" className="ml-2 h-6 w-6"/>
                        </button>
                    </div>

                    <div className={"flex flex-row gap-5 justify-between"}>
                        <div className={"rounded-3xl bg-[#E9EFC8] p-5 w-full"}>
                            <h3>Предстощая сессия:</h3>
                            {nearestSession ? (
                                <p>{new Date(nearestSession.time).toLocaleString()}</p>
                            ) : (
                                <p>Пока сессий нет</p>
                            )}
                        </div>
                        <div className={"rounded-3xl bg-[#DBEAFE] p-5 w-full"}>
                            <h3>Всего консультаций:</h3>
                            <p>{finishedSessionsCount}</p>
                        </div>
                        <div className={"rounded-3xl bg-[#E9EFC8] p-5 w-full"}>
                            <h3>Баланс счета:</h3>
                            <p>{balance} ₽</p>
                        </div>
                    </div>
                </div>
            </div>

            {upcomingSessions(upcomingReservations, handleReschedule, showCancelModal, rescheduleLoading, cancelLoading, rescheduleError, cancelError)}
            {finishedSessions(canceledReservations, finishedReservations)}

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
                <button className={"rounded-3xl bg-[#E9EFC8]"} onClick={handleNewConsultationClick}>
                    <div className={"flex flex-row gap-2 justify-center py-6"}>
                        <img src={newConsultationIcon} alt="New Consultation Icon"/>
                        <p>Записаться на новую консультацию</p>
                    </div>
                </button>
                <button className={"rounded-3xl bg-[#39442B]"} onClick={handleBuySubscriptionClick}>
                    <div className={"flex flex-row gap-2 justify-center py-6 text-white"}>
                        <img src={starIcon} alt="Star Icon"/>
                        <p>Купить абонемент</p>
                    </div>
                </button>
                <button className={"rounded-3xl bg-[#EEE8E3]"} onClick={handleGiftCertificateClick}>
                    <div className={"flex flex-row gap-2 justify-center py-6"}>
                        <img src={giftIcon} alt="Gift Icon"/>
                        <p>Подарочный сертификат</p>
                    </div>
                </button>
            </div>

            <Footer/>

            {isAppointmentWindowOpen && (
                <Modal isOpen={isAppointmentWindowOpen} onClose={() => setAppointmentWindowOpen(false)}
                       header="Book an Appointment">
                    <AppointmentWindow psychologistId={psychologistId} onSlotSelect={handleSlotSelect}
                                       onClose={() => setAppointmentWindowOpen(false)}/>
                </Modal>
            )}

            {isActivateModalOpen && (
                <ActivateCertificateModal
                    isOpen={isActivateModalOpen}
                    onClose={() => setActivateModalOpen(false)}
                    userId={user.id}
                />
            )}

            {isCancelModalOpen && (
                <Modal isOpen={isCancelModalOpen} onClose={() => setCancelModalOpen(false)} header="Confirm Cancellation">
                    <div>
                        <p>Are you sure you want to cancel this reservation?</p>
                        <button onClick={handleCancel} className="bg-red-500 text-white px-4 py-2 rounded">Yes, Cancel</button>
                        <button onClick={() => setCancelModalOpen(false)} className="bg-gray-500 text-white px-4 py-2 rounded">No, Go Back</button>
                    </div>
                </Modal>
            )}
        </div>
    );
}


function upcomingSessions(upcomingSessions, handleReschedule, handleCancel, rescheduleLoading, cancelLoading, rescheduleError, cancelError) {
    return (
        <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-5">
                Предстоящие сессии:
            </h1>
            <div className={"flex flex-col gap-2 overflow-auto max-h-96"}>
                {upcomingSessions.map((session) => (
                    <div key={session.id} className={`rounded-3xl p-5 w-full flex flex-row justify-between ${getStatusColor(session.status)}`}>
                        <div className={"flex flex-col gap-1"}>
                            <h3 className={"font-bold"}>{new Date(session.slots[0].time).toLocaleString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}</h3>
                            <p className={"text-gray-500"}>{session.slots[0].psychologists.system_users.name} {session.slots[0].psychologists.system_users.surname} {session.slots[0].psychologists.system_users.patronymic} - {session.format}</p>
                            <p>{session.status}</p>
                        </div>
                        {session.status !== 'finished' && (
                            <div className={"flex flex-row gap-5"}>
                                <button onClick={() => handleReschedule(session.id, session.slots[0].psychologists.id)} disabled={rescheduleLoading} className={"bg-[#D3DBA8] rounded-xl my-auto py-2 px-4"}>
                                    Перенести
                                </button>
                                <button onClick={() => handleCancel(session.id)} disabled={cancelLoading} className={"bg-[#39442B] rounded-xl my-auto py-2 px-4"}>
                                    Отменить
                                </button>
                            </div>
                        )}
                        {rescheduleError && <p>Error: {rescheduleError}</p>}
                        {cancelError && <p>Error: {cancelError}</p>}
                    </div>
                ))}
            </div>
        </div>
    );
}

function finishedSessions(canceledSessions, finishedSessions) {
    const transformedFinishedSessions = finishedSessions.map(session => ({
        id: session.id,
        created_at: session.created_at,
        reservation: {
            format: session.format,
            status: session.status
        },
        slots: {
            time: session.slots[0].time,
            psychologists: {
                system_users: {
                    name: session.slots[0].psychologists.system_users.name,
                    surname: session.slots[0].psychologists.system_users.surname,
                    patronymic: session.slots[0].psychologists.system_users.patronymic
                }
            }
        }
    }));

    const combinedSessions = [...canceledSessions, ...transformedFinishedSessions];

    return (
        <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
            <h1 className="text-2xl font-bold mb-5">
                Прошедшие и отмененные сессии:
            </h1>
            <div className={"flex flex-col gap-2 overflow-auto max-h-96"}>
                {combinedSessions.map((session) => (
                    <div key={session.id} className={`rounded-3xl p-5 w-full flex flex-row justify-between ${getStatusColor(session.reservation.status)}`}>
                        <div className={"flex flex-col gap-1"}>
                            <h3 className={"font-bold"}>{new Date(session.slots.time).toLocaleString('ru-RU', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                            })}</h3>
                            <p className={"text-gray-500"}>{session.slots.psychologists.system_users.name} {session.slots.psychologists.system_users.surname} {session.slots.psychologists.system_users.patronymic} - {session.reservation.format}</p>
                            <p>{session.reservation.status}</p>
                        </div>
                    </div>
                ))}
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