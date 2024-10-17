import TopNav from "../components/topnav/TopNav.jsx";
import Hero from "../components/landing_page/Hero.jsx";
import Arrow from "../assets/images/arrow.svg";
import BigButton from "../components/landing_page/BigButton.jsx";
import Drawer from "../components/landing_page/Drawer.jsx";
import {useState} from "react";
import Footer from "../components/footer/Footer.jsx";
import Accordeon from "../components/landing_page/Accordeon.jsx";
import PsychologistRegistrationForm from "../components/auth/PsychologistRegistrationForm.jsx";
import FormField2 from "../components/auth/FormField2.jsx";
import Modal from "../components/Modal.jsx";
import PreRegistrationForm from "../components/auth/PreRegistrationForm.jsx";


function Psychologists() {

    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [formData, setFormData] = useState({
        surname: '',
        name: '',
        patronymic: '',
        phone: '',
        email: ''
    });

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleFirstFormSubmit = (e) => {
        e.preventDefault();
        setStep(2);
        setIsModalOpen(true); // Открываем модальное окно после отправки первой формы
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setStep(1); // Сбрасываем step обратно на 1, чтобы форма "Давайте познакомимся?" снова отображалась
    };

    const contentElements = [{
        title: "Почему именно мы?",
        text: "Мы не просто платформа — мы команда единомышленников, стремящихся сделать мир лучше. Наша миссия — создать доступное пространство для профессиональной помощи, где каждый клиент получит поддержку, необходимую для преодоления трудностей."

    }, {
        title: "Что мы предлагаем",
        text: (
            <div className="space-y-4">
                <p>
                    <span className="font-semibold">1. Стабильный поток клиентов</span> — забудьте о поисках и рекламных
                    расходах! У нас есть готовая аудитория, ожидающая вашего профессионализма.
                </p>

                <p>
                    <span className="font-semibold">2. Поддерживающее сообщество</span> — общайтесь с коллегами,
                    делитесь опытом и получайте ответы на вопросы в режиме онлайн. Здесь вы не одни!
                </p>

                <p>
                    <span className="font-semibold">3. Специальные условия для молодых специалистов</span> — мы помогаем
                    начинающим психологам найти свою аудиторию и развиваться в профессии.
                </p>

                <p>
                    <span className="font-semibold">4. Уникальные мероприятия </span> — участвуйте в мастер-классах и
                    фестивалях с известными спикерами, расширяйте свои знания и профессиональные контакты.
                </p>

                <p>
                    <span className="font-semibold">5. Долгосрочное сопровождение клиентов</span> — особые условия для тех,
                    кто хочет строить долгосрочные отношения с клиентами.
                </p>

                <p>
                    <span className="font-semibold">6. Регулярная супервизия</span> — поддержка и развитие вашего профессионализма на каждом этапе.
                </p>
            </div>
        )
    }, {
        title: "Наши ценности",
        text:  (
            <div className="space-y-4">
                <p>
                    <span className="font-semibold">- Доступность</span>  — мы стремимся сделать психологическую помощь доступной для всех.
                </p>

                <p>
                    <span className="font-semibold">- Честность и прозрачность</span> — мы открыты в вопросах сотрудничества и финансов.
                </p>

                <p>
                    <span className="font-semibold">- Эмпатия и безоценочность</span> — создаем пространство, где каждый клиент может быть собой.
                </p>

                <p>
                    <span className="font-semibold">- Конфиденциальность</span> — ваша работа и информация клиентов под надежной защитой.
                </p>
            </div>
        )
    }, {
        title: "В перспективе",
        text: (
            <div className="space-y-4">
                <p>
                    <span className="font-semibold">•</span> Расширение аудитории до 50 стран
                </p>
                <div className="">
                    <p>
                        <span className="font-semibold">•</span> У нас запланированы выездные фестивали психологии и
                        телесных практик в живописных местах России и за границей.
                    </p>
                    <p className="ml-2">
                        Это возможность не только работать, но и отдыхать, развиваться и находить вдохновение! Особые
                        условия для наших психологов.
                    </p>
                </div>
            </div>
        )
    },

    ];


    return (
        <div>
            <div className="flex flex-col h-[38rem] gap-8 ">
                <div className="md:hidden">
                    <button onClick={toggleDrawer} className="text-black">Menu</button>
                </div>
                <div className="hidden md:block">
                    <TopNav/>
                </div>
                <Drawer isOpen={isDrawerOpen} toggleDrawer={toggleDrawer}/>
                <div className="flex flex-grow flex-col gap-8 w-full h-full">
                    <div className="flex h-[25.5rem] w-full">
                        <Hero/>
                    </div>

                    {/*<div className="flex h-1/4 w-full">
                        <BigButton text={"ЗАПИСАТЬСЯ"} icon={<img src={Arrow} alt="Arrow"/>}/>
                    </div>
                    */}
                </div>
            </div>

            <div className="bg-white text-black p-10 rounded-3xl  mb-10 font-raleway flex flex-col gap-5 border-black">
                <h1 className={"text-2xl font-semibold"}>
                    Доброго дня, драгоценный профессионал своего дела!
                </h1>
                <p>Приглашаем Вас Присоединиться к нашему уникальному бутиковому сервису по подбору и поиску психологов
                    «МЕТОД» и открыть новые расширяющие горизонты в своей практике и росте.</p>
            </div>

            <div className="my-16">
                <Accordeon contentElements={contentElements}/>
            </div>

            <div className="bg-white text-black p-10 rounded-3xl  mb-16 font-raleway flex flex-col gap-5 border-black">
                <p className="text-2xl font-bold">
                    Готовы открыть новые горизонты в своей практике? Присоединяйтесь к нам!
                    Вместе мы сделаем мир лучше.
                </p>
            </div>

            <div className="bg-white p-10 rounded-3xl mb-20 font-roboto flex flex-col gap-2 border-black">
                <h1 className="text-2xl font-bold mb-5">
                    Давай познакомимся?
                </h1>




                {step === 1 && (
                    <form onSubmit={handleFirstFormSubmit} className="flex flex-col gap-4">
                        <div className="flex flex-row gap-4">

                            <FormField2
                                id="name"
                                label="Имя"
                                type="text"
                                placeholder="Введите ваше имя"
                                value={formData.name}
                                onChange={handleInputChange}
                            />

                            <FormField2
                                id="surname"
                                label="Фамилия"
                                type="text"
                                placeholder="Введите вашу фамилию"
                                value={formData.surname}
                                onChange={handleInputChange}
                            />

                            <FormField2
                                id="patronymic"
                                label="Отчество"
                                type="text"
                                placeholder="Введите ваше отчество"
                                value={formData.patronymic}
                                onChange={handleInputChange}
                            />
                        </div>
                        <FormField2
                            id="phone"
                            label="Номер телефона"
                            type="tel"
                            placeholder="Введите ваш номер телефона"
                            value={formData.phone}
                            onChange={handleInputChange}
                        />
                        <FormField2
                            id="email"
                            label="Mail"
                            type="email"
                            placeholder="Введите ваш адрес электронной почты"
                            value={formData.email}
                            onChange={handleInputChange}
                        />
                        <button type="submit" className="bg-[#D3DBA8] text-black mt-6 py-2 px-6 rounded-lg mx-auto">
                            Отправить
                        </button>
                    </form>
                )}


            </div>

            <Footer/>

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal} header="Регистрация психолога">
                    <PsychologistRegistrationForm formData={formData} />
                </Modal>
            )}

        </div>
    );
}

export default Psychologists;