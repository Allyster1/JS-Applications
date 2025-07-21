import { html } from "../../node_modules/lit-html/lit-html.js";

import { getAllProducts } from "../api/dataService.js";

const dashboardTemplate = (data) => html`
  <h2>Fruits</h2>
  <section id="dashboard">
    ${data.length === 0
      ? html`<h2>No fruit info yet.</h2>`
      : data.map(productTemplate)}
  </section>
`;

const productTemplate = (product) => {
  return html` <div class="fruit">
    <img src=${product.imageUrl} alt="example1" />
    <h3 class="title">${product.name}</h3>
    <p class="description">${product.description}</p>
    <a class="details-btn" href="/dashboard/details/${product._id}">More Info</a>
  </div>`;
};

export async function showDashboard(ctx) {
  try {
    const data = await getAllProducts();
    return ctx.render(dashboardTemplate(data));
  } catch (error) {
    return alert(error.message);
  }
}
