import { useState, useEffect, useContext } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { AppContext } from "../../contexts/AppContext";

export default function AddPlacePopup({ isOpen, onAddPlace }) {
  const [nameCard, setNameCard] = useState("");
  const [linkCard, setLinkCard] = useState("");
  const onClose = useContext(AppContext);

  useEffect(() => {
    setNameCard("");
    setLinkCard("");
  }, [isOpen]);

  function handleNameCardChange(e) {
    setNameCard(e.target.value);
  }

  function handleLinkCardChange(e) {
    setLinkCard(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name: nameCard,
      link: linkCard,
    });
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={`popup__input-info_add-card`}
      title={`Новое место`}
      textButton={`Создать`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__info popup__info_type_place"
        id="place"
        minLength="2"
        maxLength="30"
        type="text"
        name="name"
        form="form-place"
        placeholder="Название"
        required
        onChange={handleNameCardChange}
        value={nameCard}
      />
      <span className="popup__error place-error" id="place-error" />
      <input
        className="popup__info popup__info_type_link"
        id="url-place"
        type="url"
        name="link"
        form="form-place"
        placeholder="Ссылка на картинку"
        required
        onChange={handleLinkCardChange}
        value={linkCard}
      />
      <span className="popup__error url-place-error" id="url-place-error" />
    </PopupWithForm>
  );
}
