import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const dashboardTemplate = (games) => html` <section id="catalog-page">
  <h1>All Games</h1>
  ${games.length
    ? games.map((game) => productTemplate(game))
    : html`<h3 class="no-articles">No articles yet</h3>`}
</section>`;

const productTemplate = (data) => html`<div class="allGames">
  <div class="allGames-info">
    <img src=${data.imageUrl} />
    <h6>${data.category}</h6>
    <h2>${data.title}</h2>
    <a href="/details/${data._id}" class="details-button">Details</a>
  </div>
</div>`;

export async function dashboardView(ctx) {
  try {
    const products = await dataServices.getAllProducts();
    ctx.render(dashboardTemplate(products));
  } catch (error) {
    return alert(error.message);
  }
}
