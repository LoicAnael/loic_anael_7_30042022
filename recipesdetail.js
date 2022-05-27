import { recipes } from "./recipes.js";

export default class recipesdetail {
  getRecipes() {
    return recipes;
  }
  getIngredient() {
    let ingredients = [
      ...recipes.map((recipe) =>
        recipe.ingredients.map((element) => element.ingredient)
      ),
    ];
    return ingredients;
  }
  getAppliance() {
    let appliance = [...recipes.map((recipe) => recipe.appliance)];
    return appliance;
  }
  getUstensils() {
    let ustensils = [...recipes.map((recipe) => recipe.ustensils)];
    return ustensils;
  }
}
