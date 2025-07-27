import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const editTemplate = (product, onEdit) => html`<section
  id="edit-page"
  class="auth"
>
  <form id="edit" @submit=${onEdit}>
    <div class="container">
      <h1>Edit Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input type="text" id="title" name="title" value=${product.title} />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        value=${product.category}
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        value=${product.maxLevel}
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        value=${product.imageUrl}
      />

      <label for="summary">Summary:</label>
      <textarea
        name="summary"
        id="summary"
        .value=${product.summary}
      ></textarea>
      <input class="btn submit" type="submit" value="Edit Game" />
    </div>
  </form>
</section>`;

export async function editView(ctx) {
  const productId = ctx.params.id;
  const product = await dataServices.getProductById(productId);

  ctx.render(editTemplate(product, onEdit));

  async function onEdit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const title = formData.get("title").trim();
    const category = formData.get("category").trim();
    const maxLevel = formData.get("maxLevel").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const summary = formData.get("summary").trim();

    if (!title || !category || !maxLevel || !imageUrl || !summary) {
      return alert("All fields are required");
    }

    try {
      await dataServices.updateProduct(productId, {
        title,
        category,
        maxLevel,
        imageUrl,
        summary,
      });
      ctx.page.redirect("/details/" + productId);
    } catch (error) {
      return alert(error.message);
    }
  }
}
