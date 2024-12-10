import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Meal } from "../MealTypes";

const MealDetails = (): JSX.Element => {
  const { idMeal } = useParams<{ idMeal: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_MEALDB_API;

  useEffect(() => {
    const fetchMealDetails = async () => {
      try {
        setError(null);
        setLoading(true);

        const response = await fetch(`${API_URL}/lookup.php?i=${idMeal}`);
        const data = await response.json();

        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0]);
        } else {
          setError("Meal not found.");
        }
      } catch (error) {
        setError("Error fetching meal details.");
        console.error("Error fetching meal details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (idMeal) {
      fetchMealDetails();
    } else {
      setError("Invalid meal ID.");
      setLoading(false);
    }
  }, [idMeal, API_URL]);

  if (loading) {
    return <p>Loading meal details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="meal-details">
      <Link to="/">Back to Categories</Link> {/* Link to the home page */}
      {meal ? (
        <div>
          <h2>{meal.strMeal}</h2>
          <img
            src={meal.strMealThumb}
            alt={meal.strMeal}
            style={{ width: "100%", height: "auto" }}
          />
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
            {Array.from({ length: 20 }).map((_, index) => {
              const ingredientKey = `strIngredient${index + 1}` as keyof Meal;
              const ingredient = meal[ingredientKey];

              if (ingredient) {
                if (
                  typeof ingredient === "string" ||
                  typeof ingredient === "number"
                ) {
                  return <li key={ingredientKey}>{ingredient}</li>;
                }

                if (Array.isArray(ingredient)) {
                  return <li key={ingredientKey}>{ingredient.join(", ")}</li>;
                }

                if (typeof ingredient === "object") {
                  return (
                    <li key={ingredientKey}>{JSON.stringify(ingredient)}</li>
                  );
                }
              }

              return null;
            })}
          </ul>
        </div>
      ) : (
        <p>No meal found.</p>
      )}
    </div>
  );
};

export default MealDetails;
