export function PaymentTable({payments}) {

    const getRowColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'bg-[#E9EFC8]';
            case 'Pending':
                return 'bg-[#D6E9FF]';
            case 'Failed':
                return 'bg-[#E5E5E5]';
            default:
                return '';
        }
    }

    const getStatusTextColor = (status) => {
        switch (status) {
            case 'Completed':
                return 'text-[#3BB143]'; // зеленый цвет
            case 'Pending':
                return 'text-[#0073E6]'; // синий цвет
            case 'Failed':
                return 'text-[#E60000]'; // красный цвет
            default:
                return 'text-black'; // черный цвет по умолчанию
        }
    };




    return (<div className="bg-[#DBEAFE] p-3 rounded-3xl font-roboto">
        <table className="min-w-full">
            <tbody>
            {payments.map((payment, index) => (
                <tr key={index} className={`text-center  border-gray-300 ${getRowColor(payment.status)}`}>
                    <td className="py-2 font-bold rounded-l-2xl">{payment.date}</td>
                    <td className="py-2">{payment.amount} ₽</td>
                    <td className={`py-2 font-bold rounded-r-2xl ${getStatusTextColor(payment.status)}`}></td>
                    <td className={`py-2 font-bold rounded-r-2xl ${getStatusTextColor(payment.status)}`}></td>
                    <td className={`py-2 font-bold rounded-r-2xl ${getStatusTextColor(payment.status)}`}>
                        {payment.status}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    </div>
);
}