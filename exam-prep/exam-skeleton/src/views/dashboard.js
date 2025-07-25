import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

// TODO: update the template
const dashboardTemplate = () => html``;

// TODO: update the template for the product
const productTemplate = () => html``;

// TODO: keep for testing purposes (remove after testing)
export function dashboardView(ctx) {
  ctx.render(dashboardTemplate());
}

// export async function dashboardView(ctx) {
//   try {
//     const products = await dataServices.getAllProducts();
//     ctx.render(dashboardTemplate(products));
//   } catch (error) {
//     return alert(error.message);
//   }
// }
