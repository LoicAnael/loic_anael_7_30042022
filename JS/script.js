import recipesDetail from "./recipesdetail.js";
import RecipeCard from "./cardFactory.js";
let allRecipes = new recipesDetail().getRecipes();
let allIngredient = new recipesDetail().getIngredient();
let allAppliance = new recipesDetail().getAppliance();
let allUstensils = new recipesDetail().getUstensils();

let recipesList = document.getElementById("recipes");
let input = document.querySelector(".search-input");

function displayRecipes(recipes) {
  recipesList.innerHTML = "";
  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      recipe.ingredients.map((a) => {
        a.unit == undefined ? (a.unit = "") : a.unit;
        a.quantity == undefined ? (a.quantity = "") : a.quantity;
      });
      let recipeTemplate = new RecipeCard().recipeCard(recipe);
      recipesList.innerHTML += recipeTemplate;
    });
  } else {
    recipesList.innerHTML = "introuvable";
  }
}

displayRecipes(allRecipes);

input.addEventListener("input", (e) => {
  let inputValue = e.target.value.toLowerCase();
  let inputLength = inputValue.length;
  let resultRecipes = [];
  if (inputLength >= 3) {
    allRecipes.forEach((recipe) => {
      if (
        recipe.name.toLowerCase().includes(inputValue) ||
        recipe.description.toLowerCase().includes(inputValue) ||
        recipe.ingredients.some((element) =>
          element.ingredient.toLowerCase().includes(inputValue)
        )
      ) {
        resultRecipes.push(recipe);
      }
    });
  } else {
    resultRecipes = allRecipes;
  }
  displayRecipes(resultRecipes);
});

///////////////filter buttons event//////////////

////ingredient button and event event/////
let ingredientDropdown = document.getElementById("ingredient-dropdown");
let ingredientButton = document.getElementById("ingredient-btn");
let closeIngredient = document.querySelector("#close-ingredient");
let ingredientList = document.getElementById("ingredient-list");
let inputIngredient = document.getElementById("ingredient-input");

////appareil button and event event/////
let appareilDropdown = document.getElementById("appareil-dropdown");
let appareilButton = document.getElementById("appareil-btn");
let closeAppareil = document.querySelector("#close-appareil");
let appareilList = document.getElementById("appareil-list");

////ustensiles button and event event/////
let ustensilDropdown = document.getElementById("ustensil-dropdown");
let ustensilButton = document.getElementById("ustensil-btn");
let closeUstensil = document.querySelector("#close-ustensil");
let ustensilList = document.getElementById("ustensil-list");

function openFilter(btn, dropdown) {
  btn.style.display = "none";
  dropdown.style.display = "block";
}
function closeFilter(btn, dropdown, icon) {
  icon.addEventListener("click", () => {
    dropdown.style.display = "none";
    btn.style.display = "flex";
  });
}
closeFilter(ingredientButton, ingredientDropdown, closeIngredient);
closeFilter(appareilButton, appareilDropdown, closeAppareil);
closeFilter(ustensilButton, ustensilDropdown, closeUstensil);

////////display all recipes filters function////////////

function displayIngredients(allElements, elementList) {
  elementList.innerHTML = "";
  allElements.forEach((element) => {
    let filterTemplate = `<p>${element}</p>`;
    elementList.innerHTML += filterTemplate;
  });
}

ingredientButton.addEventListener("click", () => {
  openFilter(ingredientButton, ingredientDropdown);
  displayIngredients(allIngredient, ingredientList);
});
appareilButton.addEventListener("click", () => {
  openFilter(appareilButton, appareilDropdown);
  displayIngredients(allAppliance, appareilList);
});
ustensilButton.addEventListener("click", () => {
  openFilter(ustensilButton, ustensilDropdown);
  displayIngredients(allUstensils, ustensilList);
});
ingredientList.innerHTML = "";
let resultIngredients = [];
document.getElementById("ingredient-input").addEventListener("input", (e) => {
  let inputValu = e.target.value;
  resultIngredients = [];
  ingredientList.innerHTML = "";
  allIngredient.forEach((recip) => {
    if (recip.toLowerCase().includes(inputValu)) {
      resultIngredients.push(recip);
    }
    console.log(resultIngredients);
  });
  displayIngredients(resultIngredients, ingredientList);
});
