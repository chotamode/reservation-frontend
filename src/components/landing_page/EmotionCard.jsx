// src/components/landing_page/EmotionCard.jsx

function EmotionCard({ index, title, description, icon, iconX, iconY }) {
    return (
        <span className="rounded-3xl bg-white border-greenDark w-full h-40 md:h-52 flex flex-col p-7 pr-12 relative font-montserrat font-normal">
            <div className={"flex flex-col justify-between h-full w-3/4 p-3 md:p-2 text-left"}>
            <p className={"font-montserrat font-bold text-customGreen"}>
                / 0{index}
            </p>
            </div>
            <div className="flex flex-col justify-between h-full z-10">
                <p className="font-montserrat font-bold -mt-1">
                    {title}
                </p>
                <p className={"font-raleway font-medium text-sm"}>
                    {description}
                </p>
            </div>
            {icon && (
                <div className={"flex items-center justify-end w-1/4 p-4"}>
                <img
                    src={icon}
                    alt="icon"
                    className={"object-contain absolute right-7 top-12 transform -translate-y-1/ max-h-[80px] max-w-[80%] md:max-h-[150px] md:max-w-[150px]"}
                    // style={{ position: 'relative', left: iconX, top: iconY, zIndex: 0, }}
                />
                </div>
            )}
        </span>
    );
}

export default EmotionCard;