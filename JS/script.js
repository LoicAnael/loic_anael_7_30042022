import recipesDetail from "./recipesdetail.js";
import RecipeCard from "./cardFactory.js";
import { recipes } from "./recipes.js";
let allRecipes = new recipesDetail().getRecipes(recipes);
let allIngredient = new recipesDetail().getIngredient(recipes);
let allAppliance = new recipesDetail().getAppliance(recipes);
let allUstensils = new recipesDetail().getUstensils(recipes);
let recipesList = document.getElementById("recipes");
let input = document.querySelector(".search-input");
let filterResultArray = [];
let resultRecipes = [];
let filteredRecipes = [];
let IngredientFiltered = [];
let ApplianceFiltered = [];
let UstensilsFiltered = [];

function displayRecipes(recipes) {
  if (recipes.length > 0) {
    recipesList.innerHTML = "";
    recipes.forEach((recipe) => {
      recipe.ingredients.map((a) => {
        a.unit == undefined ? (a.unit = "") : a.unit;
        a.quantity == undefined ? (a.quantity = "") : a.quantity;
      });
      let recipeTemplate = new RecipeCard().recipeCard(recipe);
      recipesList.innerHTML += recipeTemplate;
    });
  } else {
    recipesList.innerHTML = "Aucune recette ne correspond à votre critère ... ";
  }
}

displayRecipes(allRecipes);

let recipesTagArray = [];
function displayRecipesByTags(filterResultArray, recipesArrray) {
  if (filterResultArray.length > 0) {
    recipesList.innerHTML = "";
    recipesArrray.forEach((recipe) => {
      recipe.ingredients.map((a) => {
        a.unit == undefined ? (a.unit = "") : a.unit;
        a.quantity == undefined ? (a.quantity = "") : a.quantity;
      });
      for (let u = 0; u < filterResultArray.length; u++) {
        if (
          recipe.appliance.includes(filterResultArray[u]) ||
          recipe.ustensils.some(
            (item) =>
              item.includes(filterResultArray[u]) ||
              recipe.ingredients.some((item) =>
                item.ingredient.includes(filterResultArray[u])
              )
          )
        ) {
          let recipeTemplate = new RecipeCard().recipeCard(recipe);
          recipesList.innerHTML += recipeTemplate;
          recipesTagArray.push(recipe);
        }
      }
    });
  }
}

////////event for displaying recipes by mmain search input//////////
input.addEventListener("input", (e) => {
  let inputValue = e.target.value.toLowerCase();
  let inputLength = inputValue.length;
  resultRecipes = [];
  if (inputLength >= 3) {
    for (let j = 0; j < allRecipes.length; j++) {
      if (
        allRecipes[j].name.toLowerCase().includes(inputValue) ||
        allRecipes[j].description.toLowerCase().includes(inputValue) ||
        allRecipes[j].ingredients.some((element) =>
          element.ingredient.toLowerCase().includes(inputValue)
        )
      ) {
        resultRecipes.push(allRecipes[j]);
        filteredRecipes = new recipesDetail().getRecipes(resultRecipes);
        IngredientFiltered = new recipesDetail().getIngredient(resultRecipes);
        ApplianceFiltered = new recipesDetail().getAppliance(resultRecipes);
        UstensilsFiltered = new recipesDetail().getUstensils(resultRecipes);
      }
    }
  } else {
    resultRecipes = allRecipes;
  }
  displayRecipes(resultRecipes);
  displayIngredients(IngredientFiltered, ingredientList);
  displayIngredients(ApplianceFiltered, appareilList);
  displayIngredients(UstensilsFiltered, ustensilList);
  if (filterResultArray.length > 0 && inputLength == 0) {
    displayRecipesByTags(filterResultArray, filteredRecipes);
  } else if (filterResultArray.length == 0 && inputLength == 0) {
    displayRecipes(resultRecipes);
    displayIngredients(allIngredient, ingredientList);
    displayIngredients(allAppliance, appareilList);
    displayIngredients(allUstensils, ustensilList);
  }
});

////////condition pour affichage des recettes tag en croisement avec les recettes deja triees////////
if (filteredRecipes.length == 0) {
  displayRecipesByTags(filterResultArray, allRecipes);
} else {
  displayRecipesByTags(filterResultArray, filteredRecipes);
}
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
let inputAppareil = document.getElementById("appareil-input");

////ustensiles button and event event/////
let ustensilDropdown = document.getElementById("ustensil-dropdown");
let ustensilButton = document.getElementById("ustensil-btn");
let closeUstensil = document.querySelector("#close-ustensil");
let ustensilList = document.getElementById("ustensil-list");
let inputUstensile = document.getElementById("ustensile-input");

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
  for (let i = 0; i < allElements.length; i++) {
    let filterTemplate = `<p data-id="${allElements[i]}">${allElements[i]}</p>`;
    elementList.innerHTML += filterTemplate;
  }
}

