import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { updateNav } from "../services/userUtility.js";

// TODO: update the template
const editTemplate = () => html``;

// TODO: keep for testing purposes (remove after testing)
export function editView(ctx) {
  ctx.render(editTemplate());
}

// TODO: update the data that we will edit, the redirect and the validation
// export async function editView(ctx) {
//   const productId = ctx.params.id;
//   const product = await dataServices.getProductById(productId);

//   ctx.render(editTemplate(product, onEdit));

//   async function onEdit(e) {
//     e.preventDefault();

//     const form = e.currentTarget;

//     const formData = new FormData(form);

//     const name = formData.get("name").trim();
//     const imageUrl = formData.get("imageUrl").trim();
//     const category = formData.get("category").trim();
//     const description = formData.get("description").trim();
//     const price = formData.get("price").trim();

//     if (!name || !imageUrl || !category || !description || !price) {
//       return alert("All fields are required.");
//     }

//     try {
//       await dataServices.updateProduct(productId, {
//         name,
//         imageUrl,
//         category,
//         description,
//         price,
//       });
//       ctx.page.redirect("/details/" + productId);
//     } catch (error) {
//       return alert(error.message);
//     }
//   }
// }
