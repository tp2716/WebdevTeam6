import renderNavbar from "/src/Navbar.js";
import renderVideos, { renderVideo } from "/src/Videos.js";


fetch("/src/techniques.json")
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    // console.log(data);
    // render HTML here
    renderNavbar();
    
    const section = document.getElementById("body");
    section.innerHTML += renderVideos(data.videos);
  });



