import { html, render } from "./node_modules/lit-html/lit-html.js";

const root = document.getElementById("root");
const form = document.querySelector(".content");
const towns = document.getElementById("towns");
form.addEventListener("submit", onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const data = formData.get("towns");

  const towns = data.split(", ");

  const template = createTemplate(towns);

  e.target.reset();
  render(template, root);
}

function createTemplate(data) {
  return html`
    <ul>
      ${data.map((town) => html`<li>${town}</li>`)}
    </ul>
  `;
}
