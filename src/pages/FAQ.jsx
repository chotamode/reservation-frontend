import TopNav from "../components/topnav/TopNav.jsx";
import Accordeon2 from "../components/Accordeon2.jsx";
import Footer from "../components/footer/Footer.jsx";

const questions = [
    {
        title: "Как записаться на консультацию?",
        text: "Для записи на консультацию вам необходимо выбрать психолога, который вам подходит, и нажать на кнопку 'Записаться'."
    },
    {
        title: "Как оплатить консультацию?",
        text: "Оплатить консультацию можно на сайте после записи на консультацию."
    },
    {
        title: "Как отменить консультацию?",
        text: "Для отмены консультации вам необходимо написать психологу в чате и договориться о новом времени консультации."
    },
    {
        title: "Как начать консультацию?",
        text: "Для начала консультации вам необходимо нажать на кнопку 'Начать консультацию' в чате с психологом."
    },
    {
        title: "Как оценить консультацию?",
        text: "Для оценки консультации вам необходимо перейти в раздел 'Мои консультации' и нажать на кнопку 'Оценить консультацию'."
    }

];

function FAQ({ questions }) {
    return (
        <div>
            <TopNav/>
            <Accordeon2
                header={"Часто задаваемые вопросы о консультациях"}
                contentElements={questions}
                className="my-12"
            />
            <Footer/>
        </div>
    );
}

FAQ.defaultProps = {
    questions: questions
};

export default FAQ;