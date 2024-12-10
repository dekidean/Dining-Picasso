import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Meal } from "../MealTypes";

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
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>No.</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Category
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>Area</th>
            <th style={{ border: "1px solid black", padding: "8px" }}>
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal, index) => (
            <tr
              key={meal.idMeal}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                border: "1px solid black",
              }}
            >
              <td style={{ padding: "8px" }}>{index + 1}</td>
              <td style={{ padding: "8px" }}>{meal.strMeal}</td>
              <td style={{ padding: "8px" }}>{meal.strCategory || "N/A"}</td>
              <td style={{ padding: "8px" }}>{meal.strArea || "N/A"}</td>
              <td style={{ padding: "8px" }}>
                <Link to={`/meal/${meal.idMeal}`}>View Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllMeals;
