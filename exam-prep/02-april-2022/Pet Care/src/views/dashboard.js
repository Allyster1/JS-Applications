import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const dashboardTemplate = (products) => html`<section id="dashboard">
  <h2 class="dashboard-title">Services for every animal</h2>
  <div class="animals-dashboard">
    ${products.length
      ? products.map((product) => productTemplate(product))
      : html` <div>
          <p class="no-pets">No pets in dashboard</p>
        </div>`}
  </div>
</section>`;

const productTemplate = (data) => html` <div class="animals-board">
  <article class="service-img">
    <img class="animal-image-cover" src=${data.image} />
  </article>
  <h2 class="name">${data.name}</h2>
  <h3 class="breed">${data.breed}</h3>
  <div class="action">
    <a class="btn" href="/details/${data._id}">Details</a>
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
