import renderNavbar from './navbar.js';

function renderStructure() {
    renderNavbar();
    renderAccount();
}

function renderAccount() {
    document.querySelector('main').innerHTML += `
    <section class="account">
            <h2>My Account</h2>

            <div class="profile">
                <img src="https://cdn.glitch.global/1332c0f6-a6bb-4b31-b54a-e78fc639b9c6/flat%2C750x%2C075%2Cf-pad%2C750x1000%2Cf8f8f8.jpg?v=1700238684341" alt="Profile Picture" class="profile-picture">
                <p><span id="username">Username Placeholder</span></p>
            </div>

            <div class="saved-recipes">
                <h3>Saved Recipes</h3>
                <ul>
                    <li>Bacon Cheeseburger...</li>
                    <li>Fettuccine Alfredo...</li>
                    <li>Fried Rice...</li>
                </ul>
            </div>

            <div class="grocery-list">
                <h3>Create Grocery List</h3>
                <form id="grocery-form" action="#" method="post">
                    <div class="form-group">
                        <label for="grocery-item">Add Item to List</label>
                        <input type="text" id="grocery-item" name="grocery-item" placeholder="E.g., Tomatoes">
                    </div>
                    <button type="submit">Add to List</button>
                </form>
                <ul id="grocery-items"></ul>
            </div>
        </section>`;
}

renderStructure();

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
