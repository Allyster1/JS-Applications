import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const dashboardTemplate = (products) => html`
  <h2>Products</h2>
  ${products.length === 0
    ? html`<h2>No products yet.</h2>`
    : html`<section id="dashboard">${products.map(productTemplate)}</section>`}
`;

const productTemplate = (data) => html`
  <div class="product">
    <img src="${data.imageUrl}" alt="example1" />
    <p class="title">${data.name}</p>
    <p><strong>Price:</strong><span class="price">${data.price}</span>$</p>
    <a class="details-btn" href="/details/${data._id}">Details</a>
  </div>
`;

export async function dashboardView(ctx) {
  try {
    const products = await dataServices.getAllProducts();
    ctx.render(dashboardTemplate(products));
  } catch (error) {
    return alert(error.message);
  }
}
