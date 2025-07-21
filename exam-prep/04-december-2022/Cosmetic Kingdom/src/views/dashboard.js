import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllProducts } from "../api/dataService.js";

const dashboardTemplate = (data) => html`
  <h2>Products</h2>
  ${data.length === 0
    ? html`<h2>No products yet.</h2>`
    : html`<section id="dashboard">${data.map(productTemplate)}</section>`}
`;

const productTemplate = (product) => html`
  <div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
    <a class="details-btn" href="/dashboard/details/${product._id}">Details</a>
  </div>
`;

export async function showDashboard(ctx) {
  try {
    const data = await getAllProducts();
    return ctx.render(dashboardTemplate(data));
  } catch (error) {
    return alert(error.message);
  }
}
