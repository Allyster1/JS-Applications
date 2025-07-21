import { render } from "../../node_modules/lit-html/lit-html.js";

const main = document.querySelector("main");

function mainRender(template) {
  render(template, main);
}

export function addRender(ctx, next) {
  ctx.render = mainRender;
  next();
}
