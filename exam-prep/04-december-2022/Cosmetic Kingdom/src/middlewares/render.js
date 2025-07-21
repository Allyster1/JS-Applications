import { render } from "../../node_modules/lit-html/lit-html.js";

const main = document.querySelector("main");

function mainRender(context) {
  render(context, main);
}

export default function addRender(ctx, next) {
  ctx.render = mainRender;
  next();
}
