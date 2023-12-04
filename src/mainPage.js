import renderNavbar from "./navbar.js";
import createAppListeners from "./handler.js";

function renderStructure() {
    renderNavbar();
    renderMainPage();
    renderSearchPanel();
    createAppListeners();
}

function renderMainPage() {
    document.querySelector('main').innerHTML += `
        <div class="home-panel container-fluid d-flex align-items-center justify-content-center">
          <div class="row w-100">
            <div class="left-panel col-md-6 pb-3 border-end">
              <h2>Your Fridge Items:</h2>
              <div class="row mt-3 mb-3" id="fridge-items"></div>
              <form class="form-row" action="" id="fridge-form">
                <div class="row">
                  <div class="col-12 col-md-5">
                    <label>
                      <input type="text" class="form-control" placeholder="Fridge Items Here: ">
                    </label>
                  </div>
                  <div class="col-12 col-md-auto mt-3 mt-md-0">
                    <button type="submit" class="add me-1" id="add">Add</button>
                    <button type="submit" class="remove-all" id="remove-all">Remove All</button>
                  </div>
                </div>
              </form>
            </div>
            <div class="right-panel col-md-6 pb-3 border-end">
              <h2>Searching With:</h2>
              <div class="row mt-3 mb-3" id="search-items"></div>
            </div>
          </div>
      </div>

      <div class="container-fluid d-flex align-items-center justify-content-center">
        <div class="row w-100" id="search-panel">
        </div>
      </div>
      
      <div class="container-fluid justify-content-center pt-5" id="pre">
        <div class="col-12 d-flex justify-content-center">
          <hr class="col-12 col-md-12 pe-5 mb-3">
        </div>
        <p class='text-center' id='loading'></p>
        <div class="row justify-content-center" id="cards">
        
        </div>
        <p id="bottom"></p>
      </div>`
}

function renderSearchPanel(){
    document.querySelector('#search-panel').innerHTML = `
    <div class="container mt-3 mb-1 border-end" id="search-params">
        
    <form>
        <h2>Search Params:</h2>
        
        <div class="row search-params-line mt-2">
            <div class="col-md-10 col-lg-4">
                <div class="dropdown" id="cuisine-toggle">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Cuisine
                    </button>
                    <ul class="dropdown-menu" id="cuisine">
                    </ul>
                </div>
                <div class="sticky-top bg-white rounded border pt-2 pb-2 pe-3 ps-3 d-flex justify-content-start flex-wrap" id="cuisine-sticky">
                    All
                </div>
            </div>
            <div class="col-md-10 col-lg-4">
                <div class="dropdown" id="meal-toggle">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Meal
                    </button>
                    <ul class="dropdown-menu" id="meal">
                    </ul>
                </div>
                <div class="sticky-top bg-white rounded border pt-2 pb-2 pe-3 ps-3 d-flex justify-content-start flex-wrap" id="meal-sticky">
                    All
                </div>
            </div>
            <div class="col-md-10 col-lg-4">
                <div class="dropdown" id="skill-toggle">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Difficulty
                    </button>
                    <ul class="dropdown-menu" id="skill">
                    </ul>
                </div>
                <div class="sticky-top bg-white rounded border pt-2 pb-2 pe-3 ps-3 d-flex justify-content-start flex-wrap" id="skill-sticky">
                    All
                </div>
            </div>
        </div>

        <div class="row search-params-line mt-2 mb-2">
            <div class="col-md-10 col-lg-4">
                <div class="dropdown" id="diet-toggle">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                      Diet
                    </button>
                    <ul class="dropdown-menu" id="diet">
                    </ul>
                </div>
                <div class="sticky-top bg-white rounded border pt-2 pb-2 pe-3 ps-3 d-flex justify-content-start flex-wrap" id="diet-sticky">
                    All
                </div>
            </div>
            <div class="col-md-10 col-lg-4">
                <div class="dropdown" id="health-toggle">
                    <button class="btn btn-light dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false"">
                      Health Concerns
                    </button>
                    <ul class="dropdown-menu" id="health">
                    </ul>
                </div>
                <div class="sticky-top bg-white rounded border pt-2 pb-2 pe-3 ps-3 d-flex justify-content-start flex-wrap" id="health-sticky">
                    All
                </div>
            </div>

            <div class="col-md-10 col-lg-2 mt-3">
                <input class="form-check-input" type="checkbox" id="keep-result"/>
                <label class="form-check-label" for="keep-result">Keep result</label>
            </div>
            <div class="col-md-10 col-lg-2 mt-3">
                <input class="form-check-input" type="checkbox" id="hide-cautions"/>
                <label class="form-check-label" for="hide-cautions">Hide Cautions</label>
            </div>
        </div>
        <div class="row search-params-line mt-3 mb-5">
            <div class="col-md-10 col-lg-2">
                <label for="calorie-min">Calories (Min Kcal):</label>
                <input type="number" id="calorie-min"class="form-control" value="0">
            </div>
            <div class="col-md-10 col-lg-2">
                <label for="calorie-max">Calories (Max Kcal):</label>
                <input type="number" id="calorie-max" class="form-control" value="3000">
            </div>
        </div>
        <div class="d-flex mt-3">
            <button type="submit" href="#" class="btn btn-primary me-1 search" id="search">Search</button>
        </div>
        </form>
    </div>`;
}

renderStructure();
