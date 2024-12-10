import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Meal } from "../MealTypes";

const Category = () => {
  const { category } = useParams<{ category: string }>();
  const [dishes, setDishes] = useState<Meal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_MEALDB_API;

  useEffect(() => {
    const fetchDishes = async () => {
      try {
        const response = await fetch(`${API_URL}/filter.php?c=${category}`);
        const data = await response.json();

        if (data.meals) {
          setDishes(data.meals);
        } else {
          setError("No dishes found for this category.");
        }
      } catch (error) {
        setError("Error fetching dishes.");
        console.error("Error fetching dishes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDishes();
  }, [category, API_URL]);

  if (loading) {
    return <p>Loading dishes...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>{category} Dishes</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <table
          style={{
            width: "80%",
            borderCollapse: "collapse",
            marginTop: "20px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <thead>
            <tr>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                No.
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Name
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                IdMeal
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Area
              </th>
              <th
                style={{
                  border: "1px solid #ddd",
                  padding: "10px",
                  textAlign: "left",
                }}
              >
                Tags
              </th>
            </tr>
          </thead>
          <tbody>
            {dishes.map((dish, index) => (
              <tr
                key={dish.idMeal}
                style={{
                  cursor: "pointer",
                  backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                }}
              >
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {index + 1}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  <Link
                    to={`/meal/${dish.idMeal}`}
                    style={{ textDecoration: "none", color: "#007bff" }}
                  >
                    {dish.strMeal}
                  </Link>
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {dish.idMeal}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {dish.strArea || "N/A"}
                </td>
                <td style={{ border: "1px solid #ddd", padding: "10px" }}>
                  {dish.strTags ? dish.strTags.split(",").join(", ") : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
