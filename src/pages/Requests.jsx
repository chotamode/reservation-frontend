import TopNav from "../components/topnav/TopNav.jsx";
import Accordeon2 from "../components/Accordeon2.jsx";
import Footer from "../components/footer/Footer.jsx";

const requests = [
    {
        title: "Эмоциональные состояния",
        text: "Агрессия, ревность, страх, апатия и тд."
    },
    {
        title: "Поведенческие проблемы",
        text: "Конфликты, проблемы в отношениях, проблемы с детьми и тд."
    },
    {
        title: "Личностные проблемы",
        text: "Проблемы с самооценкой, проблемы с выбором профессии и тд."
    },
    {
        title: "Семейные проблемы",
        text: "Проблемы в семье, развод, проблемы с детьми и тд."
    },
    {
        title: "Проблемы в обществе",
        text: "Проблемы на работе, проблемы с друзьями и тд."
    }
];

function Requests({ requests }) {
    return (
        <div>
            <TopNav/>
            <Accordeon2
                header={"Часто задаваемые вопросы о консультациях"}
                contentElements={requests}
                className="my-12"
            />
            <Footer/>
        </div>
    );
}

Requests.defaultProps = {
    requests: requests
};

export default Requests;