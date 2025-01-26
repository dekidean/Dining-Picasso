import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#f8f9fa",
        padding: "1rem",
        textAlign: "center",
        borderTop: "1px solid #ddd",
        position: "relative",
      }}
    >
      <Typography
        variant="body2"
        sx={{ color: "#555", marginBottom: "0.5rem" }}
      >
        <Link
          to="/about"
          style={{
            textDecoration: "none",
            color: "#007BFF",
            fontWeight: "bold",
          }}
        >
          About
        </Link>
      </Typography>
      <Typography variant="caption" sx={{ color: "#777" }}>
        &copy; {new Date().getFullYear()} Picasso Restaurant. All rights
        reserved.
      </Typography>
    </Box>
  );
};

export default Footer;
