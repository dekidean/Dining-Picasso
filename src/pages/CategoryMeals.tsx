import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Meal } from "../MealTypes";

const CategoryMeals = () => {
  const { category } = useParams<{ category: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState<boolean>(false);

  const API_URL = import.meta.env.VITE_MEALDB_API;

  useEffect(() => {
    const fetchMealsByCategory = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}/filter.php?c=${category}`);
        const data = await response.json();
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setError("No meals found for this category.");
        }
      } catch (err) {
        setError("Error fetching meals.");
        console.error("Error fetching meals:", err);
      } finally {
        setLoading(false);
      }
    };

    if (category) {
      fetchMealsByCategory();
    }
  }, [category, API_URL]);

  const handleMealClick = (meal: Meal) => {
    setSelectedMeal(meal);
    setShowDetails(true);
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div style={{ display: "flex", flexDirection: "row" }}>
      {/* Meal list section */}
      <div style={{ flex: 1 }}>
        <h1>{category} Meals</h1>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>IdMeal</th>
              <th>Area</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>
            {meals.map((meal, index) => (
              <tr
                key={meal.idMeal}
                style={{ cursor: "pointer", textDecoration: "underline" }}
                onClick={() => handleMealClick(meal)}
              >
                <td>{index + 1}</td>
                <td>
                  <Link to={`/meal/${meal.idMeal}`}>{meal.strMeal}</Link>{" "}
                  {/* Link to meal details page */}
                </td>
                <td>{meal.idMeal}</td>
                <td>{meal.strArea || "N/A"}</td>
                <td>{meal.strTags || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Meal details section */}
      <div style={{ flex: 2, paddingLeft: "20px" }}>
        {selectedMeal ? (
          <div>
            <h2>{selectedMeal.strMeal}</h2>
            <img
              src={selectedMeal.strMealThumb}
              alt={selectedMeal.strMeal}
              style={{ width: "100%", height: "auto" }}
            />
            <p>
              <strong>Category:</strong> {selectedMeal.strCategory}
            </p>
            <p>
              <strong>Area:</strong> {selectedMeal.strArea}
            </p>
            <p>
              <strong>Instructions:</strong> {selectedMeal.strInstructions}
            </p>

            {/* Button to toggle visibility of ingredients */}
            <button onClick={toggleDetails}>
              {showDetails ? "Hide Ingredients" : "Show Ingredients"}
            </button>

            {/* Conditionally render ingredients */}
            {showDetails && (
              <div>
                <h3>Ingredients</h3>
                <ul>
                  {Array.from({ length: 20 }).map((_, index) => {
                    const ingredientKey = `strIngredient${
                      index + 1
                    }` as keyof Meal;
                    const ingredient = selectedMeal[ingredientKey];

                    if (ingredient) {
                      if (
                        typeof ingredient === "string" ||
                        typeof ingredient === "number"
                      ) {
                        return <li key={ingredientKey}>{ingredient}</li>;
                      }

                      if (Array.isArray(ingredient)) {
                        return (
                          <li key={ingredientKey}>{ingredient.join(", ")}</li>
                        );
                      }

                      if (typeof ingredient === "object") {
                        return (
                          <li key={ingredientKey}>
                            {JSON.stringify(ingredient)}
                          </li>
                        );
                      }
                    }
                    return null;
                  })}
                </ul>
              </div>
            )}
          </div>
        ) : (
          <p>Select a meal to view its details.</p>
        )}
      </div>
    </div>
  );
};

export default CategoryMeals;
