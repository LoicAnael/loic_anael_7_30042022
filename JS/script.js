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
let inputValue = input.value;
inputValue = "";

function displayRecipes(recipes, inputValue) {
  recipes.forEach((recipe) => {
    if (inputValue == null || inputValue == undefined || inputValue == "") {
      let recipeTemplate = new RecipeCard().recipeCard(recipe);
      recipesList.innerHTML += recipeTemplate;
    } else {
      recipesList.innerHTML = "";
    }
    return recipesList;
  });
}
displayRecipes(allRecipes, inputValue);
