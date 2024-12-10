import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import Menu from "./pages/Menu";
import Category from "./pages/Category";
import About from "./pages/About";
import MealDetails from "./pages/MealDetails";
import AllMeals from "./pages/AllMeal";
import CategoryMeals from "./pages/CategoryMeals";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/category/:category" element={<CategoryMeals />} />
        <Route path="/menu/all" element={<AllMeals />} />
        <Route path="/menu/:category" element={<Category />} />
        <Route path="/meal/:idMeal" element={<MealDetails />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;
