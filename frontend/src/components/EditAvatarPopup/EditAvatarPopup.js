import { useContext, useRef, } from "react";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { AppContext } from "../../contexts/AppContext";

export default function EditAvatarPopup({ isOpen, onUpdateAvatar }) {
  const currentAvatar = useRef(null);
  const onClose = useContext(AppContext);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: currentAvatar.current.value,
    });
  }
  
  return (
    <PopupWithForm
      isOpen={isOpen}
      name={`popup-edit-avatar`}
      title={`Редактировать аватар?`}
      textButton={`Сохранить`}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__info popup-edit-avatar__input"
        id="url-avatar"
        type="url"
        name="name"
        placeholder="Введите URL"
        required
        ref={currentAvatar}
      />
      <span className="popup__error url-avatar-error" id="url-avatar-error" />
    </PopupWithForm>
  );
}
