import { useEffect } from "react";

export default function usePopupClose(isOpen, closePopup) {
    useEffect(() => {
        if (!isOpen) return;
        const handleOverlay = (event) => {
            if (event.target.classList.contains("popup_opened")) {
                closePopup();
            }
        };

        const handleEscape = (event) => {
            if (event.key === "Escape") {
                closePopup();
            }
        };

        document.addEventListener("keydown", handleEscape);
        document.addEventListener("mousedown", handleOverlay);
        //function 'clean-up'
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.removeEventListener("mousedawn", handleOverlay);
        };
    }, [isOpen, closePopup]);
}