export default function renderNavbar() {
  const nav = document.querySelector("nav");
  nav.innerHTML = `<div class="col-auto">
            <header>
              <ul>
                <li><a href="index.html">HOME</a></li>
                <li><a href="explore.html">LEARN</a></li>
                <li><a href="account.html" target="_blank">ACCOUNT</a></li>
              </ul>
            </header>
          </div>`;
}
