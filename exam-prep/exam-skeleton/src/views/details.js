import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

// TODO: update the template
const detailsTemplate = () => html``;

// TODO: keep for testing purposes (remove after testing)
export function detailsView(ctx) {
  ctx.render(detailsTemplate());
}

// TODO: update function if any additional functionality is needed
// export async function showDetails(ctx) {
//   const productId = ctx.params.productId;

//   async function onDelete(e) {
//     e.preventDefault();
//     const confirmed = confirm("Are you sure?");
//     if (confirmed) {
//       await deleteProduct(productId);
//       ctx.page.redirect("/dashboard");
//     }
//   }

//   try {
//     const userData = getUserData();
//     const product = await dataServices.getProductById(productId);

//     const isOwner = userData && userData._id == product._ownerId;

//     return ctx.render(detailsTemplate(product, isOwner, onDelete));
//   } catch (error) {
//     return alert(error.message);
//   }
// }
