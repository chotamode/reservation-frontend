// src/components/landing_page/EmotionCard.jsx
import React from 'react';

function EmotionCard({ index, title, description, icon, iconX, iconY }) {
    return (
        <span className="rounded-3xl bg-white border-1 border-greenDark w-full h-52 flex flex-col p-7 pr-12 relative">
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
            {icon && (
                <img
                    src={icon}
                    alt="icon"
                    style={{ position: 'absolute', left: iconX, top: iconY }}
                />
            )}
        </span>
    );
}

export default EmotionCard;