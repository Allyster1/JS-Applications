import { loadTemplate, renderTemplate } from "./render.js";

document
  .getElementById("home-link")
  .addEventListener("click", onClick.bind(null, "home"));
document
  .getElementById("catalog-link")
  .addEventListener("click", onClick.bind(null, "catalog"));
document
  .getElementById("about-link")
  .addEventListener("click", onClick.bind(null, "about"));

// show("home");

function onClick(templateName, e) {
  e.preventDefault();
  show(templateName);
}

async function show(id) {
  // render(id, document.querySelector("main"));
}

async function start() {
  const res = await fetch("http://localhost:3030/data/movies");
  const data = await res.json();

  const template = await loadTemplate("movie");

  const content = data.map((m) => renderTemplate(template, m)).join("\n");

  document.querySelector("ul").innerHTML = content;
}
start();
