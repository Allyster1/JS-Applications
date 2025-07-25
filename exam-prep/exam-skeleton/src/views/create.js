import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

// TODO: update the template
const createTemplate = () => html``;

// TODO: keep for testing purposes (remove after testing)
export function createView(ctx) {
  ctx.render(createTemplate());
}

// TODO: update the data that we will create, the redirect and the validation
// export function createView(ctx) {
//   ctx.render(createTemplate(onCreate));

//   async function onCreate(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);

//     const name = formData.get("name").trim();
//     const imageUrl = formData.get("imageUrl").trim();
//     const category = formData.get("category").trim();
//     const description = formData.get("description").trim();
//     const price = formData.get("price").trim();

//     if (!name || !imageUrl || !category || !description || !price) {
//       return alert("All fields are required");
//     }

//     try {
//       await dataServices.createProduct(
//         name,
//         imageUrl,
//         category,
//         description,
//         price
//       );
//       ctx.page.redirect("/dashboard");
//     } catch (error) {
//       return alert(error.message);
//     }
//   }
// }
