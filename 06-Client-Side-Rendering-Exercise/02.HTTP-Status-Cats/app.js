import { html, render } from "./node_modules/lit-html/lit-html.js";
import { cats } from "./catSeeder.js";

const root = document.getElementById("allCats");

render(createTemplate(), root);

function createTemplate() {
  return html`
    <ul>
      ${cats.map((cat) => html`<li>${createCatTemplate(cat)}</li>`)}
    </ul>
  `;
}

function createCatTemplate(cat) {
  return html` <img
      src="./images/${cat.imageLocation}.jpg"
      width="250"
      height="250"
      alt="Card image cap"
    />
    <div class="info">
      <button class="showBtn" @click=${toggle}>Show status code</button>
      <div class="status" style="display: none" id="100">
        <h4 class="card-title">Status Code: ${cat.statusCode}</h4>
        <p class="card-text">${cat.statusMessage}</p>
      </div>
    </div>`;
}

function toggle(event) {
  const statusDiv = event.target.nextElementSibling;
  const isHidden = statusDiv.style.display === "none";

  statusDiv.style.display = isHidden ? "block" : "none";
  event.target.textContent = isHidden ? "Hide status code" : "Show status code";
}
