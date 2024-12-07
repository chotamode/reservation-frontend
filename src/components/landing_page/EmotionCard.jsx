// src/components/landing_page/EmotionCard.jsx
import React from 'react';

function EmotionCard({ index, title, description, icon, iconX, iconY }) {
    return (
        <span
            className="rounded-3xl bg-white border-greenDark w-full h-40 md:h-52 flex flex-col p-7 pr-12 relative font-montserrat font-normal">
            <p className={"font-montserrat font-normal"}>
                / 0{index}
            </p>
            <div className="flex flex-col justify-between h-full z-10">
                <p className="font-montserrat font-normal ">
                    {title}
                </p>
                <p className={"font-raleway font-medium text-sm"}>
                    {description}
                </p>
            </div>
                 {icon && (
                     <img
                         src={icon}
                         alt="icon"
                         style={{position: 'absolute', left: iconX, top: iconY, zIndex: 0}}
                     />
                 )}
        </span>
);
}

export default EmotionCard;