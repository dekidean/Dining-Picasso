import { Link } from "react-router-dom";
import "./welcome.css";

const WelcomePage = () => {
  return (
    <div className="welcome">
      <h1>Welcome to Picasso Restaurant</h1>
      <nav>
        <Link to="/menu">Menu</Link>
        <Link to="/about">About</Link>
      </nav>
    </div>
  );
};

export default WelcomePage;
