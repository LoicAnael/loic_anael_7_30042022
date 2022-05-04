import recipesDetail from "./recipesdetail.js";
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

function displayRecipes(recipes, inputValue) {
  recipes.forEach((recipe) => {
    if (inputValue == null || inputValue == undefined || inputValue == "") {
      let recipeTemplate = `
           <article class="card">
            <img src="./assets/img.png" alt="recipe-image" class="card-image">
            <div class="card-details">
                <div class="card-details__timing">
                    <div class="card-details__timing--title">
                        ${recipe.name}
                    </div>
                    <div class="card-details__timing--time">
                        <i class="far fa-clock recipes__icon"></i>
                        <div class="recipes__time_value">
                            ${recipe.time} min
                        </div>
                    </div>
                </div>
                <div class="card-details__description">
                    <div class="card-details__description--left">
                            ${recipe.ingredients
                              .map(
                                (a) => `
                            <div for="ingredient" class="recipes__ingredient">
                                <p class="recipes__ingredient_name">
                                ${a.ingredient} : 
                            </p>
                            <p class="recipes__ingredient_value">
                                ${a.quantity} ${a.unit}
                            </p>
                            </div>
                            `
                              )
                              .join("")}
                    </div>
                    <div class="card-details__description--right">
                        ${recipe.description}
                    </div>
                </div>
            </div>
            </article>`;
      recipesList.innerHTML += recipeTemplate;
    }
  });
}
displayRecipes(allRecipes, inputValue);
