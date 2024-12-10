import { useEffect, useState } from "react";
import axios from "axios";
// import { Link } from "react-router-dom";
import { Category, Area, Meal } from "../MealTypes";

const Menu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [areas, setAreas] = useState<Area[]>([]);
  const [allMeals, setAllMeals] = useState<Meal[]>([]);
  const [isNationalDishes, setIsNationalDishes] = useState(false);
  const [isAllMeals, setIsAllMeals] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_MEALDB_API;

  // Fetch categories (meal types)
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/list.php?c=list`);
        console.log("Categories:", response.data);
        setCategories(response.data.meals);
        setError(null);
      } catch (error) {
        setError("Error fetching categories.");
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [API_URL]);

  // Fetch areas (national dishes)
  useEffect(() => {
    const fetchAreas = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/list.php?a=list`);
        console.log("Areas:", response.data);
        setAreas(response.data.meals);
        setError(null);
      } catch (error) {
        setError("Error fetching areas.");
        console.error("Error fetching areas:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAreas();
  }, [API_URL]);

  // Fetch all meals
  useEffect(() => {
    const fetchAllMeals = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/search.php?s=`);
        console.log("All Meals:", response.data);
        setAllMeals(response.data.meals);
        setError(null);
      } catch (error) {
        setError("Error fetching all meals.");
        console.error("Error fetching all meals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAllMeals();
  }, [API_URL]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Menu</h1>
      <button
        onClick={() => {
          setIsAllMeals(false);
          setIsNationalDishes(false);
        }}
      >
        Categories
      </button>
      <button
        onClick={() => {
          setIsAllMeals(false);
          setIsNationalDishes(true);
        }}
      >
        National Dishes
      </button>
      <button
        onClick={() => {
          setIsAllMeals(true);
          setIsNationalDishes(false);
        }}
      >
        All Meals
      </button>

      <ul>
        {isAllMeals
          ? allMeals.map((meal) => <li key={meal.idMeal}>{meal.strMeal}</li>) // Show all meals
          : isNationalDishes
          ? areas.map((area) => <li key={area.strArea}>{area.strArea}</li>) // Show national dishes
          : categories.map((category) => (
              <li key={category.strCategory}>{category.strCategory}</li> // Show categories
            ))}
      </ul>
    </div>
  );
};

export default Menu;
