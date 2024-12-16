import { useEffect, useState } from "react";
import axios from "axios";
import { Category, Area, Meal } from "../MealTypes";
import { Link } from "react-router-dom";
import "./Menu.css"; // Importing the enhanced CSS

const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [view, setView] = useState<"categories" | "areas" | "allMeals">(
    "categories"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const API_URL = import.meta.env.VITE_MEALDB_API;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [categoriesRes, areasRes, allMealsRes] = await Promise.all([
          axios.get(`${API_URL}/list.php?c=list`),
          axios.get(`${API_URL}/list.php?a=list`),
          axios.get(`${API_URL}/search.php?s=`),
        ]);

        setCategories(categoriesRes.data.meals || []);
        setAreas(areasRes.data.meals || []);
        setAllMeals(allMealsRes.data.meals || []);
      } catch (err) {
        setError("Error fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [API_URL]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredCategories = categories.filter((category) =>
    category.strCategory.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAreas = areas.filter((area) =>
    area.strArea.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAllMeals = allMeals.filter((meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Conditional Search Area and Button Group */}
      <div className="button-group">
        {view === "categories" && (
          <div className="search-area">
            <input
              type="text"
              placeholder="Search for Categories"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        )}
        <button
          onClick={() => setView("categories")}
          className={`menu-button ${view === "categories" ? "active" : ""}`}
        >
          Categories
        </button>

        {view === "areas" && (
          <div className="search-area">
            <input
              type="text"
              placeholder="Search for National Dishes"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        )}
        <button
          onClick={() => setView("areas")}
          className={`menu-button ${view === "areas" ? "active" : ""}`}
        >
          National Dishes
        </button>

        {view === "allMeals" && (
          <div className="search-area">
            <input
              type="text"
              placeholder="Search All Meals"
              value={searchQuery}
              onChange={handleSearch}
            />
          </div>
        )}
        <button
          onClick={() => setView("allMeals")}
          className={`menu-button ${view === "allMeals" ? "active" : ""}`}
        >
          All Meals
        </button>
      </div>

      <div className="menu-grid">
        {view === "categories" &&
          filteredCategories.map((category) => (
            <div key={category.strCategory} className="menu-card">
              <Link to={`/category/${category.strCategory}`}>
                <h3>{category.strCategory}</h3>
              </Link>
            </div>
          ))}
        {view === "areas" &&
          filteredAreas.map((area) => (
            <div key={area.strArea} className="menu-card">
              <Link to={`/area/${area.strArea}`}>
                <h3>{area.strArea}</h3>
              </Link>
            </div>
          ))}
        {view === "allMeals" &&
          filteredAllMeals.map((meal) => (
            <div key={meal.idMeal} className="menu-card">
              <Link to={`/meal/${meal.idMeal}`}>
                <h3>{meal.strMeal}</h3>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Menu;
