import renderNavbar from "./navbar.js";
import createFridgeListener from "./fridgeHandler.js";

function renderStructure() {
    renderNavbar();
    renderMainPage();
    createFridgeListener();
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
                  <div class="col-12 col-md-auto">
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
        <div class="row w-100">
            <div class="search-panel col-md-6 border-end">
              <h2>Search Params:</h2>
              <div class="row mt-1 mb-1" id="search-params">
                <div class="col-auto col-md-4">
                  <input class="form-check-input" type="checkbox" id="keep-result"/>
                  <label class="form-check-label" for="keep-result">keep result</label>
                </div>
                <div class="col-auto col-sm-6 col-md-5 col-lg-6">
                  <!--<input class="form-check-input" type="checkbox" id=""></input>-->
                  <label class="form-check-label">TODO: implement search restrictions</label>
                </div>
              </div>
            </div>
            <div class="search-params-panel col-md-6 border-end d-flex align-items-center">
              <button type="submit" href="index.html/#bottom" class="btn btn-primary me-1" id="search">Search</button>
            </div>
        </div>
      </div>

      <div class="container-fluid justify-content-center pt-5" id="pre">
        <div class="col-12 d-flex justify-content-center">
          <hr class="col-12 col-md-12 pe-5 mb-3">
        </div>
        <p class='text-center' id='loading'></p>
        <div class="row justify-content-center" id="cards">

        </div>
        <p class="bottom"></p>
      </div>`
}

renderStructure();