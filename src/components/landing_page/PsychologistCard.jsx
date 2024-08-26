function PsychologistCard ({ psychologist }) {
  const {image, specialization, name, description} = psychologist;

    return (
        <div className="psychologist-card bg-[#F5F5F5] rounded-3xl border-1 border-black w-1/3 h-full flex flex-col items-center justify-center">
            <img src={image} alt="psychologist" className="overflow-hidden rounded-t-3xl"/>
            <div className="psychologist-card__info w-full px-11 py-7">
                <h3>{name}</h3>
                <p>{specialization}</p>
                <p>{description}</p>
                <button className="rounded-2xl border-1 border-black w-full">
                    Записаться
                </button>
            </div>
        </div>
    );
}

export default PsychologistCard;