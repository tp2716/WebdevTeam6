import searchRecipe, {setLoading} from "./search.js";

export default function createAppListeners() {
        createAddButtonListener();
        createRemoveButtonListener();
        createSearchButtonListener();
        createSearchParamListener();
        createDropdownParamsListener();
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
                if (document.querySelector('#fridge-items #' + item)) {
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
            const searchItems = document.querySelector('#search-items');
            if (searchItems) {
                searchItems.innerHTML = '';
            }
        });
    }
}

function createDropdownParamsListener() {
    if (document.readyState !== 'loading') {
        fetch("/WebdevTeam6/src/params.json")
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                Object.keys(data).forEach(paramId => {
                    const sticky = '#'+paramId+'-sticky';
                    data[paramId].forEach(item => {
                        // Create a new li param element
                        const newItem = document.createElement('li');
                        const newA = document.createElement('a');
                        newA.href = "#";
                        newA.textContent = item;
                        newA.classList.add('dropdown-item');
                        newItem.appendChild(newA);

                        const dropdownElement = document.querySelector('#' + paramId);
                        // Append the new option to the dropdown
                        dropdownElement.appendChild(newItem);

                        // Add an event listener for click event on dropdown items
                        newItem.addEventListener('click', function (event) {
                            // disable bootstrap behavior
                            event.preventDefault();
                            event.stopPropagation();
                            appendParamSelections(sticky, item);
                        });
                    });


                });
            });

    }
}

function appendParamSelections(sticky, item) {
    // create param items
    renderParamItem(sticky, item);
}

function renderParamItem(sticky, item){
    if(!document.querySelector(sticky+' #'+item)) {
        handleChange();
        const itemCol = document.createElement('div');
        itemCol.classList.add('col-auto');
        const paramItems = document.querySelector(sticky);
        const newItem = document.createElement('button');
        newItem.classList.add('w-100');
        newItem.classList.add('param-selection');

        // styling item and allowing clicks to trigger addItem
        newItem.setAttribute('href', '#');
        newItem.setAttribute('id', item);
        newItem.innerHTML =
            `<div class="d-flex justify-content-between align-items-center">
                <p class="param-text">${item}</p>
                <i class="bi bi-x delete-param-icon"></i>
            </div>`;

        itemCol.appendChild(newItem);

        if(equalsIgnoreSpace(paramItems.innerHTML, 'All')) {
            paramItems.innerHTML = '';
        }
        paramItems.appendChild(itemCol);
        // a click on search item would remove itself from search panel
        newItem.addEventListener("click", () => removeParamItem(sticky, itemCol), false);
    }
}

function removeParamItem(sticky, itemCol) {
    handleChange();
    const stickyElement = document.querySelector(sticky);
    stickyElement.removeChild(itemCol);
    if(equalsIgnoreSpace(stickyElement.innerHTML, '')) {
        stickyElement.innerHTML = 'All';
    }
}

// Search Item Button
function createSearchButtonListener() {
    if (document.readyState !== 'loading') {
        document.querySelector('#search').addEventListener('click', function (event) {
            event.preventDefault();
            event.stopPropagation();
            const searchItems = document.querySelector('#search-items');
            if (searchItems && searchItems.textContent.trim().length > 0) {
                const searchArray = [];
                document.querySelectorAll('#search-items h4').forEach(function (i) {
                    searchArray.push(i.textContent);
                });
                searchRecipe(searchArray);
            } else {
                // TODO: or randomly recommend dishes, maybe select from a default foodlist.json
                setLoading('no ingredients are put to search');
            }
        });
    }
}

function createSearchParamListener() {
    if (document.readyState !== 'loading') {
        const form = document.getElementById('search-params');
        form.addEventListener('change', handleChange);
    }
}

let paramsModified = true;

// sends params form change state clear cache when user selects new search restrictions
export function queryParamsChangeState() {
    const currentState = paramsModified;
    paramsModified = false; // Reset the state after querying
    console.log('change:'+currentState);
    return currentState;
}

function handleChange() {
    paramsModified = true;
}

export function equalsIgnoreSpace(a, b) {
    return a.replace(/\s+/g, '') === b;
}