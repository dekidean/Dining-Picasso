import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Category, Area, Meal, ViewByModel } from "../MealTypes";
import SearchArea from "./SearchArea";
import "./Menu.css";

const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [view, setView] = useState<ViewByModel>(ViewByModel.Categories);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const location = useLocation();
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_MEALDB_API;

  const queryParams = new URLSearchParams(location.search);
  const activeTab = queryParams.get("active") || "categories"; // Default to categories

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

  useEffect(() => {
    if (activeTab === "areas") {
      setView(ViewByModel.Areas);
    } else if (activeTab === "allMeals") {
      setView(ViewByModel.AllMeals);
    } else {
      setView(ViewByModel.Categories);
    }
  }, [activeTab]);

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

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  const handleTabClick = (tab: string) => {
    navigate(`/menu?active=${tab}`);
  };

  return (
    <div className="menu-container">
      {/* Button Group */}
      <div className="button-group">
        <div
          role="button"
          tabIndex={0}
          onClick={() => handleTabClick("categories")}
          className={`menu-button ${
            view === ViewByModel.Categories ? "active" : ""
          }`}
        >
          Categories
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => handleTabClick("areas")}
          className={`menu-button ${
            view === ViewByModel.Areas ? "active" : ""
          }`}
        >
          National Dishes
        </div>

        <div
          role="button"
          tabIndex={0}
          onClick={() => handleTabClick("allMeals")}
          className={`menu-button ${
            view === ViewByModel.AllMeals ? "active" : ""
          }`}
        >
          All Meals
        </div>
      </div>

      {/* Search Area */}
      {view === ViewByModel.Categories && (
        <SearchArea
          placeholder="Search for Categories"
          onChange={handleSearch}
          searchQuery={searchQuery}
        />
      )}
      {view === ViewByModel.Areas && (
        <SearchArea
          placeholder="Search for National Dishes"
          onChange={handleSearch}
          searchQuery={searchQuery}
        />
      )}
      {view === ViewByModel.AllMeals && (
        <SearchArea
          placeholder="Search All Meals"
          onChange={handleSearch}
          searchQuery={searchQuery}
        />
      )}

      {/* Menu Grid */}
      <div className="menu-grid">
        {view === ViewByModel.Categories &&
          (filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Link
                key={category.strCategory}
                to={`/category/${category.strCategory}`}
                className="menu-card"
              >
                <h3>{category.strCategory}</h3>
              </Link>
            ))
          ) : (
            <p className="no-results">No categories match your search.</p>
          ))}

        {view === ViewByModel.Areas &&
          (filteredAreas.length > 0 ? (
            filteredAreas.map((area) => (
              <Link
                key={area.strArea}
                to={`/area/${area.strArea}`}
                className="menu-card"
              >
                <h3>{area.strArea}</h3>
              </Link>
            ))
          ) : (
            <p className="no-results">No national dishes match your search.</p>
          ))}

        {view === ViewByModel.AllMeals &&
          (filteredAllMeals.length > 0 ? (
            filteredAllMeals.map((meal) => (
              <Link
                key={meal.idMeal}
                to={`/meal/${meal.idMeal}`}
                className="menu-card"
              >
                <h3>{meal.strMeal}</h3>
              </Link>
            ))
          ) : (
            <p className="no-results">No meals match your search.</p>
          ))}
      </div>
    </div>
  );
};

export default Menu;
