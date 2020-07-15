import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiServer, FiPlus, FiGrid } from "react-icons/fi";

import "./Navbar.css";

export const Navbar = () => {
  return (
    <div className="navbar__container">
      <Link className={`navbar__link`} to="/">
        <FiGrid className="navbar__icon" />
      </Link>
      <NavLink
        activeClassName="selected"
        className={`navbar__link`}
        to="/projects"
      >
        <FiServer className="navbar__icon" />
      </NavLink>
      <NavLink
        activeClassName="selected"
        className={`navbar__link`}
        to="/create"
      >
        <FiPlus className="navbar__icon" />
      </NavLink>
    </div>
  );
};
