import renderNavbar from "./navbar.js";
import {saveToLocalStorage} from "./cards.js";

renderNavbar();

window.addEventListener('storage', function(event) {
    if (event.key === 'refresh' && event.newValue === 'true') {
        // Refresh the page
        location.reload();

        // Reset the value
        localStorage.setItem('refresh', 'false');
    }
});

fetch("/WebdevTeam6/recipes/tabatkins.json")
    .then((response) => {
        return response.json();
    })
    .then((recipes) => {
        renderSavedRecipes();

        const savedRecipesList = document.querySelector(".saved-recipes ul");

        savedRecipesList.addEventListener("click", function (event) {
            if (event.target.tagName === "LI") {
                // Get the clicked recipe name
                const clickedRecipeName = event.target.textContent;

                // Find the corresponding recipe in the recipes data
                const clickedRecipe = Object.values(recipes).find(
                    (recipe) => recipe.name === clickedRecipeName
                );

                const recipeCache = JSON.parse(window.localStorage.getItem('recipeCache'));

                // Render the details for the clicked recipe
                if (clickedRecipe) {
                    renderRecipeDetails(clickedRecipe);
                } else if (recipeCache !== null && recipeCache.length !== 2) {
                    const clickedRecipe = Object.values(recipeCache).find(
                        (item) => item.name === clickedRecipeName
                    );
                    renderRecipeDetails(clickedRecipe);
                }
            }
        });

        function renderSavedRecipes() {
            const recipeCache = JSON.parse(window.localStorage.getItem('recipeCache'));
            if (recipeCache !== null && recipeCache.length !== 2) {
                recipeCache.forEach(item => {
                    const savedRecipesList = document.querySelector(".saved-recipes ul");
                    const savedRecipeItem = document.createElement("li");
                    savedRecipeItem.textContent = item.name;
                    savedRecipesList.appendChild(savedRecipeItem);
                });
            }
        }

        function searchRecipes(query, maxResults = 5) {
            const searchResults = document.getElementById("search-results-list");
            const savedRecipesList = document.querySelector(".saved-recipes ul");
            const recipeDetailsContent = document.getElementById(
                "recipe-details-content"
            );

            // Clear search results if the query is empty
            if (query.trim() === "") {
                searchResults.innerHTML = "";
                return;
            }
            // Clear previous search results
            searchResults.innerHTML = "";

            // Counter to keep track of displayed results
            let resultsCount = 0;

            // Iterate through recipes
            for (const recipeId in recipes) {
                const recipe = recipes[recipeId];

                // Check if the recipe name contains the search query
                if (
                    resultsCount < maxResults &&
                    recipe.name.toLowerCase().includes(query.toLowerCase())
                ) {
                    // Add the recipe to the search results
                    const listItem = document.createElement("li");
                    listItem.textContent = recipe.name;

                    // Add click event to add the recipe to the saved recipes list
                    listItem.addEventListener("click", () => {
                        const savedRecipeItem = document.createElement("li");
                        savedRecipeItem.textContent = recipe.name;
                        const savedRecipes = document.querySelectorAll(".saved-recipes ul li");
                        const matches = Array.from(savedRecipes).filter(li =>
                            li.textContent.includes(savedRecipeItem.textContent));
                        if (matches.length === 0) {
                            savedRecipesList.appendChild(savedRecipeItem);
                            saveToLocalStorage(recipe);
                        }
                    });

                    searchResults.appendChild(listItem);
                    resultsCount++;
                }
            }
        }

        function renderRecipeDetails(recipe) {
            const recipeDetailsContent = document.getElementById(
                "recipe-details-content"
            );

            recipeDetailsContent.innerHTML = `
                <h3>${recipe.name}</h3>
                <p>Source: ${recipe.source}</p>
                ${ recipe.cooktime&& recipe.cooktime !== '0' && recipe.cooktime !== 'None' ?
                    `<p>Cook Time: ${recipe.cooktime} minutes</p>` : ''
                }
                ${ recipe.preptime && recipe.preptime !== '0' ?
                    `<p>Prep Time: ${recipe.preptime} minutes</p>` : ''
                }
                ${ recipe.calories && recipe.calories !== '0' ?
                    `<p>Calories: ${recipe.calories} Kcal</p>` : ''
                }
                ${ recipe.cautions && recipe.cautions !== '' ?
                    `<p>Cautions: ${recipe.cautions}</p>` : ''
                }
                ${ recipe.comments !== null && recipe.comments !== '' ?
                    `<p>Comments: ${recipe.comments}</p>` : ''
                }
            
                <!-- Add more details as needed -->
                <h4>Ingredients:</h4>
                <ul>
                  ${recipe.ingredients
                .map((ingredient) => `<li>${ingredient.replace(/\r|\n|<hr>/g, '')}</li>`)
                .join("")}
                </ul>
                ${recipe.instructions !== null && recipe.instructions !== '' ?
                    `<h4>Instructions:</h4>
                    <p>${recipe.instructions}</p>` : ''
                }`;
        }

        // Example: Trigger the search function when user types in the search bar
        const searchBar = document.getElementById("search-bar");
        searchBar.addEventListener("input", function () {
            const query = this.value.trim();
            searchRecipes(query);
        });

    });

//grocery list
document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("grocery-form");
    const input = document.getElementById("grocery-item");
    const list = document.getElementById("grocery-items");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const newItemText = input.value.trim();

        if (newItemText !== "") {
            const newItem = document.createElement("li");
            newItem.textContent = newItemText;

            list.appendChild(newItem);

            // Clear the input field after adding the item
            input.value = "";
        }
    });
});