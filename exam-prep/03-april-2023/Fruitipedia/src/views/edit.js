import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { updateNav } from "../services/userUtility.js";

const editTemplate = (product, onEdit) => html`<section id="edit">
  <div class="form">
    <h2>Edit Fruit</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Fruit Name"
        value=${product.name}
      />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        placeholder="Fruit Image URL"
        value=${product.imageUrl}
      />
      <textarea
        id="fruit-description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
        .value=${product.description}
      ></textarea>
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
        .value=${product.nutrition}
      ></textarea>
      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editView(ctx) {
  const productId = ctx.params.id;
  const product = await dataServices.getProductById(productId);

  ctx.render(editTemplate(product, onEdit));

  async function onEdit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const description = formData.get("description").trim();
    const nutrition = formData.get("nutrition").trim();

    if (!name || !imageUrl || !description || !nutrition) {
      return alert("All fields are required.");
    }

    try {
      await dataServices.updateProduct(productId, {
        name,
        imageUrl,
        description,
        nutrition,
      });
      ctx.page.redirect("/details/" + productId);
    } catch (error) {
      return alert(error.message);
    }
  }
}
