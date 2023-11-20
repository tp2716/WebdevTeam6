export default function renderNavbar() {
  const nav = document.querySelector("nav");
  nav.innerHTML += 
    `<div class="col-md-4"></div>
          <div class="col-md-4">
            <header>
              <ul>
                <li><a href="index.html">HOME</a></li>
                <li><a href="explore.html">LEARN</a></li>
                <li><a href="account.html">ACCOUNT</a></li>
              </ul>
            </header>
          </div>`;
}
