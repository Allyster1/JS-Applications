import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { showNotification } from "../services/notificationService.js";

const dashboardTemplate = (products) => html`<h3 class="heading">
    Mindful Tips
  </h3>
  ${products.length
    ? html`<section id="tips-dashboard">
        ${products.map((product) => productTemplate(product))}
      </section>`
    : html`<h3 class="empty">No Mindful Tips Added Yet.</h3>`}`;

const productTemplate = (data) => html`<div class="tip">
  <img src=${data.imageUrl} alt="example1" />
  <h3 class="title">${data.title}</h3>
  <div class="tip-info">
    <p class="type">Type: ${data.type}</p>
    <p class="difficulty">Difficulty: ${data.difficulty}</p>
  </div>
  <a class="details-btn" href="/details/${data._id}">View Tip</a>
</div>`;

export async function dashboardView(ctx) {
  try {
    const products = await dataServices.getAllProducts();
    ctx.render(dashboardTemplate(products));
  } catch (error) {
    return showNotification(error.message);
  }
}
