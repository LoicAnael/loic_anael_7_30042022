import { recipes } from "./recipes.js";

export default class recipesdetail {
  getRecipes() {
    console.log(recipes);
    return recipes;
  }
  getIngredient() {
    let ingredients = [
      ...recipes.map((recipe) =>
        recipe.ingredients.map((element) => element.ingredient)
      ),
    ];
    console.log(ingredients);
    return ingredients;
  }
  getAppliance() {
    let appliance = [...recipes.map((recipe) => recipe.appliance)];
    console.log(appliance);
    return appliance;
  }
  getUstensils() {
    let ustensils = [...recipes.map((recipe) => recipe.ustensils)];
    console.log(ustensils);
    return ustensils;
  }
}
