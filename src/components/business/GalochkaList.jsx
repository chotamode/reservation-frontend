import React from 'react';
import Galochka from "../../assets/images/business/galochka.svg";

function GalochkaList({ items }) {
    return (
        <div className="flex flex-col gap-5 bg-[#DEECFF] w-full rounded-3xl p-11">
            {items.map((item, index) => (
                <p key={index} className="flex flex-row items-center gap-4">
                    <img src={Galochka} alt="Galochka" />
                    {item}
                </p>
            ))}
        </div>
    );
}

export default GalochkaList;