////display ingredients filters items/////
ingredientButton.addEventListener("click", () => {
  openFilter(ingredientButton, ingredientDropdown);
  if (resultRecipes.length > 0) {
    displayIngredients(IngredientFiltered, ingredientList);
  } else if (recipesTagArray.length > 0) {
    displayIngredients(ingredientSelected, ingredientList);
  } else {
    displayIngredients(allIngredient, ingredientList);
  }
});
////display appliances filters items/////
appareilButton.addEventListener("click", () => {
  openFilter(appareilButton, appareilDropdown);
  if (resultRecipes.length > 0) {
    displayIngredients(ApplianceFiltered, appareilList);
  } else if (recipesTagArray.length > 0) {
    displayIngredients(appareilSelected, appareilList);
  } else {
    displayIngredients(allAppliance, appareilList);
  }
});
////display ustensiles filters items/////
ustensilButton.addEventListener("click", () => {
  openFilter(ustensilButton, ustensilDropdown);
  if (resultRecipes.length > 0) {
    displayIngredients(UstensilsFiltered, ustensilList);
  } else if (recipesTagArray.length > 0) {
    displayIngredients(ustensilSelected, ustensilList);
  } else {
    displayIngredients(allUstensils, ustensilList);
  }
});

//////display filters items by input event///////
function filterInput(inputs, allElements, elementList) {
  inputs.addEventListener("input", (e) => {
    let inputValue = e.target.value;
    let resultItems = [];
    elementList.innerHTML = "";
    for (let i = 0; i < allElements.length; i++) {
      if (allElements[i].toLowerCase().includes(inputValue.toLowerCase())) {
        resultItems.push(allElements[i]);
      }
    }
    displayIngredients(resultItems, elementList);
  });
}
filterInput(inputIngredient, allIngredient, ingredientList);
filterInput(inputAppareil, allAppliance, appareilList);
filterInput(inputUstensile, allUstensils, ustensilList);

/////////////declanchement de l'evenement pour selection et affichage de l'element en TAG //////////////
let filterResult = document.querySelector(".filter-chosen");
let ingredientSelected = [];
let appareilSelected = [];
let ustensilSelected = [];
document.addEventListener("click", (e) => {
  let value = e.target.dataset.id;
  let color;
  if (value !== undefined) {
    let type = e.target.parentNode.parentNode.id;
    if (type == "ingredient-dropdown") {
      color = "btn-1";
    }
    if (type == "appareil-dropdown") {
      color = "btn-2";
    }
    if (type == "ustensil-dropdown") {
      color = "btn-3";
    }
    let resultTemplate = `<div class="item ${color}" id="btn-${value}"><span>${value}</span><i class="far fa-times-circle close" data-value="${value}"></i></div>`;
    filterResult.innerHTML += resultTemplate;
    filterResultArray.push(value);
    if (filteredRecipes.length == 0) {
      displayRecipesByTags(filterResultArray, allRecipes);
    } else {
      displayRecipesByTags(filterResultArray, filteredRecipes);
    }

    /////////declaration des nouveaux tableau de filtre en fonction des tags selectionnes///////
    ingredientSelected = new recipesDetail().getIngredient(recipesTagArray);
    appareilSelected = new recipesDetail().getAppliance(recipesTagArray);
    ustensilSelected = new recipesDetail().getUstensils(recipesTagArray);
    if (recipesTagArray.length > 0) {
      displayIngredients(ingredientSelected, ingredientList);
      displayIngredients(appareilSelected, appareilList);
      displayIngredients(ustensilSelected, ustensilList);
    }
  }
  /////////suppression des tags de filtres selectiones////////
  let deleteTag = e.target.dataset.value;
  if (deleteTag !== undefined) {
    for (let j = 0; j < recipesTagArray.length; j++) {
      recipesTagArray.splice(j);
    }
    for (let i = 0; i < filterResultArray.length; i++) {
      if (filterResultArray[i] === deleteTag) {
        filterResultArray.splice(i);
      }
      if (filterResultArray.length > 0) {
        if (filteredRecipes.length == 0) {
          displayRecipesByTags(filterResultArray, allRecipes);
        } else {
          displayRecipesByTags(filterResultArray, filteredRecipes);
        }
      } else if (resultRecipes.length > 0) {
        displayRecipes(resultRecipes);
      } else {
        displayRecipes(allRecipes);
      }
    }
    for (let i = 0; i < ingredientSelected.length; i++) {
      ingredientSelected.splice(i);
      if (resultRecipes.length > 0) {
        displayIngredients(IngredientFiltered, ingredientList);
      } else {
        displayIngredients(allIngredient, ingredientList);
      }
    }
    for (let i = 0; i < appareilSelected.length; i++) {
      appareilSelected.splice(i);
      if (resultRecipes.length > 0) {
        displayIngredients(ApplianceFiltered, appareilList);
      } else {
        displayIngredients(allAppliance, appareilList);
      }
    }
    for (let i = 0; i < ustensilSelected.length; i++) {
      ustensilSelected.splice(i);
      if (resultRecipes.length > 0) {
        displayIngredients(UstensilsFiltered, ustensilList);
      } else {
        displayIngredients(allUstensils, ustensilList);
      }
    }
    document.getElementById("btn-" + deleteTag).remove();
  }
});
