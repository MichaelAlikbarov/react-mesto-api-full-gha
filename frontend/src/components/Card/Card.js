import React from "react";
import { useContext } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

export default function Card(props) {
  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card)
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card)
  }

  const currentUser = useContext(CurrentUserContext);
  const isOwn = props.card.owner === currentUser._id;
  const isLiked = props.card?.likes?.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `cards__heart ${isLiked && 'cards__heart_active'}` 
  );

  return (
    <li className="cards__card">
      <img
        className="cards__foto"
        src={props.link}
        alt={props.name}
        onClick={handleClick}
      />
      <div className="cards__place">
        <h2 className="cards__name">{props.name}</h2>
        <div className="cards__heart-container">
          <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
          <div className="cards__quantity-like">{props.likes}</div>
        </div>
      </div>
      { isOwn && <button className="cards__delete" onClick={handleDeleteClick} />}
    </li>
  );
}
