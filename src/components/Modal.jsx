import React, { useState } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Population } from "../ga/population";
import "./Modal.css";

export const Modal = ({ open, closeModal }) => {
  const runGA = () => {
    console.log(Population());
  };
  return (
    <div className={`modal__container ${open && "open"}`}>
      <div className="modal__close-button" onClick={() => closeModal()}>
        <FiArrowLeft className="modal__icon" />
      </div>
      <div className={`optionBar__button`} onClick={() => runGA()}>
        Generate
      </div>
    </div>
  );
};
