import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Landing.css";

export const Landing = () => {
  return (
    <div className="landing__container">
      <div className="landing__header">
        <span className="landing__title">TuneLab</span>
        <span className="landing__description">Create. Collaborate</span>
        <div className="landing__buttons">
          <Link to="/room/abcdef" className="landing__button">
            Create Session
          </Link>
          <Link to="/room/abcdef" className="landing__button landing__join">
            Join Session
          </Link>
        </div>
      </div>
      <img
        className="landing__image"
        src="/assets/screen.png"
        alt="landing page image"
      />
    </div>
  );
};
