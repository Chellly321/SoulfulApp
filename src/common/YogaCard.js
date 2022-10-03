import React from "react";

function YogaCard({ pic, title, text }) {
  return (
    <div className="yoga-card-container">
      <div className="img-container">
        <img src={pic} alt="yoga-pic" />
      </div>
      <div className="yoga-card__detail">
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default YogaCard;
