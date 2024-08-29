// src/components/landing_page/EmotionCard.jsx
import React from 'react';

function EmotionCard({ index, title, description }) {
    return (
        <span className="rounded-3xl bg-white border-1 border-greenDark w-full h-52 flex flex-col p-7 pr-12">
            <p>
                / {index}
            </p>
            <div className="flex flex-col justify-between h-full">
                <p className="font-bold">
                    {title}
                </p>
                <p>
                    {description}
                </p>
            </div>
        </span>
    );
}

export default EmotionCard;