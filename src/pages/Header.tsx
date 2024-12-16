import { NavLink } from "react-router-dom";
import "./Header.css"; // For consistent styles

const Header = () => {
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
  ];

  return (
    <header>
      <nav className="button-group">
        {navLinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "menu-button active" : "menu-button"
            }
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
