import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import "./Modal.css";

export const Modal = ({ open, closeModal }) => {
  return (
    <div className={`modal__container ${open && "open"}`}>
      <div className="modal__close-button" onClick={() => closeModal()}>
        <FiArrowLeft className="modal__icon" />
      </div>
    </div>
  );
};
