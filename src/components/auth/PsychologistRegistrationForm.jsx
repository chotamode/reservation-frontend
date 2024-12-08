import { useState } from 'react';
import FormField2 from "./FormField2.jsx";
import useRegisterPsychologist from '../../hooks/psychologist/useRegisterPsychologist.js';
import therapyTypes from '../../utils/constants/therapyTypes.js';
import communicationChannels from '../../utils/constants/communicationChannels.js';

function PsychologistRegistrationForm({ onClose, onOpenRegister }) {
    const [educationEntries, setEducationEntries] = useState([{ degree: '', institution: '', graduationYear: '' }]);
    const [courses, setCourses] = useState([{ position: '', organization: '', duration: '' }]);
    const [workExperience, setWorkExperience] = useState([{ position: '', organization: '', duration: '' }]);
    const [formData, setFormData] = useState({
        name: '', surname: '', patronymic: '', birth_date: '', email: '', password: '', password_confirmation: '', profile_photo: null, biography: '', mini_description: ''
    });
    const [errors, setErrors] = useState({});
    const { registerPsychologist, loading, error, success } = useRegisterPsychologist();

    const handleAddEducation = () => {
        setEducationEntries([...educationEntries, { degree: '', institution: '', graduationYear: '' }]);
    };

    const handleAddCourse = () => {
        setCourses([...courses, { position: '', organization: '', duration: '' }]);
    };

    const handleAddWorkExperience = () => {
        setWorkExperience([...workExperience, { position: '', organization: '', duration: '' }]);
    };

    const handleEducationChange = (index, field, value) => {
        const newEntries = [...educationEntries];
        newEntries[index][field] = value;
        setEducationEntries(newEntries);
    };

    const handleCourseChange = (index, field, value) => {
        const newCourses = [...courses];
        newCourses[index][field] = value;
        setCourses(newCourses);
    };

    const handleWorkExperienceChange = (index, field, value) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience[index][field] = value;
        setWorkExperience(newWorkExperience);
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevFormData) => ({ ...prevFormData, [id]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});

        // Validation
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Имя обязательно';
        if (!formData.surname) newErrors.surname = 'Фамилия обязательна';
        if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Неверный формат email';
        if (!formData.password) newErrors.password = 'Пароль обязателен';
        if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = 'Пароли не совпадают';
        if (formData.name.length < 2) newErrors.name = 'Имя должно содержать не менее 2 символов';
        if (formData.surname.length < 2) newErrors.surname = 'Фамилия должна содержать не менее 2 символов';
        if (formData.patronymic.length < 2) newErrors.patronymic = 'Отчество должно содержать не менее 2 символов';
        if (formData.password.length < 6) newErrors.password = 'Пароль должен содержать не менее 6 символов';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const formDataToSubmit = {
            ...formData,
            educationEntries,
            courses,
            workExperience,
            clientTypes: {
                adult: e.target.adult.checked,
                couples: e.target.couples.checked,
                child: e.target.child.checked,
            },
            therapyTypes: therapyTypes.filter(type => e.target[type.id].checked).map(type => type.id),
            communicationChannels: communicationChannels.filter(channel => e.target[channel.id].checked).map(channel => channel.id)
        };

        await registerPsychologist(formDataToSubmit);
    };

    return (
        <form className="flex flex-col gap-8 p-2 md:p-0" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col md:flex-row gap-2">
                    <FormField2 id="name" label="Имя" type="text" placeholder="Имя"/>
                    <FormField2 id="surname" label="Фамилия" type="text" placeholder="Фамилия"/>
                    <FormField2 id="patronymic" label="Отчество" type="text" placeholder="Отчество"/>
                </div>
                <div className="flex flex-col gap-6 items-start">
                    <div className="flex flex-col md:flex-row gap-2">
                        <FormField2 id="birth_date" label="Дата рождения" type="date" placeholder="Дата рождения" value={formData.birth_date} onChange={handleChange} />
                        <FormField2 id="email" label="Email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} error={errors.email} />
                    </div>
                    <div className="flex flex-col md:flex-row gap-2">
                        <FormField2 id="password" label="Пароль" type="password" placeholder="Пароль" value={formData.password} onChange={handleChange} error={errors.password} />
                        <FormField2 id="password_confirmation" label="Подтверждение пароля" type="password" placeholder="Подтверждение пароля" value={formData.password_confirmation} onChange={handleChange} error={errors.password_confirmation} />
                    </div>
                    <div className=" mx-2 flex flex-col gap-1 form-field">

                        <label
                            className=" flex items-center justify-center px-4 py-2 bg-[#D3DBA8] rounded-xl shadow-md cursor-pointer"
                            htmlFor="profile_photo">

                            <span>Добавьте фото профиля</span>
                            <input className="absolute w-32 opacity-0 cursor-pointer" id="profile_photo" type="file"
                                   accept="image/*"/>

                        </label>
                    </div>
                </div>
            </div>
            <div>
                <FormField2 id="biography" label="Биография" isTextarea={true} type="textarea" placeholder="Биография" value={formData.biography} onChange={handleChange} />
            </div>
            <div>
                <FormField2 id="mini_description" label="Краткая биография" type="text" placeholder="Краткая биография" value={formData.mini_description} onChange={handleChange} />
            </div>
            <div>
                <h2 className="font-roboto font-semibold text-xl my-2">Образование</h2>
                {educationEntries.map((entry, index) => (
                    <div key={index} className="education-entry flex flex-col md:flex-row gap-2 ">
                        <FormField2
                            id={`degree-${index}`}
                            label="Степень"
                            type="text"
                            placeholder="Степень"
                            value={entry.degree}
                            onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        />
                        <FormField2
                            id={`institution-${index}`}
                            label="Учебное заведение"
                            type="text"
                            placeholder="Учебное заведение"
                            value={entry.institution}
                            onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                        />
                        <FormField2
                            id={`graduationYear-${index}`}
                            label="Год выпуска"
                            type="date"
                            placeholder="Год выпуска"
                            value={entry.graduationYear}
                            onChange={(e) => handleEducationChange(index, 'graduationYear', e.target.value)}
                        />
                    </div>
                ))}
                <button className="w-32 h-10 bg-[#D3DBA8] rounded-2xl mt-6" type="button" onClick={handleAddEducation}>Добавить</button>
            </div>

            <div>
                <h2 className="font-roboto font-semibold text-xl my-2">Курсы профессионального развития</h2>
                {courses.map((course, index) => (
                    <div key={index} className="course-entry flex flex-col md:flex-row gap-2">
                        <FormField2
                            id={`position-${index}`}
                            label="Ваша должность"
                            type="text"
                            placeholder="Ваша должность"
                            value={course.position}
                            onChange={(e) => handleCourseChange(index, 'position', e.target.value)}
                        />
                        <FormField2
                            id={`organization-${index}`}
                            label="Организация"
                            type="text"
                            placeholder="Организация"
                            value={course.organization}
                            onChange={(e) => handleCourseChange(index, 'organization', e.target.value)}
                        />
                        <FormField2
                            id={`duration-${index}`}
                            label="Срок"
                            type="text"
                            placeholder="Срок"
                            value={course.duration}
                            onChange={(e) => handleCourseChange(index, 'duration', e.target.value)}
                        />
                    </div>
                ))}
                <button className="w-32 h-10 bg-[#D3DBA8] rounded-2xl mt-6" type="button" onClick={handleAddCourse}>Добавить</button>
            </div>

            <div>
                <h2 className="font-roboto font-semibold text-xl my-2">Опыт работы</h2>
                {/*Введите вашу должность*/}
                {/*Введите название организации*/}
                {/*Введите даты работы*/}
                {workExperience.map((entry, index) => (
                    <div key={index} className="work-entry flex flex-col md:flex-row gap-2">
                        <FormField2
                            id={`position-${index}`}
                            label="Ваша должность"
                            type="text"
                            placeholder="Ваша должность"
                            value={entry.position}
                            onChange={(e) => handleWorkExperienceChange(index, 'position', e.target.value)}
                        />
                        <FormField2
                            id={`organization-${index}`}
                            label="Организация"
                            type="text"
                            placeholder="Организация"
                            value={entry.organization}
                            onChange={(e) => handleWorkExperienceChange(index, 'organization', e.target.value)}
                        />
                        <FormField2
                            id={`duration-${index}`}
                            label="Срок"
                            type="text"
                            placeholder="Срок"
                            value={entry.duration}
                            onChange={(e) => handleWorkExperienceChange(index, 'duration', e.target.value)}
                        />
                    </div>
                ))}
                <button className="w-32 h-10 bg-[#D3DBA8] rounded-2xl mt-6" type="button" onClick={handleAddWorkExperience}>Добавить</button>
            </div>

            {/*    типы клиентов*/}
            <div className="flex flex-col gap-1 items-start justify-center">
                <h2 className="font-roboto font-semibold text-xl my-2">Типы клиентов</h2>
                <div className="flex flex-row gap-1 items-center">
                    <input className="cursor-pointer" type="checkbox" id="adult" name="adult" />
                    <label htmlFor="adult">Взрослые</label>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <input className="cursor-pointer" type="checkbox" id="couples" name="teen" />
                    <label htmlFor="couples">Пары</label>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <input className="cursor-pointer" type="checkbox" id="child" name="child"/>
                    <label htmlFor="child">Дети</label>
                </div>
            </div>
            {/*типы терапии которые вы используете в работе*/}
            <div>
                <h2 className="font-roboto font-semibold text-xl my-2">Типы терапии которые вы используете в работе</h2>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-x-11 gap-y-1 md:gap-x-2 md:gap-y-1 text-base md:text-sm">
                    {therapyTypes.map((type) => (
                        <div className="flex md:flex-row gap-1 items-center" key={type.id}>
                            <input className="cursor-pointer" type="checkbox" id={type.id} name={type.id} />
                            <label htmlFor={type.id}>{type.name.ru}</label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex flex-col gap-1 items-start justify-center gap-y-2 ">
                <h2 className="font-roboto font-semibold text-xl my-2">Типы каких платформ для коммуникации с клиентами вам удобнее всего использовать?</h2>
                {communicationChannels.map((channel) => (
                    <div className="flex flex-row gap-2 items-center" key={channel.id}>
                        <input className="cursor-pointer" type="checkbox" id={channel.id} name={channel.id} />
                        <label htmlFor={channel.id}>{channel.name}</label>
                    </div>
                ))}
            </div>
            <button className="rounded-lg bg-[#D3DBA8] my-8 mx-auto h-[4rem] w-full" type="submit">
                <p className="text-black p-2">Присоединиться к команде</p>
            </button>
        </form>
    );
}

export default PsychologistRegistrationForm;