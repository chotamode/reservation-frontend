function PsychologistCard ({ psychologist }) {
  const {image, specialization, name, description} = psychologist;

    return (
        <div className="psychologist-card">
            <img src={image} alt="psychologist" />
            <div className="psychologist-card__info">
                <h3>{name}</h3>
                <p>{specialization}</p>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default PsychologistCard;