import { html } from "../../node_modules/lit-html/lit-html.js";
import { getProductById, updateProduct } from "../api/dataService.js";

const editTemplate = (product, onEdit) => html`
  <section id="edit">
    <div class="form">
      <h2>Edit Fruit</h2>
      <form class="edit-form" @submit=${onEdit}>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Fruit Name"
          .value=${product.name}
        />
        <input
          type="text"
          name="imageUrl"
          id="Fruit-image"
          placeholder="Fruit Image URL"
          .value=${product.imageUrl}
        />
        <textarea
          id="fruit-description"
          name="description"
          placeholder="Description"
          rows="10"
          cols="50"
        >
${product.description}</textarea
        >
        <textarea
          id="fruit-nutrition"
          name="nutrition"
          placeholder="Nutrition"
          rows="10"
          cols="50"
        >
${product.nutrition}</textarea
        >
        <button type="submit">post</button>
      </form>
    </div>
  </section>
`;

export async function showEdit(ctx) {
  const productId = ctx.params.productId;
  const product = await getProductById(productId);

  async function onEdit(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const description = formData.get("description").trim();
    const nutrition = formData.get("nutrition").trim();

    if (!name || !imageUrl || !description || !nutrition) {
      submitBtn.disabled = false;
      alert("All fields are required.");
      return;
    }

    try {
      await updateProduct(productId, {
        name,
        imageUrl,
        description,
        nutrition,
      });
      form.reset();
      ctx.page.redirect(`/dashboard/details/${productId}`);
    } catch {
      alert("Edit failed");
    } finally {
      submitBtn.disabled = false;
    }
  }

  return ctx.render(editTemplate(product, onEdit));
}
