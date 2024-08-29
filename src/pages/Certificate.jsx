import TopNav from "../components/topnav/TopNav.jsx";
import Footer from "../components/footer/Footer.jsx";

function CertificateCard({price, description}) {
    return (<div className="flex flex-col bg-[#DEECFF] p-5 rounded-xl w-1/4">
        <h2 className="text-2xl font-bold mb-5 mx-auto">
            {price} ₽
        </h2>
        <p className="text-center">
            {description}
        </p>
        <button className="rounded-lg bg-[rgba(0,0,0,0.1)] mt-5 mx-auto">
            <p className="text-black p-2">
                Выбрать
            </p>
        </button>
    </div>);
}

const certificates = [{
    price: "3,000",
    description: "Вдумчивый подарок, чтобы начать путь самопознания"
}, {price: "9,000", description: "Значительный вклад в личностное развитие"}, {
    price: "15,000",
    description: "Инвестиция в светлое будущее"
}, {price: "30,000", description: "Лучший подарок для трансформации."},];

function Certificate() {
    return (<div>
            <TopNav/>
            <div className="bg-white p-10 rounded-3xl my-10 font-roboto">
                <h1 className="text-2xl font-bold mb-5">
                    Подарочные сертификаты на сеансы терапии
                </h1>
                <p>
                    Подарочные сертификаты на платформе METOD позволяют людям поддерживать себя или других в получении
                    терапии. Они подчеркивают личную ответственность за изменения в жизни и ценность самостоятельной
                    оплаты своего роста. Иногда перемены приходят в нашу жизнь неожиданно, как подарок, и такие
                    сертификаты — это значимый способ предложить этот подарок себе или другим. Сертификаты можно
                    использовать позже, когда это будет необходимо.
                </p>
            </div>

            <div className="bg-white p-10 rounded-3xl my-10 font-roboto">
                <h1 className="text-2xl font-bold mb-5">
                    Выберите свой подарочный сертификат
                </h1>
                <div className="flex flex-row gap-4 w-full">
                    {certificates.map(certificate => (<CertificateCard key={certificate.price} price={certificate.price}
                                                                       description={certificate.description}/>))}
                </div>
            </div>

            <div className="bg-white p-10 rounded-3xl my-10 font-roboto">
                <h1 className="text-2xl font-bold mb-5">
                    Как выбрать подарочный сертификат
                </h1>

                <div className={"flex flex-col gap-3"}>
                    <p>
                        Выберите свой предпочтительный сертификат из представленных вариантов.
                    </p>

                    <p>
                        Нажмите на кнопку &quot;Выбрать&ldquo;, чтобы продолжить покупку.
                    </p>

                    <p>
                        Заполните форму, указав ваше имя и электронную почту, а затем нажмите кнопку оплаты, чтобы
                        завершить
                        покупку.
                    </p>

                    <p>
                        Вы получите электронное письмо с деталями сертификата, который можно использовать для будущих
                        сеансов терапии на платформе METOD.
                    </p>
                </div>
            </div>

            <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
                <h1 className="text-2xl font-bold mb-5">
                    Оформить покупку
                </h1>

                <div className="flex flex-col gap-3">
                    <label htmlFor="name" className="font-bold">
                        Имя
                    </label>
                    <input type="text" id="name" name="name" className="rounded-lg border-2 border-gray-300 p-2"/>
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <input type="email" id="email" name="email" className="rounded-lg border-2 border-gray-300 p-2"/>
                </div>

                <button className="rounded-lg bg-[#D3DBA8] mt-5 mx-auto ml-0">
                    <p className="text-black p-2">
                        Перейти к оплате
                    </p>
                </button>
            </div>
            <Footer/>
        </div>
    );
}

export default Certificate;