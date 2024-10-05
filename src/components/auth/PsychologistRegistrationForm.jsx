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
        { id: 'cbt', name: { en: 'Cognitive Behavioral Therapy', ru: 'Когнитивно-поведенческая терапия (КПТ: Изменяет негативные мысли и поведение, способствующие эмоциональным проблемам.)' } },
        { id: 'gestalt', name: { en: 'Gestalt Therapy', ru: 'Гештальт-терапия (Фокусируется на осознании настоящего момента и интеграции различных аспектов личности)' } },
        { id: 'family', name: { en: 'Family Therapy', ru: 'Семейная терапия (Улучшает коммуникацию и решает конфликты в семье)' } },
        { id: 'group', name: { en: 'Group Therapy', ru: 'Групповая терапия (Обсуждение опыта и поддержка в группе с похожими проблемами)' } },
        { id: 'psychodynamic', name: { en: 'Psychoanalysis / Psychodynamic Therapy', ru: 'Психоанализ / психодинамическая терапия (Работает с бессознательными процессами, внутренними конфликтами и прошлым опытом)' } },
        { id: 'dbt', name: { en: 'Dialectical Behavior Therapy', ru: 'Диалектическая поведенческая терапия (Для работы с эмоциональной нестабильностью и пограничным расстройством личности)' } },
        { id: 'humanistic', name: { en: 'Humanistic Therapy', ru: 'Гуманистическая терапия (Ориентирована на личностный рост, самореализацию и развитие потенциала)' } },
        { id: 'trauma', name: { en: 'Trauma Therapy', ru: 'Травматерапия (Обработка травматических воспоминаний и восстановление после ПТСР)' } },
        { id: 'emdr', name: { en: 'EMDR', ru: 'Метод ДПДГ - для лечения посттравматических стрессовых расстройств' } },
        { id: 'value_oriented', name: { en: 'Value-Oriented Method', ru: 'Ценностно-ориентированный метод' } },
        { id: 'emotion_imagery', name: { en: 'Emotion-Imagery Therapy', ru: 'Эмоционально-образная терапия' } },
        { id: 'hellinger', name: { en: 'Hellinger Constellations', ru: 'Расстановки по Берту Хеллингеру' } },
        { id: 'logotherapy', name: { en: 'Logotherapy by V. Frankl', ru: 'Логотерапия по В. Франклу' } },
        { id: 'nlp', name: { en: 'NLP - Neuro-Linguistic Programming', ru: 'НЛП - Нейролингвистическое программирование' } },
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
        <form>
            <div>
                <FormField2 id="name" label="Имя" type="text" placeholder="Имя"/>
                <FormField2 id="surname" label="Фамилия" type="text" placeholder="Фамилия"/>
                <FormField2 id="patronymic" label="Отчество" type="text" placeholder="Отчество"/>
                <FormField2 id="birth_date" label="Дата рождения" type="date" placeholder="Дата рождения"/>
                <FormField2 id="email" label="Email" type="email" placeholder="Email"/>
                <div className="form-field">
                    <label htmlFor="profile_photo">Фото профиля</label>
                    <input id="profile_photo" type="file" accept="image/*"/>
                </div>
            </div>
            {/*Биография*/}
            <div>
                <FormField2 id="biography" label="Биография" type="text" placeholder="Биография"/>
            </div>
            <div>
                <FormField2 id="mini_bio" label="Краткая биография" type="text" placeholder="Краткая биография"/>
            </div>
            <div>
                <h2>Образование</h2>
                {educationEntries.map((entry, index) => (
                    <div key={index} className="education-entry">
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
                <button type="button" onClick={handleAddEducation}>Добавить учебное заведение</button>
            </div>

            <div>
                <h2>Курсы профессионального развития</h2>
                {courses.map((course, index) => (
                    <div key={index} className="course-entry">
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
                <button type="button" onClick={handleAddCourse}>Добавить курс</button>
            </div>

            <div>
                <h2>Опыт работы</h2>
                {/*Введите вашу должность*/}
                {/*Введите название организации*/}
                {/*Введите даты работы*/}
                {workExperience.map((entry, index) => (
                    <div key={index} className="work-entry">
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
                <button type="button" onClick={handleAddWorkExperience}>Добавить место работы</button>
            </div>

        {/*    типы клиентов*/}
            <div>
                <h2>Типы клиентов</h2>
                <div>
                    <input type="checkbox" id="adult" name="adult"/>
                    <label htmlFor="adult">Взрослые</label>
                </div>
                <div>
                    <input type="checkbox" id="teen" name="teen"/>
                    <label htmlFor="couples">Пары</label>
                </div>
                <div>
                    <input type="checkbox" id="child" name="child"/>
                    <label htmlFor="child">Дети</label>
                </div>
            </div>
            {/*типы терапии которые вы используете в работе*/}
            <div>
                <h2>Типы терапии которые вы используете в работе</h2>
                {therapyTypes.map((type) => (
                    <div key={type.id}>
                        <input type="checkbox" id={type.id} name={type.id}/>
                        <label htmlFor={type.id}>{type.name.ru}</label>
                    </div>
                ))}
            </div>

            {/*Типы каких платформ для коммуникации с клиентов вам удобнее всего использовать?*/}
            <div>
                <h2>Типы каких платформ для коммуникации с клиентами вам удобнее всего использовать?</h2>
                {communicationChannels.map((channel) => (
                    <div key={channel.id}>
                        <input type="checkbox" id={channel.id} name={channel.id}/>
                        <label htmlFor={channel.id}>{channel.name}</label>
                    </div>
                ))}
            </div>
        </form>
);
}

export default PsychologistRegistrationForm;