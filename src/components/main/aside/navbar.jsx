import React from "react";
import { NavLink } from "react-router-dom";


const activeLink = (isActive) => {
    return {
      fontWeight: isActive ? "bold" : "",
      textDecoration: isActive ? "underline" : "",
    };
  };

const NavBar = () => {
  return (
    <nav>
      <ul className="flex w-full justify-around flex-wrap gap-12 xl:gap-0">
        <li className="active:scale-95">
          <NavLink
            end
            to="/map"
            className="p-4 px-12 border-2 border-black rounded"
            style={({ isActive }) => activeLink(isActive)}
          >
            Mapa
          </NavLink>
        </li>
        <li className="active:scale-95">
          <NavLink
            end
            to="/"
            className="p-4 px-12 border-2 border-black rounded"
            style={({ isActive }) => activeLink(isActive)}
          >
            Tabla
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
