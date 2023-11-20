import addSearchItem, {removeSearchItem, searchRecipe} from "./src/search.js";

document.addEventListener('DOMContentLoaded', function() {
    var form = document.querySelector('form');
    var input = document.querySelector('input[type="text"]');
    var leftPanel = document.getElementById('left-panel');

    // Add Item
    document.querySelector('#add').addEventListener('click', function(event) {
        event.preventDefault(); // Prevent the form from submitting normally
        var item = input.value;

        if (item) {
            if(document.querySelector('#'+item)) {
                alert(`Can't add duplicate items!`);
            } else {
                var fridgeItems = document.querySelector('#fridge-items');
                var itemCol = document.createElement('div');
                itemCol.classList.add('fridge-item', 'col-auto', 'col-md-5', 'mt-1', 'mb-1');
                var newItem = document.createElement('button');
                newItem.classList.add('w-100');

                // styling item and allowing clicks to trigger addSearchItem
                newItem.setAttribute('href', '#');
                newItem.setAttribute('id', item)
                newItem.addEventListener("click", () => addSearchItem(item), false);
                newItem.innerHTML = `<h4>${item}</h4>`;

                itemCol.appendChild(newItem);
                fridgeItems.appendChild(itemCol);
                input.value = ''; // Clear the input field
            }
        }
    });

    // Remove Item
    document.querySelector('#remove-all').addEventListener('click', function(event) {
        event.preventDefault();

        var fridgeItems = document.querySelector('#fridge-items');
        if (fridgeItems) {
            fridgeItems.innerHTML = '';
        }
    });

    document.querySelector('#search').addEventListener('click', function(event) {
        event.preventDefault();

        var searchItems = document.querySelector('#search-items');
        if(searchItems) {
            var searchArray = [];
            document.querySelectorAll('#search-items h4').forEach(function(i) {
                searchArray.push(i.textContent);
            });
            searchRecipe(searchArray);
        } else {
            // TODO: or randomly recommend dishes, maybe select from a default foodlist.json
            alert('no ingredients are put to search');
        }
    });
});