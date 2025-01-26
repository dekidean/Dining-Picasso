import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Category, Area, Meal } from "../MealTypes"; // Removed ViewByModel import
import SearchArea from "./SearchArea";
import "./Menu.css";

const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_MEALDB_API;

  const [activeTab, setActiveTab] = useState(
    location.state?.activeTab || "categories"
  );

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

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    navigate("/menu", {
      state: { activeTab: tab },
      replace: true,
    });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) return <p className="error-message">{error}</p>;

  return (
    <div className="menu-container">
      <div className="button-group">
        <button
          onClick={() => handleTabClick("categories")}
          className={`menu-button ${
            activeTab === "categories" ? "active" : ""
          }`}
        >
          Categories
        </button>

        <button
          onClick={() => handleTabClick("areas")}
          className={`menu-button ${activeTab === "areas" ? "active" : ""}`}
        >
          National Dishes
        </button>

        <button
          onClick={() => handleTabClick("allMeals")}
          className={`menu-button ${activeTab === "allMeals" ? "active" : ""}`}
        >
          All Meals
        </button>
      </div>

      <SearchArea
        placeholder={
          activeTab === "categories"
            ? "Search for Categories"
            : activeTab === "areas"
            ? "Search for National Dishes"
            : "Search All Meals"
        }
        onChange={handleSearch}
        searchQuery={searchQuery}
      />

      <div className="menu-grid">
        {activeTab === "categories" && (
          <>
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <Link
                  key={category.strCategory}
                  to={`/category/${category.strCategory}`}
                  className="menu-card"
                  state={{ activeTab: "categories" }}
                >
                  <h3>{category.strCategory}</h3>
                </Link>
              ))
            ) : (
              <p className="no-results">No categories match your search.</p>
            )}
          </>
        )}

        {activeTab === "areas" && (
          <>
            {filteredAreas.length > 0 ? (
              filteredAreas.map((area) => (
                <Link
                  key={area.strArea}
                  to={`/area/${area.strArea}`}
                  className="menu-card"
                  state={{ activeTab: "areas" }}
                >
                  <h3>{area.strArea}</h3>
                </Link>
              ))
            ) : (
              <p className="no-results">
                No national dishes match your search.
              </p>
            )}
          </>
        )}

        {activeTab === "allMeals" && (
          <>
            {filteredAllMeals.length > 0 ? (
              filteredAllMeals.map((meal) => (
                <Link
                  key={meal.idMeal}
                  to={`/meal/${meal.idMeal}`}
                  className="menu-card"
                  state={{ activeTab: "allMeals" }}
                >
                  <h3>{meal.strMeal}</h3>
                </Link>
              ))
            ) : (
              <p className="no-results">No meals match your search.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
