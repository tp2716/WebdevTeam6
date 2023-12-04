import renderCards from './cards.js';
import makeCorsRequest from "./request.js";
import {equalsIgnoreSpace, queryParamsChangeState} from "./handler.js";

// make API calls based on user's input ingredients from search panel
// query items (search ingredients) are stored in the format: "ingredient1,ingredient2,ingredient3"
export default function searchRecipe(searchItems) {
    // first check if previous results are stored in user's session cache
    let userCache = window.sessionStorage.getItem(searchItems);
    // retrieve form change state
    let paramsModified = queryParamsChangeState();
    // make API call
    if (!userCache || userCache.length<=2 || paramsModified) { // <=2 since empty userCache is stringified array
        loadCardsFromQuery(searchItems);
    } else {
        let recipeJson = JSON.parse(userCache);
        loadCardsFromCache(recipeJson, searchItems);
    }
}

// helper to parse and send the query message
function loadCardsFromQuery(searchItems){
    setLoading('Loading...');
    let query = buildQuery(searchItems);
    makeCorsRequest(query)
        .then((response) => (response.json()))
        .then((data) => {
            let recipeJson = parseRecipeJson(JSON.stringify(data));
            loadCardsFromCache(recipeJson, searchItems);
            if (data.hits.length === 0) {
                setLoading('oops, no recipe has been found...');
            }
        }).catch((error) => {
        console.error(error);
    });
}

// helper to build the query message based on search parameters
function buildQuery(searchItems) {
    let query = searchItems.join(' ');
    // search params
    ['skill', 'diet', 'health', 'meal', 'cuisine'].forEach(param => {
        query += buildQueryParams(param);
    });
    let calorieMin = document.getElementById('calorie-min').value;
    let calorieMax = document.getElementById('calorie-max').value;
    query += '&calories=' + calorieMin + '-' + calorieMax;
    return query;
}

// helper to build query message by existing params
function buildQueryParams(param) {
    let query = '';
    const paramsPlaceholder = document.getElementById(param+'-sticky');
    if (!equalsIgnoreSpace(paramsPlaceholder.innerHTML, 'All')) {
        let queryArray = parseParamToArray(param);
        switch(param) {
            case 'skill':
                let max = 99;
                document.querySelectorAll('#'+param+'-sticky'+' .param-text').forEach(option => {
                    if (option.innerHTML === 'simple') {
                        max = 5;
                    }
                    else if (option.innerHTML === 'medium') {
                        max = 10
                    }
                    else if (option.innerHTML === 'difficult') {
                        max = 30;
                    }
                });
                query += '&ingr=0-'+max;
                break;
            case 'diet':
                if (queryArray.length !== 0) {
                    query += '&diet=';
                    query += queryArray.join('&diet=');
                }
                break;
            case 'health':
                if (queryArray.length !== 0) {
                    query += '&health=';
                    query += queryArray.join('&health=');
                }
                break;
            case 'meal':
                if (queryArray.length !== 0) {
                    query += '&meal=';
                    query += queryArray.join('&meal=');
                }
                break;
            case 'cuisine':
                if (queryArray.length !== 0) {
                    query += '&cuisine=';
                    query += queryArray.join('&cuisine=');
                }
                break;
            default:
                console.log('param error: '+param);
        }
    }
    return query;
}

// helper to add all param-sticky content to query as an array
function parseParamToArray(param) {
    let queryArray = [];
    document.querySelectorAll('#'+param+'-sticky'+' .param-text').forEach(function (i) {
        queryArray.push(i.textContent);
    });
    return queryArray;
}

// helper for searchRecipe() to filter recipe json retrieved based on Edamam's API format
function parseRecipeJson(stringifiedJson){
    let parsed = JSON.parse(stringifiedJson);
    parsed = parsed.hits;

    console.log('parsed:'+parsed);

    // repopulate JSON with only parameters we wanted
    return parsed.map(item => ({
        name: item.recipe.label,
        image: item.recipe.image,
        instruction: item.recipe.url,
        cautions: item.recipe.cautions.length === 0 ? 'None' : item.recipe.cautions,
        ingredientLines: item.recipe.ingredientLines,
        ingredients: item.recipe.ingredients.map(ingredient => ingredient.food),
        calories: Math.floor(item.recipe.calories / item.recipe.yield),
        totalTime: item.recipe.totalTime === 0 ? 'None' : item.recipe.totalTime + " mins"
        //totalNutrients: item.recipe.totalNutrients,
        //totalDailyNutrients: item.recipe.totalDaily
    }));
}

// helper for searchRecipe() to randomize, display recipe cards
function loadCardsFromCache(recipeJson, searchItems){
    let leftOver;
    [recipeJson, leftOver] = shuffleJson(recipeJson);
    window.sessionStorage.setItem(searchItems, JSON.stringify(leftOver));
    if (document.querySelector('#keep-result').checked) {
        document.querySelector('#cards').innerHTML += renderCards(recipeJson);
        removeLoading();
    } else {
        document.querySelector('#cards').innerHTML = renderCards(recipeJson);
        removeLoading();
    }
}

// helper for loadCardsFromCache() given recipeJson, return 4 shuffled recipes or the number of recipes if less
// leftOver returned to be stored for next time
function shuffleJson(remappedJson) {
    let count = remappedJson.length;
    let shuffled = remappedJson.sort(() => 0.5 - Math.random());
    remappedJson = shuffled.slice(0, count>4?4:count);
    let leftOver = shuffled.slice(count>4?4:count);
    return [remappedJson, leftOver];
}

// displays loading state of searches
export function setLoading(message) {
    document.querySelector('#loading').innerHTML = `${message}`;
}

function removeLoading() {
    document.querySelector('#loading').innerHTML = '';
}