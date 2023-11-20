import renderCards, {renderCard} from '/src/cards.js';

export default function addSearchItem(item) {
    if(!document.querySelector('#search-items #'+item)) {
        var searchItems = document.querySelector('#search-items');
        var itemCol = document.createElement('div');
        itemCol.classList.add('search-item', 'col-auto', 'col-md-5', 'mt-1', 'mb-1');
        var newItem = document.createElement('button');
        newItem.classList.add('w-100');

        // styling item and allowing clicks to trigger addItem
        newItem.setAttribute('href', '#');
        newItem.setAttribute('id', item);
        newItem.innerHTML =
        `<div class="d-flex justify-content-between align-items-center">
            <h4>${item}</h4>
            <i class="bi bi-dash-circle-dotted"></i>
        </div>`;

        itemCol.appendChild(newItem);
        searchItems.appendChild(itemCol);
        newItem.addEventListener("click", () => removeSearchItem(itemCol), false);
    }
}

export function removeSearchItem(itemCol) {
    var searchItems = document.querySelector('#search-items');
    searchItems.removeChild(itemCol);
}

// make API calls based on user's input ingredients from search panel
// query items (search ingredients) are stored in the format: "ingredient ingredient ingredient"
export function searchRecipe(items) {
    // first check if previous results are stored in user's local cache
    let userCache = window.localStorage.getItem(items);
    if (userCache) {
        if (document.querySelector('#keep-result').checked) {
            document.querySelector('#cards').innerHTML += renderCards(shuffleJson(JSON.parse(userCache)));
        } else {
            document.querySelector('#cards').innerHTML = renderCards(shuffleJson(JSON.parse(userCache)));
        }
    } else {
        // make API call
        makeCorsRequest(items.join(' ')).then((response) => {
            let recipeJson = parseRecipeJson(JSON.stringify(response));
            window.localStorage.setItem(items, JSON.stringify(recipeJson));
            if (document.querySelector('#keep-result').checked) {
                document.querySelector('#cards').innerHTML += renderCards(shuffleJson(recipeJson));
            } else {
                document.querySelector('#cards').innerHTML = renderCards(shuffleJson(recipeJson));
            }
        }).catch((error) => {
            document.querySelector('#cards').innerHTML = 'Loading Failed';
            console.error(error);
        });
    }
}

// helper to filter json
function parseRecipeJson(stringifiedJson){
    let parsed = JSON.parse(stringifiedJson);
    parsed = parsed.hits;

    // repopulate JSON with only parameters we wanted
    const remappedJson = parsed.map(item => ({
        name: item.recipe.label,
        image: item.recipe.image,
        instruction: item.recipe.url,
        allergy: item.recipe.cautions == null ? 'None' : item.recipe.cautions,
        ingredientLines: item.recipe.ingredientLines,
        ingredients: item.recipe.ingredients.map(ingredient => ingredient.food),
        calories: Math.floor(item.recipe.calories),
        totalTime: item.recipe.totalTime == 0 ? 'Varies' : item.recipe.totalTime+" mins"
        //totalNutrients: item.recipe.totalNutrients,
        //totalDailyNutrients: item.recipe.totalDaily
    }));

    return remappedJson;
}

// given recipeJson, return 4 shuffled recipes or the number of recipes if less
function shuffleJson(remappedJson) {
    let count = remappedJson.length;
    let shuffled = remappedJson.sort(() => 0.5 - Math.random());
    remappedJson = shuffled.slice(0, count>4?4:count);
    return remappedJson;
}

// Make the actual CORS request.
function makeCorsRequest(query) {
  document.querySelector('#cards').innerHTML = 'Loading...';

  return new Promise((resolve, reject) => {
    var url = 'https://api.edamam.com/api/recipes/v2?type=any&app_id=47a14aa1&app_key=5f6e4fae1531f227d8a74ee073ef6c6f&q=' + query;

    var xhr = createCORSRequest('GET', url);
    if (!xhr) {
        reject('CORS not supported');
        return;
    }

    // Response handlers.
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
        } else {
            reject('Request failed with status: ' + xhr.status);
        }
    };

    xhr.onerror = function() {
        reject('Network error');
    };

    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(query);
  });
}

// Create the XHR object.
function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    return xhr;
}