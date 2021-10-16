import React, {useContext} from "react";
import ThemeContext from "../contexts/theme.js";
import { NavLink } from "react-router-dom";

const activeStyle = {
  color: "rgb(187, 46, 31)",
};

export default function Nav() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <nav className="row space-between">
      <ul className="row nav">
        <li>
          <NavLink exact to="/" activeStyle={activeStyle} className="nav-link">
            {" "}
            Popular
          </NavLink>
        </li>
        <li>
          <NavLink to="/battle" activeStyle={activeStyle} className="nav-link">
            {" "}
            Battle
          </NavLink>
        </li>
      </ul>
      <button
        style={{ fontSize: 30 }}
        className="btn-clear"
        onClick={toggleTheme}
      >
        {theme === "light" ? "🌚" : "🌞"}
      </button>
    </nav>
  );
}
