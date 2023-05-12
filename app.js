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


//Create a POST /api/recipes this is the end point the client can use to add data to the back end

app.post("/api/recipes", async function (req, res){
  res.send(await createRecipe(req.body.title, req.body.ingredients, req.body.instructions, req.body.image));
 })
 //req.params is used when the client is putting info into the url e.g the unique id 
 //req.body is used when you provide info in the request in the form of a JSON body.


//404 error emerged because the url that is being requested didnt match the route provided to the 
//route handler (recipes not recipe)

//This now works because: when making the request, the JSON object is read, the keys are identified "title"
//thunder client looks in this doc to know how to make the request, we've provided the request object as an argument, and so 
//it uses the title, etc provided in the request to formulate the response.


app.patch("/api/recipes/:id", async function (req, res){
  res.send(await updateRecipeByID(req.params.id, req.body.instructions));
 })



app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});





//example of recipe to add to API