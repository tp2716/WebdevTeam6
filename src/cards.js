export default function renderCards(recipeJson) {
    return `${recipeJson.map((r) => renderCard(r)).join("")}`;
}

export function renderCard(recipeJson) {
  let ingredientsText;
  if (recipeJson.ingredients.length <= 6) {
      ingredientsText = recipeJson.ingredients.join(', ');
  } else {
      ingredientsText = recipeJson.ingredients.slice(0, 6).join(', ') + ',...';
  }

  return `<div class="col-auto col-sm-5 col-md-3 col-xl-2 card my-card">
      <div class="ripple my-card" data-mdb-ripple-color="light">

        <a href="${recipeJson.instruction}" target="_blank">
            <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
            <img src="${recipeJson.image}" class="card-img-top" alt=""/>
        </a>
      </div>
      <div class="card-body">
        <h5 class="card-title">${recipeJson.name}</h5>
        <p class="card-text">Ingredients: ${ingredientsText}</p>
        <p class="card-text">Calories: ${recipeJson.calories} cal</p>
        <p class="card-text">Cooktime: ${recipeJson.totalTime}</p>
        <a href=${recipeJson.instruction} target="_blank" class="tryit btn col-auto col-sm-4 col-md-6">Try</a>
      </div>
  </div>`;
}
