import { useEffect, useState } from "react";
import axios from "axios";
import { Category, Area, Meal, ViewByModel } from "../MealTypes";
import { Link } from "react-router-dom";
import "./Menu.css";
import SearchArea from "./SearchArea";

const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [view, setView] = useState<ViewByModel>(ViewByModel.Categories);
  const [loading, setLoading] = useState<boolean>(true);
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

  const filteredCategories = categories.filter((category: Category) =>
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
      <div className="button-group">
        {view === ViewByModel.Categories && (
          <SearchArea
            placeholder="Search for Categories"
            onChange={handleSearch}
            searchQuery={searchQuery}
          />
        )}
        <button
          onClick={() => setView(ViewByModel.Categories)}
          className={`menu-button ${
            view === ViewByModel.Categories ? "active" : ""
          }`}
        >
          Categories
        </button>

        {view === ViewByModel.Areas && (
          <SearchArea
            placeholder="Search for National Dishes"
            onChange={handleSearch}
            searchQuery={searchQuery}
          />
        )}
        <button
          onClick={() => setView(ViewByModel.Areas)}
          className={`menu-button ${
            view === ViewByModel.Areas ? "active" : ""
          }`}
        >
          National Dishes
        </button>

        {view === ViewByModel.AllMeals && (
          <SearchArea
            placeholder="Search All Meals"
            onChange={handleSearch}
            searchQuery={searchQuery}
          />
        )}
        <button
          onClick={() => setView(ViewByModel.AllMeals)}
          className={`menu-button ${
            view === ViewByModel.AllMeals ? "active" : ""
          }`}
        >
          All Meals
        </button>
      </div>

      <div className="menu-grid">
        {view === ViewByModel.Categories
          ? filteredCategories.map((category) => (
              <div key={category.strCategory} className="menu-card">
                <Link to={`/category/${category.strCategory}`}>
                  <h3>{category.strCategory}</h3>
                </Link>
              </div>
            ))
          : view === ViewByModel.Areas
          ? filteredAreas.map((area) => (
              <div key={area.strArea} className="menu-card">
                <Link to={`/area/${area.strArea}`}>
                  <h3>{area.strArea}</h3>
                </Link>
              </div>
            ))
          : filteredAllMeals.map((meal) => (
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
