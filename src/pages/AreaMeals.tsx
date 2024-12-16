import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Meal } from "../MealTypes";
import "./Meals.css"; // Importing the enhanced CSS

const AreaMeals = () => {
  const { area } = useParams<{ area: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const API_URL = import.meta.env.VITE_MEALDB_API;

  useEffect(() => {
    const fetchMealsByArea = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/filter.php?a=${area}`);
        const data = await response.json();
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setError("No meals found for this area.");
        }
      } catch (err) {
        setError("Error fetching meals.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMealsByArea();
  }, [area, API_URL]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredMeals = meals.filter(
    (meal) =>
      meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase()) ||
      meal.idMeal.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return <p>Loading meals...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>{area} Dishes</h1>

      {/* Search Area */}
      <div className="search-area">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="meals-grid">
        {filteredMeals.map((meal) => (
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

export default AreaMeals;
