import { recipes } from "./recipes.js";

export default class recipesDetail {
  getRecipes() {
    return recipes;
  }
  getIngredient() {
    let ingredients = [
      ...new Set(
        recipes
          .map((recipe) =>
            recipe.ingredients.map((element) => element.ingredient)
          )
          .flat()
      ),
    ];
    return ingredients;
  }
  getAppliance() {
    let appliances = [
      ...new Set(recipes.map((recipe) => recipe.appliance).flat()),
    ];
    return appliances;
  }
  getUstensils() {
    let ustensils = [
      ...new Set(recipes.map((recipe) => recipe.ustensils).flat()),
    ];
    return ustensils;
  }
}
