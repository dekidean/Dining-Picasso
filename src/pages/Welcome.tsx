import { Link } from "react-router-dom";
import { Box, Button, Typography } from "@mui/material";
import "./welcome.css";
import picassoImage from "../assets/picasso.jpg";

const Welcome = () => {
  return (
    <Box
      className="welcome"
      sx={{
        backgroundImage: `url(${picassoImage})`,

        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        textAlign: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "80%",
          height: "30%",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          transform: "translate(-50%, -50%)",
          borderRadius: "15px",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.2)",
        }}
      />
      <Typography
        variant="h1"
        sx={{
          zIndex: 1,
          color: "white",
          fontSize: { xs: "6vw", sm: "4vw", md: "3vw" },
          position: "relative",
        }}
      >
        Welcome to Picasso Restaurant
      </Typography>
      <nav style={{ position: "relative", zIndex: 1, marginTop: "20px" }}>
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            fontSize: { xs: "3vw", sm: "2vw" },
            textTransform: "none",
            backgroundColor: "#007BFF",
            "&:hover": { backgroundColor: "#0056b3" },
          }}
        >
          Menu
        </Button>
      </nav>
    </Box>
  );
};

export default Welcome;
