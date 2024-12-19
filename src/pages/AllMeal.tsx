import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Meal } from "../MealTypes";
import "./Meals.css";

const AllMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_MEALDB_API;

  useEffect(() => {
    const fetchAllMeals = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/search.php?s=`);
        if (response.data.meals) {
          setMeals(response.data.meals);
        } else {
          setError("No meals found.");
        }
      } catch (err) {
        setError("Error fetching meals.");
        console.error("Error fetching meals:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMeals();
  }, [API_URL]);

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>All Meals</h1>
      <div className="meals-grid">
        {meals.map((meal: Meal) => (
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
        ))}
      </div>
    </div>
  );
};

export default AllMeals;
