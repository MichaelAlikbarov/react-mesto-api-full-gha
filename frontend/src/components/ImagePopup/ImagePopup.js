import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import usePopupClose from "../../utils/hooks/usePopupClose";

export default function ImagePopup({ card }) {
  const onClose = useContext(AppContext);
  usePopupClose(card?.link, onClose)
  return (
    <section
      className={`popup popup_image-open"
            ${card ? "popup_opened" : ""}`}
      id="popup-image"
    >
      <figure className="popup__container popup__container_image">
        <button
          className="popup__close popup__close_image"
          onClick={onClose}
          type="button"
        ></button>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <figcaption className="popup__title popup__title_image-title">
          {card?.name}
        </figcaption>
      </figure>
    </section>
  );
}
