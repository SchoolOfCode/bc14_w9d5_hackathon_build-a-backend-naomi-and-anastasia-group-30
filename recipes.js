import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";

const fileName = "recipes.json";

// All the functions in this file are helper functions
// This means that they are functions that will be called by other functions in the app.js file
// To make the app.js file easier to read and understand
// The app.js file will call these helper functions when the client hits the endpoints



// GET ALL RECIPES
export async function getRecipes() {
    const recipesJSON = await fs.readFile(fileName); // Read the recipes.json file and await its response
    const recipes = JSON.parse(recipesJSON); // Parse the recipesJSON into a JavaScript array of objects
    return recipes; // Return the array of objects
}
// If it's not working on Thunder Client, remember to check the port number in the URL, plus to have no s in http



// GET A RECIPE BY ID
export async function getRecipeByID(id) { // This function will be called when the client hits the endpoint, this means when the client requests a recipe by id
    const recipesJSON = await fs.readFile(fileName); // Read the recipes.json file and await its response
    const recipes = JSON.parse(recipesJSON); // Parse the recipesJSON into a JavaScript array of objects
    let recipeObject = null; // Declare a variable called recipeObject and set it to null
    for (let i = 0; i < recipes.length; i++) { // Loop through the array of objects
        if (recipes[i].id === id) { // If the id of the current object matches the id passed in as an argument
          recipeObject = recipes[i]; // Set the recipeObject to the current object
          // That means if the id passed in is 1, the recipeObject will be the object with id 1
          break; // The loop will stop when it finds the first match with the id we're looking for
        }
      }
    // if (recipeObject === null) { // If the recipeObject is still null, return an error message
    //     throw new Error("Recipe not found");
    // }
    if (recipeObject === null) {
        console.log("Recipe not found");
        const errorMessage = "Recipe not found";
        return errorMessage;
    }
    return recipeObject; // Return the recipeObject with the matching id
}
// In this function, we're looking for a particular recipe by the id we're giving it
// So we need to pass the id as an argument to the function when we call it via the request object in the app.js file




// CREATE A RECIPE
export async function createRecipe(title, ingredients, instructions, image) {
    const recipesString = await fs.readFile(fileName); //reading the json file (string), save read version in a variable
    const recipesObject = JSON.parse(recipesString); //parse the json string into a json array of objects

    const newRecipe = { 
        id: uuidv4(),
        title,
        ingredients,
        instructions,
        image,
    };
    // define the new recipe object structure, actual content to be provided by client during HTTP request
    recipesObject.push(newRecipe); //push new object into exisitng object
    await fs.writeFile(fileName, JSON.stringify(recipesObject)); //write the object back into its stringified version
    return newRecipe; //return the new recipe as proof that it works
}


// UPDATE A RECIPE BY ID
export async function updateRecipeByID(id, instructions) {
    const recipesString = await fs.readFile(fileName); //reading the json file (string), save read version in a variable
    const recipesObject = JSON.parse(recipesString); //parse the json string into a json array of objects

    let recipe = null;

    for (let i=0; i < recipesObject.length; i++){
        console.log("I'm inside my for loop");
        if (recipesObject[i].id === id){
            console.log("I'm inside my if statement");
            recipesObject[i].instructions = instructions; // update the instructions of the recipe with the matching id
            console.log(recipesObject[i]);
            recipe = recipesObject[i]; // set the recipe variable to the recipe with the matching id
            break;
    }
    await fs.writeFile(fileName, JSON.stringify(recipesObject, null, 2));
}
    // console.log(instructions)
    
    if (recipe === null) {
        console.log("Recipe not found");
        const errorMessage = "Recipe not found";
        return errorMessage;
    }
    return recipe;
}


// DELETE A RECIPE BY ID
export async function deleteRecipeByID(id) {
    const recipesString = await fs.readFile(fileName); //reading the json file (string), save read version in a variable
    const recipesObject = JSON.parse(recipesString); //parse the json string into a json array of objects

    let recipeIndex = null;

    for (let i = 0; i < recipesObject.length; i++) {
        if (recipesObject[i].id === id) {
          console.log(recipesObject[i]);
          recipeIndex = i; // This is giving us the index of the recipe that we want to delete
          break;
        }
    }
    if (recipeIndex !== null) {
        const deletedRecipe = recipesObject.splice(recipeIndex, 1);
        console.log(deletedRecipe[0])
        // In the deletedRecipe variable we are assigning the result of the splice which is the array item (object) with the matching index
        await fs.writeFile(fileName, JSON.stringify(recipesObject));
        return deletedRecipe[0]; // The splice method gives us the result as an array, that's why we're specifying the item of the array we need to delete
    }
    else {
        console.log("Recipe not found");
        const errorMessage = "Recipe not found";
        return errorMessage;
    }
}