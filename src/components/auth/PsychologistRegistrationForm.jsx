import { useState } from 'react';
import FormField2 from "./FormField2.jsx";

function PsychologistRegistrationForm({ onClose, onOpenRegister }) {
    const [educationEntries, setEducationEntries] = useState([{ degree: '', institution: '', graduationYear: '' }]);
    const [courses, setCourses] = useState([{ position: '', organization: '', duration: '' }]);

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
        </form>
    );
}

export default PsychologistRegistrationForm;