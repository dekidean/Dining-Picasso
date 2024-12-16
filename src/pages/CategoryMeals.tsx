import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
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
      <h1>{category} Meals</h1>

      {/* Serch Areia */}
      <div className="search-area">
        <input
          type="text"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>

      <div className="meals-grid">
        {filteredMeals.map((meal, index) => (
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
                className={`see-more-link ${
                  index === filteredMeals.length - 1 ? "last-meal" : ""
                }`}
              >
                See More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryMeals;
