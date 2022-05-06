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
let inputValue = '';
let recipeArray = [];

function displayRecipes(allRecipes, inputValue) {
  recipesList.innerHTML = '';
  allRecipes.forEach((recipe) => {
    if (inputValue == null || inputValue == undefined || inputValue == "") {
      let recipeTemplate = new RecipeCard().recipeCard(recipe);
      recipesList.innerHTML += recipeTemplate;
    }
    return recipesList;
  });
}

displayRecipes(allRecipes, inputValue);

input.addEventListener('input', (e) => {
  inputValue = e.target.value;
  let inputLength = inputValue.length
  if (inputLength >= 3) {
    allRecipes.forEach((recipe) => {
      if ((recipe.name.includes(inputValue) || recipe.description.includes(inputValue) || recipe.ingredients.some(a => a.ingredient.includes(inputValue)))) {
        recipeArray.push(recipe);
        console.log(recipe);
      } else {
        recipeArray = recipesList;
      }
    })
  }
  displayRecipes(recipeArray, inputValue);
})
