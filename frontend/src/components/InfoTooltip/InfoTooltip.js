import Popup from "../../utils/Popup";
import { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

export default function InfoTooltip({ isOpen, message, showIcon }) {
  const onClose = useContext(AppContext)
  return (
    <Popup isOpen={isOpen} onClose={onClose} name={"tooltip"}>
      <div className="popup-tooltip__image-container">
        <img src={showIcon} alt="icon's message" />
      </div>
      <p className="popup-tooltip__title">{message}</p>
    </Popup>
  );
}
