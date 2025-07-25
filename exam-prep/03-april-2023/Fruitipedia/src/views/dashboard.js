import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const dashboardTemplate = (products) => html`<h2>Fruits</h2>
  ${products.length === 0
    ? html`<h2>No fruit info yet.</h2>`
    : html`<section id="dashboard">
        ${products.map(productTemplate)}
      </section>`} `;

const productTemplate = (data) => html`<div class="fruit">
  <img src=${data.imageUrl} alt="example1" />
  <h3 class="title">${data.name}</h3>
  <p class="description">${data.description}</p>
  <a class="details-btn" href="/details/${data._id}">More Info</a>
</div>`;

export async function dashboardView(ctx) {
  try {
    const products = await dataServices.getAllProducts();
    ctx.render(dashboardTemplate(products));
  } catch (error) {
    return alert(error.message);
  }
}
