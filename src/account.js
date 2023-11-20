import renderNavbar from '/WebdevTeam6/src/navbar.js';

renderNavbar();

//grocery list
document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('grocery-form');
    const input = document.getElementById('grocery-item');
    const list = document.getElementById('grocery-items');

    form.addEventListener('submit', function (event) {
        event.preventDefault();

        const newItemText = input.value.trim();

        if (newItemText !== '') {
            const newItem = document.createElement('li');
            newItem.textContent = newItemText;

            list.appendChild(newItem);

            // Clear the input field after adding the item
            input.value = '';
        }
    });
});
