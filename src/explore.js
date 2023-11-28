import renderNavbar from "./navbar.js";
import renderVideos, { renderVideo } from "./videos.js";

function renderStructure() {
    const content = document.querySelector("main");
    content.classList.add('container', 'text-center');
    content.innerHTML += `<div id = "content"><div class="row" id = "body"></div></div>`;
}

function renderExplore() {
    const content = document.querySelector("#body");
    content.innerHTML +=
        `<div class="col-md-12">
            <div>
                <h1>Anyone can cook!</h1>
                <p>
                  To get you started, we've compiled a set of videos of basic
                  cooking techniques and skills
                </p>
            </div>
        </div>`;
}

fetch("/WebdevTeam6/src/techniques.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // console.log(data);
      // render HTML here
      renderStructure();
      renderNavbar();
      renderExplore();
      document.querySelector('#body').innerHTML += renderVideos(data.videos);
});

