function PsychologistCard ({ psychologist }) {
  const {image, specialization, name, description} = psychologist;

    return (
        <div className="psychologist-card bg-[#DEECFF] rounded-3xl w-1/3 h-full flex flex-col min-h-full">
            <div className="w-full h-[35%]">
                <img src={image} alt="psychologist" className="w-full h-full object-cover rounded-t-3xl filter grayscale"/>
            </div>

            <div className="psychologist-card__info w-full px-11 py-7 items-center flex flex-col gap-4 h-full">
                <p>{specialization}</p>
                <h3 className={"font-semibold text-2xl"}>
                    {name}
                </h3>
                <p>{description}</p>
                <div className="w-full h-full flex flex-col justify-end">
                    <button className="rounded-2xl border-1 border-[#6A704C] w-full font-bold text-xl py-2">
                        Записаться
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PsychologistCard;