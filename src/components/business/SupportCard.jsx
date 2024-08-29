// src/components/SupportCard.jsx
import React from 'react';

function SupportCard({ imgSrc, title, description }) {
    return (
        <div className="flex flex-col gap-5 bg-[#DEECFF] w-full rounded-3xl">
            <div className="flex flex-col justify-center items-center m-8 h-80">
                <img src={imgSrc} alt={title} className="h-3/5"/>
                <div className="mx-20 text-center">
                    <h1 className="font-bold mt-11">{title}</h1>
                    <p>{description}</p>
                </div>
            </div>
        </div>
    );
}

export default SupportCard;