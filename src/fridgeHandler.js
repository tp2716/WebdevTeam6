import searchRecipe from "./search.js";

export default function createFridgeListener() {
        createAddButtonListener();
        createRemoveButtonListener();
        createSearchButtonListener();
}

// Add Item Button
function createAddButtonListener() {
    // DOM is not yet fully loaded at this moment but the static elements we need are rendered
    if (document.readyState !== 'loading') {
        document.querySelector('#add').addEventListener('click', function (event) {
            event.preventDefault(); // Prevent the form from submitting normally
            const input = document.querySelector('input[type="text"]');
            const item = input.value;
            if (item) {
                if (document.querySelector('#' + item)) {
                    alert(`Can't add duplicate items!`);
                } else {
                    renderFridgeItem(item);
                    input.value = ''; // Clear the input field
                }
            }
        });
    }
}

function renderFridgeItem(item) {
    const fridgeItems = document.querySelector('#fridge-items');
    const itemCol = document.createElement('div');
    itemCol.classList.add('fridge-item', 'col-auto', 'col-md-5', 'mt-1', 'mb-1');
    const newItem = document.createElement('button');
    newItem.classList.add('w-100');

    // a click on fridge item would add it to search panel
    newItem.setAttribute('href', '#');
    newItem.setAttribute('id', item)
    newItem.addEventListener("click", () => renderSearchItem(item), false);
    newItem.innerHTML = `<div class="d-flex justify-content-between align-items-center">
                            <h4>${item}</h4>
                            <i class="bi bi-plus-circle"></i>
                         </div>`;

    itemCol.appendChild(newItem);
    fridgeItems.appendChild(itemCol);
}

function renderSearchItem(item) {
    if(!document.querySelector('#search-items #'+item)) {
        const searchItems = document.querySelector('#search-items');
        const itemCol = document.createElement('div');
        itemCol.classList.add('search-item', 'col-auto', 'col-md-5', 'mt-1', 'mb-1');
        const newItem = document.createElement('button');
        newItem.classList.add('w-100');

        // styling item and allowing clicks to trigger addItem
        newItem.setAttribute('href', '#');
        newItem.setAttribute('id', item);
        newItem.innerHTML =
            `<div class="d-flex justify-content-between align-items-center">
            <h4>${item}</h4>
            <i class="bi bi-dash-circle"></i>
        </div>`;

        itemCol.appendChild(newItem);
        searchItems.appendChild(itemCol);
        // a click on search item would remove itself from search panel
        newItem.addEventListener("click", () => removeSearchItem(itemCol), false);
    }
}

function removeSearchItem(itemCol) {
    const searchItems = document.querySelector('#search-items');
    searchItems.removeChild(itemCol);
}

// Remove Item Button
function createRemoveButtonListener() {
    if (document.readyState !== 'loading') {
        document.querySelector('#remove-all').addEventListener('click', function (event) {
            event.preventDefault();
            const fridgeItems = document.querySelector('#fridge-items');
            if (fridgeItems) {
                fridgeItems.innerHTML = '';
            }
        });
    }
}

// Search Item Button
function createSearchButtonListener() {
    if (document.readyState !== 'loading') {
        document.querySelector('#search').addEventListener('click', function (event) {
            event.preventDefault();
            const searchItems = document.querySelector('#search-items');
            if (searchItems && searchItems.textContent.trim().length > 0) {
                const searchArray = [];
                document.querySelectorAll('#search-items h4').forEach(function (i) {
                    searchArray.push(i.textContent);
                });
                searchRecipe(searchArray);
            } else {
                // TODO: or randomly recommend dishes, maybe select from a default foodlist.json
                alert('no ingredients are put to search');
            }
        });
    }
}