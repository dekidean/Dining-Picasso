import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@mui/material";

type NavLinkItem = {
  path: string;
  label: string;
};

const Header = () => {
  const navLinks: NavLinkItem[] = [
    { path: "/", label: "Home" },
    { path: "/menu", label: "Menu" },
  ];

  return (
    <AppBar position="static" color="primary" sx={{ boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Box sx={{ display: "flex", gap: "1rem" }}>
          {navLinks.map((link) => (
            <Button
              key={link.path}
              component={NavLink}
              to={link.path}
              sx={{
                textTransform: "none",
                fontWeight: "bold",
                color: "white",
                "&.active": {
                  backgroundColor: "rgba(255, 255, 255, 0.2)",
                },
              }}
              className={window.location.pathname === link.path ? "active" : ""}
            >
              {link.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
