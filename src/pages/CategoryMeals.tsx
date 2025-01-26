import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import { Meal } from "../MealTypes";
import "./Meals.css";

const CategoryMeals = () => {
  const { category } = useParams<{ category: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const API_URL = import.meta.env.VITE_MEALDB_API;

  useEffect(() => {
    const fetchMealsByCategory = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/filter.php?c=${category}`);
        const data = await response.json();
        setMeals(data.meals || []);
        setLoading(false);
      } catch (err) {
        setError("Error fetching meals.");
        console.error("Error fetching meals:", err);
        setLoading(false);
      }
    };

    if (category) {
      fetchMealsByCategory();
    }
  }, [category, API_URL]);

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
      <div className="header-container">
        <div className="button-group">
          <Link
            to="/menu"
            state={{ activeTab: "categories" }}
            className="menu-button active"
          >
            Back to Categories Meal
          </Link>
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
                <Link
                  to={`/meal/${meal.idMeal}`}
                  state={{ activeTab: "categories" }}
                  className="see-more-link"
                >
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

export default CategoryMeals;
