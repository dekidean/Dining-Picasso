import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { Meal } from "../MealTypes";
import "./Meals.css";

const AreaMeals = () => {
  const { area } = useParams<{ area: string }>();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [area]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredMeals = meals.filter((meal: Meal) =>
    meal.strMeal.toLowerCase().includes(searchQuery.toLowerCase())
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
          placeholder="Search by name"
          value={searchQuery}
          onChange={handleSearch}
        />
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
