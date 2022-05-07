import recipesDetail from "./recipesdetail.js";
import RecipeCard from "./cardFactory.js";
let allRecipes = new recipesDetail().getRecipes();
let allIngredient = new recipesDetail().getIngredient();
let allAppliance = new recipesDetail().getAppliance();
let allUstensils = new recipesDetail().getUstensils();
console.log(allRecipes);
console.log(allIngredient);
console.log(allAppliance);
console.log(allUstensils);

let recipesList = document.getElementById("recipes");
let input = document.querySelector(".search-input");

let inputValue;
function displayRecipes(recipes, inputValue) {
  recipesList.innerHTML = "";
  recipes.forEach((recipe) => {
    if (inputValue == null || inputValue == undefined || inputValue == "") {
      let recipeTemplate = new RecipeCard().recipeCard(recipe);
      recipesList.innerHTML += recipeTemplate;
    } else if (
      recipe.name.toLowerCase().includes(inputValue) ||
      recipe.description.toLowerCase().includes(inputValue) || recipe.ingredients.some(element => element.ingredient.toLowerCase().includes(inputValue))
    ) {
      let recipeTemplate = new RecipeCard().recipeCard(recipe);
      recipesList.innerHTML += recipeTemplate;
    } else{
      recipesList.innerHTML = "introuvable";
      }
  });
}

displayRecipes(allRecipes, inputValue);

input.addEventListener("input", (e) => {
  let inputValue = e.target.value.toLowerCase();
  let inputLength = inputValue.length;
  let resultRecipes = [];
  if (inputLength >= 3) {
    allRecipes.forEach((recipe) => {
      if (
        recipe.name.toLowerCase().includes(inputValue) ||
        recipe.description.toLowerCase().includes(inputValue)  || recipe.ingredients.some(element => element.ingredient.toLowerCase().includes(inputValue))
      ) {
        resultRecipes.push(recipe);
      }
    });
  } else {
    resultRecipes = allRecipes;
  }
  displayRecipes(resultRecipes, inputValue);
});
