import { html } from "../../node_modules/lit-html/lit-html.js";
import { getProductById, updateProduct } from "../services/dataService.js";
import { updateNav } from "../services/userUtility.js";

const editTemplate = (product, onEdit) => html`<section id="edit">
  <div class="form">
    <h2>Edit Product</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Product Name"
        value=${product.name}
      />
      <input
        type="text"
        name="imageUrl"
        id="product-image"
        placeholder="Product Image"
        value=${product.imageUrl}
      />
      <input
        type="text"
        name="category"
        id="product-category"
        placeholder="Category"
        value=${product.category}
      />
      <textarea
        id="product-description"
        name="description"
        placeholder="Description"
        rows="5"
        cols="50"
        .value=${product.description}
      ></textarea>

      <input
        type="text"
        name="price"
        id="product-price"
        placeholder="Price"
        value="${product.price}"
      />
      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function editView(ctx) {
  const productId = ctx.params.id;
  const product = await getProductById(productId);

  ctx.render(editTemplate(product, onEdit));

  async function onEdit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const category = formData.get("category").trim();
    const description = formData.get("description").trim();
    const price = formData.get("price").trim();

    if (!name || !imageUrl || !category || !description || !price) {
      alert("All fields are required.");
      return;
    }

    try {
      await updateProduct(productId, {
        name,
        imageUrl,
        category,
        description,
        price,
      });
      ctx.page.redirect("/details/" + productId);
    } catch (error) {
      return alert(error.message);
    }
  }
}
