import recipesDetail from "./recipesdetail.js";
import RecipeCard from "./cardFactory.js";
let allRecipes = new recipesDetail().getRecipes();
let allIngredient = new recipesDetail().getIngredient();
let allAppliance = new recipesDetail().getAppliance();
let allUstensils = new recipesDetail().getUstensils();
let recipesList = document.getElementById("recipes");
let input = document.querySelector(".search-input");
let filterResultArray = [];
let resultRecipes = [];

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

function displayRecipesByTags(filterResultArray) {
  if (filterResultArray.length > 0) {
    recipesList.innerHTML = "";
    for (let i = 0; i < allRecipes.length; i++) {
      allRecipes[i].ingredients.map((a) => {
        a.unit == undefined ? (a.unit = "") : a.unit;
        a.quantity == undefined ? (a.quantity = "") : a.quantity;
      });
      for (let u = 0; u < filterResultArray.length; u++) {
        if (
          allRecipes[i].appliance.includes(filterResultArray[u]) ||
          allRecipes[i].ustensils.some(
            (item) =>
              item.includes(filterResultArray[u]) ||
              allRecipes[i].ingredients.some((item) =>
                item.ingredient.includes(filterResultArray[u])
              )
          )
        ) {
          let recipeTemplate = new RecipeCard().recipeCard(allRecipes[i]);
          recipesList.innerHTML += recipeTemplate;
        }
      }
    }
  }
}
displayRecipesByTags(filterResultArray);

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
      }
    }
  } else {
    resultRecipes = allRecipes;
  }
  displayRecipes(resultRecipes);
  if (filterResultArray.length > 0 && inputLength == 0) {
    displayRecipesByTags(filterResultArray);
  }
});

///////////////////////////////////////////////////////filter buttons event///////////////////////////////////////////////////////

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
  if (ingredientSelected.length > 0) {
    displayIngredients(ingredientSelected, ingredientList);
  } else {
    displayIngredients(allIngredient, ingredientList);
  }
});
////display appliances filters items/////
appareilButton.addEventListener("click", () => {
  openFilter(appareilButton, appareilDropdown);
  if (appareilSelected.length > 0) {
    displayIngredients(appareilSelected, appareilList);
  } else {
    displayIngredients(allAppliance, appareilList);
  }
});
////display ustensiles filters items/////
ustensilButton.addEventListener("click", () => {
  openFilter(ustensilButton, ustensilDropdown);
  if (ustensilSelected.length > 0) {
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
      ingredientSelected.push(value);
      displayIngredients(ingredientSelected, ingredientList);
    }
    if (type == "appareil-dropdown") {
      color = "btn-2";
      appareilSelected.push(value);
      displayIngredients(appareilSelected, appareilList);
    }
    if (type == "ustensil-dropdown") {
      color = "btn-3";
      ustensilSelected.push(value);
      displayIngredients(ustensilSelected, ustensilList);
    }
    let resultTemplate = `<div class="item ${color}" id="btn-${value}"><span>${value}</span><i class="far fa-times-circle close" data-value="${value}"></i></div>`;
    filterResult.innerHTML += resultTemplate;
    filterResultArray.push(value);
    displayRecipesByTags(filterResultArray);
    console.log(filterResultArray);
  }
  /////////suppression des elements de filtres selectiones////////
  let deleteTag = e.target.dataset.value;
  if (deleteTag !== undefined) {
    for (let i = 0; i < filterResultArray.length; i++) {
      if (filterResultArray[i] === deleteTag) {
        filterResultArray.splice(i);
      }
      if (filterResultArray.length > 0) {
        displayRecipesByTags(filterResultArray);
      } else if (resultRecipes.length > 0) {
        displayRecipes(resultRecipes);
      } else {
        displayRecipes(allRecipes);
      }
    }

    for (let i = 0; i < ingredientSelected.length; i++) {
      ingredientSelected.splice(i);
      displayIngredients(allIngredient, ingredientList);
    }
    for (let i = 0; i < appareilSelected.length; i++) {
      appareilSelected.splice(i);
      displayIngredients(allAppliance, appareilList);
    }
    for (let i = 0; i < ustensilSelected.length; i++) {
      ustensilSelected.splice(i);
      displayIngredients(allUstensils, ustensilList);
    }
    document.getElementById("btn-" + deleteTag).remove();
  }
});
