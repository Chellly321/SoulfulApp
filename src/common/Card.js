function Card({ text, cardBorder, onCardClick }) {
  return (
    <div
      className="card"
      style={{ border: `3px solid ${cardBorder}` }}
      onClick={onCardClick}
    >
      <p>{text && text.slice(0,320)}</p>
      <button>Bekijken</button>
    </div>
  );
}

export default Card;
