import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Meal } from "../MealTypes";
import "./MealDetails.css";

const MealDetails = () => {
  const { idMeal } = useParams<{ idMeal: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const API_URL = import.meta.env.VITE_MEALDB_API;
  const navigate = useNavigate();

  const fetchMealDetails = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/lookup.php?i=${idMeal}`);
      const data = await response.json();
      if (data.meals) {
        setMeal(data.meals[0]);
      } else {
        setError("Meal not found.");
      }
    } catch (err) {
      setError("Error fetching meal details.");
      console.error("Error fetching meal details:", err);
    } finally {
      setLoading(false);
    }
  }, [API_URL, idMeal]);

  const fetchRandomMeal = async () => {
    try {
      const response = await fetch(`${API_URL}/random.php`);
      const data = await response.json();
      if (data.meals) {
        const randomMealId = data.meals[0].idMeal;
        navigate(`/meal/${randomMealId}`);
      }
    } catch (err) {
      console.error("Error fetching random meal:", err);
    }
  };

  useEffect(() => {
    if (idMeal) {
      fetchMealDetails();
    }
  }, [idMeal, fetchMealDetails]);

  if (loading) return <p>Loading meal details...</p>;
  if (error) return <p>{error}</p>;
  if (!meal) return null;

  const ingredients = Array.from({ length: 20 })
    .map((_, index) => {
      const ingredient = meal[`strIngredient${index + 1}` as keyof Meal];
      const measure = meal[`strMeasure${index + 1}` as keyof Meal];
      return ingredient ? `${ingredient} - ${measure}` : null;
    })
    .filter(Boolean);

  return (
    <div className="meal-details-container">
      {/* Buttons at the top */}
      <div className="button-container">
        <Link to="/" className="button">
          Go Home
        </Link>
        <button onClick={fetchRandomMeal} className="button">
          Random Meal
        </button>
      </div>

      {/* Meal details */}
      <h1>{meal.strMeal}</h1>
      <img src={meal.strMealThumb} alt={meal.strMeal} className="meal-image" />
      <p>
        <strong>Category:</strong> {meal.strCategory}
      </p>
      <p>
        <strong>Area:</strong> {meal.strArea}
      </p>
      <p>
        <strong>Instructions:</strong> {meal.strInstructions}
      </p>
      <h3>Ingredients</h3>
      <ul>
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <div>Drink altternate :any</div>

      {meal.strYoutube && (
        <div className="youtube-button-container">
          <button
            onClick={() => {
              if (meal.strYoutube) {
                window.open(String(meal.strYoutube), "_blank");
              }
            }}
            className="button youtube-button"
          >
            Youtube Link
          </button>
        </div>
      )}
    </div>
  );
};

export default MealDetails;
