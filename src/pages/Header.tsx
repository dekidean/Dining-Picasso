import { NavLink } from "react-router-dom";
import "./Header.css";

type NavLinkItem = {
  path: string;
  label: string;
};

const Header = () => {
  const navLinks: NavLinkItem[] = [
    // Added type for `navLinks`
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
  ];

  return (
    <header>
      <nav className="button-group">
        {navLinks.map(
          (
            link: NavLinkItem // Added type for `link`
          ) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                isActive ? "menu-button active" : "menu-button"
              }
            >
              {link.label}
            </NavLink>
          )
        )}
      </nav>
    </header>
  );
};

export default Header;
