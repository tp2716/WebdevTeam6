export default function renderNavbar() {
  const nav = document.querySelector("nav");
  console.log(nav);
  nav.innerHTML += `<div class="col-auto">
            <header>
              <ul>
                <li><a href="index.html">HOME</a></li>
                <li><a href="explore.html">LEARN</a></li>
                <li><a href="account.html">ACCOUNT</a></li>
              </ul>
            </header>
          </div>`;
}
