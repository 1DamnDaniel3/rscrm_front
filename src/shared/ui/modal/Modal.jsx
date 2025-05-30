import { createPortal } from "react-dom";
import { useEffect } from "react";
import s from "./Modal.module.css";

export const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "auto";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div className={s.overlay} onClick={onClose}>
      <div
        className={s.modal}
        onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside modal
      >
        {title && <h2 className={s.title}>{title}</h2>}
        <button className={s.close} onClick={onClose}>
          &times;
        </button>
        <div className={s.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
};
