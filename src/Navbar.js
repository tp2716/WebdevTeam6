export default function renderNavbar() {
  const nav = document.querySelector("nav");
  nav.innerHTML += 
    `<div class="col-md-4"></div>
          <div class="col-md-4">
            <header>
              <ul>
                <li><a href="index.html#about">HOME</a></li>
                <li><a href="explore.html">LEARN</a></li>
                <li><a href="index.html#projects">ACCOUNT</a></li>
              </ul>
            </header>
          </div>`;
}
