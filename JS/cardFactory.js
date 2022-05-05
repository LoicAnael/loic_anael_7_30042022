export default class RecipeCard {
  recipeCard(recipe) {
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
    return recipeTemplate;
  }
}
