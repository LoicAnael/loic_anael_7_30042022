export default class recipesDetail {
  getRecipes(recipes) {
    return recipes;
  }
  getIngredient(recipes) {
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
  getAppliance(recipes) {
    let appliances = [
      ...new Set(recipes.map((recipe) => recipe.appliance).flat()),
    ];
    return appliances;
  }
  getUstensils(recipes) {
    let ustensils = [
      ...new Set(recipes.map((recipe) => recipe.ustensils).flat()),
    ];
    return ustensils;
  }
}
