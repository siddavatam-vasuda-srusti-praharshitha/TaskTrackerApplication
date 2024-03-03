import React from "react";
import style from "./Style.module.css";

// Create Modal component
function Modal({ children }) {
  // Return modal container with children
  return <div className={style.modalContainer}>{children}</div>;
}

export default Modal;
