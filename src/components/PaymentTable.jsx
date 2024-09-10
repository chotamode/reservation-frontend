export function PaymentTable({payments}) {
    return (<div className="bg-[#DBEAFE] p-10 rounded-3xl font-roboto">
        <table className="min-w-full">
            <thead>
            <tr className={""}>
                <th className="py-2">Дата оплаты</th>
                <th className="py-2">Колличество денег</th>
                <th className="py-2">Статус платежа</th>
            </tr>
            </thead>
            <tbody>
            {payments.map((payment, index) => (<tr key={index} className="text-center border-t-1 border-gray-300">
                <td className="py-2">{payment.date}</td>
                <td className="py-2">{payment.amount} ₽</td>
                <td className="py-2">{payment.status}</td>
            </tr>))}
            </tbody>
        </table>
    </div>);
}