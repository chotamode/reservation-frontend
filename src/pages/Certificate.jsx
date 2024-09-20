import { useState } from 'react';
import TopNav from "../components/topnav/TopNav.jsx";
import Footer from "../components/footer/Footer.jsx";
import useCreateAndSendCertificate from '../hooks/useCreateAndSendCertificate.js';
import useAuth from "../hooks/useAuth.js";

function CertificateCard({ price, description, onSelect, selected }) {
  return (
      <div
          className={`flex flex-col p-5 rounded-xl w-1/4 ${selected ? 'bg-[#E9EFC8]' : 'bg-[#DEECFF]'}`}

      >
        <h2 className="text-2xl font-bold mb-5 mx-auto">{price.toLocaleString()} ₽</h2>
        <p className="text-center">{description}</p>
        <button className="rounded-lg bg-[rgba(0,0,0,0.1)] mt-5 mx-auto" onClick={() => onSelect(price)}>
          <p className="text-black p-2">Выбрать</p>
        </button>
      </div>
  );
}

const certificates = [
  { price: 3000, description: "Вдумчивый подарок, чтобы начать путь самопознания" },
  { price: 9000, description: "Значительный вклад в личностное развитие" },
  { price: 15000, description: "Инвестиция в светлое будущее" },
  { price: 30000, description: "Лучший подарок для трансформации." }
];

function Certificate() {
  const { user } = useAuth();
  const [selectedPrice, setSelectedPrice] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const { createAndSendCertificate, loading, error } = useCreateAndSendCertificate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPrice) {
      alert('Please select a certificate price');
      return;
    }
    if (!user) {
      alert('User is not authenticated');
      return;
    }
    await createAndSendCertificate({ sender: formData.name, amount: selectedPrice, email: formData.email });
  };

  return (
      <div>
        <TopNav/>
        <div className="bg-white p-10 rounded-3xl my-10 font-roboto">
          <h1 className="text-2xl font-bold mb-5">Подарочные сертификаты на сеансы терапии</h1>
          <p>Подарочные сертификаты на платформе METOD позволяют людям поддерживать себя или других в получении терапии.
            Они подчеркивают личную ответственность за изменения в жизни и ценность самостоятельной оплаты своего роста.
            Иногда перемены приходят в нашу жизнь неожиданно, как подарок, и такие сертификаты — это значимый способ
            предложить этот подарок себе или другим. Сертификаты можно использовать позже, когда это будет
            необходимо.</p>
        </div>
        <div className="bg-white p-10 rounded-3xl my-10 font-roboto">
          <h1 className="text-2xl font-bold mb-5">Выберите свой подарочный сертификат</h1>
          <div className="flex flex-row gap-4 w-full">
            {certificates.map(certificate => (
                <CertificateCard
                    key={certificate.price}
                    price={certificate.price}
                    description={certificate.description}
                    onSelect={setSelectedPrice}
                    selected={selectedPrice === certificate.price}
                />
            ))}
          </div>
        </div>

        <div className="bg-white p-10 rounded-3xl my-10 font-roboto">
          <h1 className="text-2xl font-bold mb-5">Как приобрести и использовать сертификат</h1>
          <ul className="list-none space-y-2">
            <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-3 before:h-3 before:bg-[#D3DBA8] before:rounded-full">
              Выберите свой предпочтительный сертификат из представленных вариантов.
            </li>
            <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-3 before:h-3 before:bg-[#D3DBA8] before:rounded-full">
              Нажмите на кнопку "Выбрать", чтобы продолжить покупку.
            </li>
            <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-3 before:h-3 before:bg-[#D3DBA8] before:rounded-full">
              Заполните форму, указав ваше имя и электронную почту, а затем нажмите кнопку оплаты, чтобы завершить
              покупку.
            </li>
            <li className="relative pl-5 before:absolute before:left-0 before:top-1/2 before:transform before:-translate-y-1/2 before:w-3 before:h-3 before:bg-[#D3DBA8] before:rounded-full">
              Вы получите электронное письмо с деталями сертификата, который можно использовать для будущих сеансов
              терапии на платформе METOD.
            </li>
          </ul>
        </div>

        <div className="bg-white p-10 rounded-3xl my-10 font-roboto">
          <h1 className="text-2xl font-bold mb-5">Оформить покупку</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label htmlFor="name" className="font-bold">Имя</label>
              <input type="text" id="name" name="name" className="rounded-lg border-2 border-gray-300 p-2"
                     value={formData.name} onChange={handleInputChange}/>
            </div>
            <div className="flex flex-col gap-3">
              <label htmlFor="email" className="font-bold">Email</label>
              <input type="email" id="email" name="email" className="rounded-lg border-2 border-gray-300 p-2"
                     value={formData.email} onChange={handleInputChange}/>
            </div>
            <button type="submit" className="rounded-lg bg-[#D3DBA8] mt-5 mx-auto ml-0" disabled={loading}>
              <p className="text-black p-2">{loading ? 'Processing...' : 'Перейти к оплате'}</p>
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        </div>
        <Footer/>
      </div>
  );
}

export default Certificate;