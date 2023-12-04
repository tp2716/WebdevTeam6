import {setLoading} from './search.js';

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

    saveRecipeListener(recipeJson);

    return `                                                                                                                                                                    <div class="col-10 col-sm-5 col-md-3 col-xl-2 card my-card">
        <div class="ripple my-card" data-mdb-ripple-color="light">
          <a href="${recipeJson.instruction}" target="_blank">
              <div class="mask" style="background-color: rgba(251, 251, 251, 0.15);"></div>
              <img src="${recipeJson.image}" class="card-img-top" alt=""/>
          </a>
        </div>
        <div class="card-body pb-4">
            <h5 class="card-title">${recipeJson.name}</h5>
            ${
                recipeJson.cautions !== "None" && !document.getElementById('hide-cautions').checked ? 
                `<div class=""><p class="card-text-caution">Caution:${recipeJson.cautions.join(", ")}</p></div>` : ""
            }
            <div class="row card-text"><p class=""><b>Ingredients</b>: ${ingredientsText}</p></div>
            <div class="row card-text"><p class=""><b>Calories</b>: ${recipeJson.calories} Kcal</p></div>
            ${
                recipeJson.totalTime !== "None" ?
                `<div class="row card-text"><p class=""><b>Cooktime</b>: ${recipeJson.totalTime}</p></div>` : ""
            }
            <div class="row justify-content-around">
                <div class="col-11 col-lg-6 d-flex justify-content-around"><a href=${recipeJson.instruction} target="_blank" class="w-100 tryit btn">Try</a></div>
                <div class="col-11 col-lg-6 mt-2 mt-lg-0 d-flex justify-content-around"><a href='#' class="w-100 save-recipes btn" id="save-recipe-${(recipeJson.name).replace('/\\s/g','-')}">Save</a></div>
            </div>
        </div>
  </div>`;
}

function saveRecipeListener(recipeJson) {
    const cardPlaceholder = document.getElementById('cards');

    cardPlaceholder.addEventListener("click", function (event) {

        if (event.target.id === "save-recipe-"+(recipeJson.name).replace('/\\s/g','-')) {
            event.preventDefault();
            // parse and save to recipeCache
            const recipe = {
                name: recipeJson.name,
                source: recipeJson.instruction,
                cooktime: recipeJson.totalTime.replace(' mins', ''),
                preptime: 0,
                calories: recipeJson.calories,
                comments: '',
                cautions: recipeJson.cautions,
                ingredients: recipeJson.ingredientLines,
                instructions: ''
            };
            saveToLocalStorage(recipe);
            setLoading('recipe saved!');
            // refresh account upon click
            window.localStorage.setItem('refresh', 'true');
        }
    });
}

export function saveToLocalStorage(recipe) {
    let recipeCache = window.localStorage.getItem('recipeCache');

    if (recipeCache === null || recipeCache.length <= 2) {
        window.localStorage.setItem('recipeCache', '[]');
    }
    recipeCache = JSON.parse(window.localStorage.getItem('recipeCache'));
    if (!recipeCache.some(item => item.name === recipe.name)) {
        console.log('local: '+recipeCache);
        console.log(recipe);
        recipeCache.push(recipe);
        window.localStorage.setItem('recipeCache', JSON.stringify(recipeCache));
    }
}