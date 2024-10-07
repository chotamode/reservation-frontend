import { useState } from 'react';
import FormField2 from "./FormField2.jsx";


function PsychologistRegistrationForm({ onClose, onOpenRegister }) {
    const [educationEntries, setEducationEntries] = useState([{ degree: '', institution: '', graduationYear: '' }]);
    const [courses, setCourses] = useState([{ position: '', organization: '', duration: '' }]);
    const [workExperience, setWorkExperience] = useState([{ position: '', organization: '', duration: '' }]);

    const handleAddEducation = () => {
        setEducationEntries([...educationEntries, { degree: '', institution: '', graduationYear: '' }]);
    };

    const handleAddCourse = () => {
        setCourses([...courses, { position: '', organization: '', duration: '' }]);
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

    const handleAddWorkExperience = (index, field, value) => {
        const newWorkExperience = [...workExperience];
        newWorkExperience[index][field] = value;
        setWorkExperience(newWorkExperience);
    }

    const therapyTypes = [
        { id: 'cbt', name: { en: 'Cognitive Behavioral Therapy', ru: 'КПТ' } },
        { id: 'group', name: { en: 'Group Therapy ', ru: 'Групповая терапия' } },
        { id: 'humanistic', name: { en: 'Humanistic Therapy', ru: 'Гуманистическая' } },
        { id: 'nlp', name: { en: 'NLP - Neuro-Linguistic Programming ', ru: 'НЛП' } },
        { id: 'logotherapy', name: { en: 'Logotherapy by V. Frankl ', ru: 'Логотерапия по В.Франклу' } },
        { id: 'gestalt', name: { en: 'Gestalt Therapy ', ru: 'Гештальт' } },
        { id: 'psychodynamic', name: { en: 'Psychoanalysis / Psychodynamic Therapy', ru: 'Психоанализ' } },
        { id: 'trauma', name: { en: 'Trauma Therapy', ru: 'Травматерапия' } },
        { id: 'emotion_imagery', name: { en: 'Emotion-Imagery Therapy ', ru: 'Эмоционально-образная' } },
        { id: 'value_oriented', name: { en: 'Value-Oriented Method', ru: 'Ценностно-ориентированный метод' } },
        { id: 'family', name: { en: 'Family Therapy', ru: 'Семейная' } },
        { id: 'dbt', name: { en: 'Dialectical Behavior Therapy', ru: 'Диалектическая поведенческая терапия' } },
        { id: 'emdr', name: { en: 'EMDR ', ru: 'ДПДГ' } },
        { id: 'hellinger', name: { en: 'Hellinger Constellations ', ru: 'Расстановка по Берту Хеллингеру' } },
    ];

    const communicationChannels = [
        { id: 'telegram', name: 'Telegram' },
        { id: 'whatsapp', name: 'WhatsApp' },
        { id: 'viber', name: 'Viber' },
        { id: 'zoom', name: 'Zoom' },
        { id: 'skype', name: 'Skype' },
        { id: 'google_meet', name: 'Google Meet' },
        { id: 'yandex_telemost', name: 'Яндекс телемост' },
    ];



    return (
        <form className="flex flex-col gap-8">
            <div className="flex flex-col gap-6">
                <div className="flex flex-row gap-2">
                    <FormField2 id="name" label="Имя" type="text" placeholder="Имя"/>
                    <FormField2 id="surname" label="Фамилия" type="text" placeholder="Фамилия"/>
                    <FormField2 id="patronymic" label="Отчество" type="text" placeholder="Отчество"/>
                </div>
                <div className="flex  flex-col gap-6 items-start">
                    <div className="flex flex-row gap-2">
                        <FormField2 id="birth_date"  label="Дата рождения" type="date"    placeholder="Дата рождения"/>
                        <FormField2 id="email" label="Email" type="email"  placeholder="Email"/>
                    </div>
                    <div className=" mx-2 flex flex-col gap-1 form-field">

                        <label className=" flex items-center justify-center px-4 py-2 bg-[#D3DBA8] rounded-xl shadow-md cursor-pointer" htmlFor="profile_photo">

                            <span>Добавьте фото профиля</span>
                            <input className="absolute w-32 opacity-0 cursor-pointer" id="profile_photo" type="file" accept="image/*"/>

                        </label>
                    </div>

                </div>
            </div>
            {/*Биография*/}
            <div>
                <FormField2 id="biography" label="Биография" isTextarea={true} type="textarea" placeholder="Биография"/>
            </div>
            <div>
                <FormField2 id="mini_bio" label="Краткая биография" type="text" placeholder="Краткая биография"/>
            </div>
            <div>
                <h2 className="font-roboto font-semibold text-xl my-2">Образование</h2>
                {educationEntries.map((entry, index) => (
                    <div key={index} className="education-entry flex flex-row gap-2 ">
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
                    <div key={index} className="course-entry flex flex-row gap-2">
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
                    <div key={index} className="work-entry flex flex-row gap-2">
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
                    <input className="cursor-pointer" type="checkbox" id="adult" name="adult"/>
                    <label htmlFor="adult">Взрослые</label>
                </div>
                <div className="flex flex-row gap-1 items-center">
                    <input className="cursor-pointer" type="checkbox" id="teen" name="teen"/>
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
                <div className="grid grid-cols-[0.7fr_1fr_0.8fr_1fr_1fr]  gap-x-2 gap-y-1 text-sm">
                    {therapyTypes.map((type) => (
                        <div className="flex flex-row gap-1 items-center" key={type.id}>
                            <input className="cursor-pointer" type="checkbox" id={type.id} name={type.id}/>
                            <label htmlFor={type.id}>{type.name.ru}</label>
                        </div>
                    ))}
                </div>
            </div>

            {/*Типы каких платформ для коммуникации с клиентов вам удобнее всего использовать?*/}
            <div className="flex flex-col gap-1 items-start justify-center">
                <h2 className="font-roboto font-semibold text-xl my-2">Типы каких платформ для коммуникации с клиентами вам удобнее всего использовать?</h2>
                {communicationChannels.map((channel) => (
                    <div className="flex flex-row gap-1 items-center" key={channel.id}>
                        <input className="cursor-pointer" type="checkbox" id={channel.id} name={channel.id}/>
                        <label htmlFor={channel.id}>{channel.name}</label>
                    </div>
                ))}
            </div>
        </form>
);
}

export default PsychologistRegistrationForm;