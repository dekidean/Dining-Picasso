import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { CircularProgress } from "@mui/material"; // Import CircularProgress
import { Meal } from "../MealTypes";
import "./Meals.css";

const AreaMeals = () => {
  const { area } = useParams<{ area: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_MEALDB_API;

  useEffect(() => {
    const fetchMealsByArea = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/filter.php?a=${area}`);
        setMeals(response.data.meals || []);
        setLoading(false);
      } catch (err) {
        setError("Error fetching meals.");
        console.error("Error fetching meals:", err);
        setLoading(false);
      }
    };

    fetchMealsByArea();
  }, [area, API_URL]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredMeals = meals.filter((meal: Meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="area-meals-container">
      {/* Header Section: Button and Search Area */}
      <div className="header-container">
        <div className="button-group">
          <button
            className="menu-button active"
            onClick={() => navigate("/menu", { state: { activeTab: "areas" } })}
          >
            Back to National Dishes
          </button>
        </div>

        <div className="search-area">
          <input
            type="text"
            placeholder="Search by name"
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
      </div>

      {/* Meals Grid */}
      <div className="meals-grid">
        {filteredMeals.length > 0 ? (
          filteredMeals.map((meal: Meal) => (
            <div key={meal.idMeal} className="meal-card">
              <img
                src={meal.strMealThumb}
                alt={meal.strMeal}
                className="meal-image"
              />
              <div className="meal-info">
                <h3>{meal.strMeal}</h3>
                <Link to={`/meal/${meal.idMeal}`} className="see-more-link">
                  See More
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p>No meals match your search.</p>
        )}
      </div>
    </div>
  );
};

export default AreaMeals;
