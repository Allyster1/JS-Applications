import { render } from "../../node_modules/lit-html/lit-html.js";

const main = document.getElementById("main-content");

function mainRender(template) {
  render(template, main);
}

export function addRender(ctx, next) {
  ctx.render = mainRender;
  next();
}
