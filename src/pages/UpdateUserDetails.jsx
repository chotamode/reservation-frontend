import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import config from '../config.js';
import TopNav from "../components/topnav/TopNav.jsx";
import Footer from "../components/footer/Footer.jsx";

const creditCards = [
    {cardNumber: '1234', expiryDate: '01/01/2023', paymentSystem: 'Visa'},
    {cardNumber: '5678', expiryDate: '01/01/2024', paymentSystem: 'MasterCard'},
];

function UpdateUserDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [userDetails, setUserDetails] = useState({
    name: '',
    surname: '',
    patronymic: '',
    email: '',
    phone: '',
    tg_username: ''
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await fetch(`${config.backendUrl}/user/${id}`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        setUserDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${config.backendUrl}/user/update-user/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(userDetails)
      });
      if (!response.ok) throw new Error('Failed to update user details');
      alert('User details updated successfully');
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
      <div>
        <TopNav/>

        <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
          <h1 className="text-2xl font-bold mb-5">
            Добро пожаловать в ваш профиль, Ольга!
          </h1>
          <div className={"flex flex-row items-center"}>
            <img src="https://via.placeholder.com/150" alt="User Avatar" className="rounded-full h-20 w-20"/>
            <button className={"rounded-xl bg-[#E5E7EB] px-7 h-10 flex items-center ml-5"}>
              Сменить аватар
            </button>
          </div>
          <form className={"grid grid-cols-2 gap-5"}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input type="text" name="name" value={userDetails.name} onChange={handleChange}
                     className="w-full px-3 py-2 border rounded" placeholder="Name"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Surname</label>
              <input type="text" name="surname" value={userDetails.surname} onChange={handleChange}
                     className="w-full px-3 py-2 border rounded" placeholder="Surname"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Patronymic</label>
              <input type="text" name="patronymic" value={userDetails.patronymic} onChange={handleChange}
                     className="w-full px-3 py-2 border rounded" placeholder="Patronymic"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Phone</label>
              <input type="text" name="phone" value={userDetails.phone} onChange={handleChange}
                     className="w-full px-3 py-2 border rounded" placeholder="Phone"/>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Telegram Username</label>
              <input type="text" name="tg_username" value={userDetails.tg_username} onChange={handleChange}
                     className="w-full px-3 py-2 border rounded" placeholder="Telegram Username"/>
            </div>
            <button type="submit" className="bg-[#D3DBA8] text-black py-2 rounded-2xl my-auto mx-auto px-5 ml-0">Сохранить</button>
          </form>
          <form className={"grid grid-cols-2 gap-5"}>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input type="email" name="email" value={userDetails.email} onChange={handleChange}
                     className="w-full px-3 py-2 border rounded" placeholder="Email"/>
            </div>
            <button type="submit"
                    className="bg-[#D3DBA8] text-black py-2 rounded-2xl my-auto mx-auto px-5 ml-0">Отправить письмо с подтверждением
            </button>
          </form>
        </div>

        <form className="bg-white p-10 rounded-2xl my-10 font-roboto flex flex-col gap-2 text-black font-semibold">
          <h1 className="text-2xl font-bold mb-5">
            Изменить пароль
          </h1>
            <div className="mb-4">
                <label className="block">Текущий пароль</label>
                <input type="password" name="old_password" className="w-full px-3 py-2 border rounded" placeholder="Введите ваш текущий пароль"/>
            </div>
            <div className="mb-4">
                <label className="block">Новый пароль</label>
                <input type="password" name="new_password" className="w-full px-3 py-2 border rounded" placeholder="Придумайте новый пароль"/>
            </div>
            <div className="mb-4">
                <label className="block">Подтвердите новый пароль</label>
                <input type="password" name="confirm_new_password" className="w-full px-3 py-2 border rounded" placeholder="Подтвердите новый пароль"/>
            </div>
            <button type="submit" className="bg-[#D3DBA8] text-black py-2 rounded-2xl my-auto mx-auto px-5 ml-0 font-normal">Изменить пароль</button>
        </form>

        <div className="bg-white p-10 rounded-3xl my-10 font-roboto flex flex-col gap-2">
          <h1 className="text-2xl font-bold mb-5">
            Платежные данные
          </h1>
          {creditCards.map((card) => creditCard(card.cardNumber, card.expiryDate, card.paymentSystem))}
          <button type="submit"
                  className="bg-[#D3DBA8] text-black py-2 rounded-2xl mt-5 mx-auto px-5 ml-0">
            Добавить карту
          </button>
        </div>

        <Footer/>
      </div>
  );
}

function creditCard(cardNumber, expiryDate, paymentSystem) {
  return (
      <div className={"border-gray-300 border-1 rounded-md flex flex-row justify-between p-6"}>
        <div>
          <p className={"font-semibold"}>{paymentSystem} **** {cardNumber}</p>
          <p>Окончание: {expiryDate}</p>
        </div>
        <div className={"flex flex-row gap-2"}>
          <button className={"rounded-xl bg-[#D3DBA8] px-7 h-10 flex items-center"}>
            <p>Изменить</p>
          </button>
          <button className={"rounded-xl bg-[#2B3644] px-7 h-10 flex items-center text-white"}>
            <p>Удалить</p>
          </button>
        </div>
      </div>
  )
}

export default UpdateUserDetails;