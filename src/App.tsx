import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import Welcome from "./pages/Welcome";
import Menu from "./pages/Menu";
import CategoryMeals from "./pages/CategoryMeals";
import About from "./pages/About";
import MealDetails from "./pages/MealDetails";
import AllMeals from "./pages/AllMeal";
import AreaMeals from "./pages/AreaMeals";
import Footer from "./pages/Footer";
import "./App.css";

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/category/:category" element={<CategoryMeals />} />
            <Route path="/menu/all" element={<AllMeals />} />
            <Route path="/meal/:idMeal" element={<MealDetails />} />
            <Route path="/area/:area" element={<AreaMeals />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
