import renderNavbar from "/WebdevTeam6/src/navbar.js";
import renderVideos, { renderVideo } from "/WebdevTeam6/src/videos.js";

function renderStructure() {
     var content = document.querySelector("#content");
     content.classList.add('container', 'text-center');
     content.innerHTML +=
        `<div class="row" id = "body"></div>`;
}

function renderExplore() {
    var content = document.querySelector("#body");
    console.log(content);
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

