import { useContext } from "react";
import Card from "../Card/Card";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Main({
  onEditAvatar,
  onEditProfile,
  onEditPlace,
  handleCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const userData = useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-container" type="button">
          <img
            className="profile__avatar"
            src={userData?.avatar}
            alt="фото-аватар"
          />
          <div className="profile__avatar-overlay" onClick={onEditAvatar}></div>
        </button>
        <div className="profile__text-container">
          <div className="profile__title-container">
            <h1 className="profile__title">{userData?.name}</h1>
            <button
              className="profile__open-popup"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">{userData?.about}</p>
        </div>
        <button
          className="profile__button"
          type="button"
          onClick={onEditPlace}
        ></button>
      </section>
      <section
        className="cards"
        aria-label="информация о посещенных местах: фото, название, лайк"
      >
        <ul className="cards__list">
          {cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              link={card?.link}
              name={card?.name}
              onCardClick={handleCardClick}
              onCardLike={onCardLike}
              likes={card?.likes?.length}
              onCardDelete={onCardDelete}
            />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
