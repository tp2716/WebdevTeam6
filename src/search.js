import renderCards from './cards.js';
import makeCorsRequest from "./request.js";

// make API calls based on user's input ingredients from search panel
// query items (search ingredients) are stored in the format: "ingredient1 ingredient2 ingredient3"
export default function searchRecipe(items) {
    // first check if previous results are stored in user's session cache
    let userCache = window.sessionStorage.getItem(items);
    // make API call
    if (!userCache || userCache.length<=2) { // <=2 since userCache is stringified array
        appendLoading('Loading...');
        makeCorsRequest(items.join(' ')).then((response) => {
            let recipeJson = parseRecipeJson(JSON.stringify(response));
            loadAndRenderCards(recipeJson, items);
        }).catch((error) => {
            appendLoading('Loading Failed');
            console.error(error);
        });
    } else {
        let recipeJson = JSON.parse(userCache);
        loadAndRenderCards(recipeJson, items);
    }
}

// helper for searchRecipe() to filter recipe json retrieved based on Edamam's API format
function parseRecipeJson(stringifiedJson){
    let parsed = JSON.parse(stringifiedJson);
    parsed = parsed.hits;

    // repopulate JSON with only parameters we wanted
    return parsed.map(item => ({
        name: item.recipe.label,
        image: item.recipe.image,
        instruction: item.recipe.url,
        allergy: item.recipe.cautions == null ? 'None' : item.recipe.cautions,
        ingredientLines: item.recipe.ingredientLines,
        ingredients: item.recipe.ingredients.map(ingredient => ingredient.food),
        calories: Math.floor(item.recipe.calories),
        totalTime: item.recipe.totalTime === 0 ? 'Varies' : item.recipe.totalTime + " mins"
        //totalNutrients: item.recipe.totalNutrients,
        //totalDailyNutrients: item.recipe.totalDaily
    }));
}

// helper for searchRecipe() to randomize, display recipe cards
function loadAndRenderCards(recipeJson, items){
    let leftOver;
    [recipeJson, leftOver] = shuffleJson(recipeJson);
    window.sessionStorage.setItem(items, JSON.stringify(leftOver));
    if (document.querySelector('#keep-result').checked) {
        document.querySelector('#cards').innerHTML += renderCards(recipeJson);
        removeLoading();
    } else {
        document.querySelector('#cards').innerHTML = renderCards(recipeJson);
        removeLoading();
    }
}

// helper for loadAndRenderCards() given recipeJson, return 4 shuffled recipes or the number of recipes if less
// leftOver returned to be stored for next time
function shuffleJson(remappedJson) {
    let count = remappedJson.length;
    let shuffled = remappedJson.sort(() => 0.5 - Math.random());
    remappedJson = shuffled.slice(0, count>4?4:count);
    let leftOver = shuffled.slice(count>4?4:count);
    return [remappedJson, leftOver];
}

// displays loading state of searches
function appendLoading(message) {
    document.querySelector('#loading').innerHTML = `${message}`;
}

function removeLoading() {
    document.querySelector('#loading').innerHTML = '';
}