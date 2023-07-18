import { useState, useContext, useEffect } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { AppContext } from "../../contexts/AppContext";

export default function EditProfilePopup({ isOpen, onUpdateUser }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const currentUser = useContext(CurrentUserContext);
  const onClose = useContext(AppContext);
  useEffect(() => {
    
    setName(currentUser?.name);
    setDescription(currentUser?.about);
  }, [currentUser, isOpen]);

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
    <PopupWithForm
      isOpen={isOpen}
      name={`popup__input-info`}
      title={`Редактировать профиль`}
      textButton={`Сохранить`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__info popup__info_type_name"
        id="name"
        minLength="2"
        maxLength="40"
        type="text"
        name={name}
        placeholder="Имя"
        required
        onChange={handleNameChange}
        value={name || ""}
      />
      <span className="popup__error name-error" id="name-error" />
      <input
        className="popup__info popup__info_type_job"
        id="about"
        minLength="2"
        maxLength="200"
        type="text"
        name={description}
        placeholder="О себе любимом"
        value={description || ""}
        required
        onChange={handleDescriptionChange}
      />
      <span className="popup__error about-error" id="about-error" />
    </PopupWithForm>
  );
}
