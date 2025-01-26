import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Meal } from "../MealTypes";
import {
  Button,
  Container,
  Typography,
  Box,
  CircularProgress,
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
  const location = useLocation();
  const activeTab = location.state?.activeTab || "categories";

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
        navigate(`/meal/${randomMealId}`, {
          state: { activeTab },
        });
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

  const handleBackClick = () => {
    navigate("/menu", {
      state: { activeTab },
      replace: true,
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="50vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" textAlign="center">
        {error}
      </Typography>
    );
  }

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
      <Box display="flex" justifyContent="flex-start" gap={2} mb={2}>
        <Button onClick={handleBackClick} variant="contained" color="secondary">
          Back to{" "}
          {activeTab === "categories"
            ? "Categories"
            : activeTab === "areas"
            ? "National Dishes"
            : "All Meals"}
        </Button>
        <Button onClick={fetchRandomMeal} variant="contained" color="primary">
          Random Meal
        </Button>
      </Box>

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
        <Box textAlign="center" mt={2}>
          <Button
            onClick={() => window.open(meal.strYoutube as string, "_blank")}
            variant="contained"
            color="info"
          >
            Watch on YouTube
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default MealDetails;
