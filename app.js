import express from "express";

import {
  getRecipes,
  getRecipeByID,
  createRecipe,
  updateRecipeByID,
  deleteRecipeByID,
} from "./recipes.js";

// This is the server
// This file contains the endpoints that the client will hit
// This means that the route handlers are in this file 
// The route handlers are the functions that will be called when the client hits the endpoints

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

// Create a GET /api/recipes endpoint that returns all recipes
app.get("/api/recipes", (req, res) => { // This is the endpoint that the client will hit to get all recipes from the server
  async function allRecipes() { // This is the function that will be called when the client hits the endpoint
    const result = await getRecipes(); // The getRecipes helper function will be called and its result will be saved to a variable called result
    res.send(result); // The result will be sent back to the client as a response
  }
  allRecipes(); // The allRecipes function will be called
  // So when the client hits the endpoint, the getRecipes helper function will be called and its result will be sent back to the client
});

// Create a GET /api/recipes/:id endpoint that returns a single recipe given an id
app.get("/api/recipes/:id", (req, res) => { // This is the endpoint that the client will hit
  async function singleRecipe() { // This is the function that will be called when the client hits the endpoint to look for a single recipe
    const result = await getRecipeByID(req.params.id); // The getRecipeByID helper function will be called and its result will be saved to a variable called result
    // We need to pass the id as an argument to the getRecipeByID helper function, so we're using the request object to get the id from the client
    res.send(result); // The result will be sent back to the client as a response
  }
  singleRecipe(); // The singleRecipe function will be called and return the recipe with the matching id to the client as a response
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
