import { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Meal } from "../MealTypes";
import {
  Button,
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const MealDetails = () => {
  const { idMeal } = useParams<{ idMeal: string }>();
  const [meal, setMeal] = useState<Meal | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
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
  }, [idMeal, API_URL]);

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

  if (loading)
    return <Typography variant="h6">Loading meal details...</Typography>;
  if (error)
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  if (!meal) return null;

  const ingredients = Array.from({ length: 20 })
    .map((_, index) => {
      const ingredient = meal[`strIngredient${index + 1}` as keyof Meal];
      const measure = meal[`strMeasure${index + 1}` as keyof Meal];
      return ingredient ? `${ingredient} - ${measure}` : null;
    })
    .filter(Boolean);

  return (
    <Container maxWidth="md">
      {/* Buttons */}
      <div className="button-container">
        <Button
          component={Link}
          to="/menu"
          variant="contained"
          color="secondary"
        >
          Back to Categories
        </Button>
        <Button onClick={fetchRandomMeal} variant="contained" color="primary">
          Random Meal
        </Button>
      </div>
      <Typography variant="h4" gutterBottom textAlign="center">
        {meal.strMeal}
      </Typography>

      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{
          width: "100%",
          maxHeight: "400px",
          objectFit: "cover",
          borderRadius: 10,
          marginBottom: 20,
        }}
      />
      <Typography variant="subtitle1" color="textSecondary" gutterBottom>
        <strong>Category:</strong> {meal.strCategory}
      </Typography>
      <Typography variant="subtitle1" color="textSecondary">
        <strong>Area:</strong> {meal.strArea}
      </Typography>
      <Typography variant="body1" paragraph>
        <strong>Instructions:</strong> {meal.strInstructions}
      </Typography>
      <Typography variant="h6">Ingredients</Typography>
      <List>
        {ingredients.map((item, index) => (
          <ListItem key={index}>
            <ListItemText primary={item} />
          </ListItem>
        ))}
      </List>

      {meal.strYoutube && (
        <div className="youtube-button-container">
          <Button
            onClick={() => {
              if (meal.strYoutube) {
                window.open(String(meal.strYoutube), "_blank");
              }
            }}
            variant="contained"
            color="info"
          >
            Youtube Link
          </Button>
        </div>
      )}
    </Container>
  );
};

export default MealDetails;
