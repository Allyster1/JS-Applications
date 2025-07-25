import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

const dashboardTemplate = (products) => html`<section id="catalogPage">
  <h1>All Albums</h1>

  ${products.length
    ? products.map((product) => productTemplate(product))
    : html`<p>No Albums in Catalog!</p>`}
</section>`;

const productTemplate = (data) => html`<div class="card-box">
  <img src=${data.imgUrl} />
  <div>
    <div class="text-center">
      <p class="name">Name: ${data.name}</p>
      <p class="artist">Artist: ${data.artist}</p>
      <p class="genre">Genre: ${data.genre}</p>
      <p class="price">Price: $${data.price}</p>
      <p class="date">Release Date: ${data.releaseDate}</p>
    </div>

    ${(userData =
      getUserData() !== null
        ? html` <div class="btn-group">
            <a href="/details/${data._id}" id="details">Details</a>
          </div>`
        : null)}
  </div>
</div>`;

let userData;

export async function dashboardView(ctx) {
  try {
    const products = await dataServices.getAllProducts();

    ctx.render(dashboardTemplate(products));
  } catch (error) {
    return alert(error.message);
  }
}
