import { html } from "../../node_modules/lit-html/lit-html.js";

import { dataServices } from "../services/dataService.js";

const createTemplate = (onCreate) => html`
  <section id="create">
    <div class="form">
      <h2>Add Product</h2>
      <form class="create-form" @submit=${onCreate}>
        <input type="text" name="name" id="name" placeholder="Product Name" />
        <input
          type="text"
          name="imageUrl"
          id="product-image"
          placeholder="Product Image"
        />
        <input
          type="text"
          name="category"
          id="product-category"
          placeholder="Category"
        />
        <textarea
          id="product-description"
          name="description"
          placeholder="Description"
          rows="5"
          cols="50"
        ></textarea>

        <input
          type="text"
          name="price"
          id="product-price"
          placeholder="Price"
        />

        <button type="submit">Add</button>
      </form>
    </div>
  </section>
`;

export function createView(ctx) {
  ctx.render(createTemplate(onCreate));

  async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get("name").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const category = formData.get("category").trim();
    const description = formData.get("description").trim();
    const price = formData.get("price").trim();

    if (!name || !imageUrl || !category || !description || !price) {
      return alert("All fields are required");
    }

    try {
      await dataServices.createProduct(
        name,
        imageUrl,
        category,
        description,
        price
      );
      ctx.page.redirect("/dashboard");
    } catch (error) {
      return alert(error.message);
    }
  }
}
