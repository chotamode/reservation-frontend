import FormField from "./FormField.jsx";
import FormField2 from "./FormField2.jsx";

function PsychologistRegistrationForm({onClose, onOpenRegister}) {
    return (
        <div>
            <FormField2 id="name" label="Имя" type="text" placeholder="Имя" />
            <FormField2 id="surname" label="Фамилия" type="text" placeholder="Фамилия" />
            <FormField2 id="patronymic" label="Отчество" type="text" placeholder="Отчество" />

            <FormField2 id="age" label="Возраст" type="number" placeholder="Возраст" />
        </div>
    );
}


export default PsychologistRegistrationForm;