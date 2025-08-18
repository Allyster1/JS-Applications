import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { updateNav } from "../services/userUtility.js";
import { showNotification } from "../services/notificationService.js";

const editTemplate = (product, onEdit) => html`<section id="edit">
  <div class="form form-item">
    <h2>Edit Your Item</h2>
    <form class="edit-form" @submit=${onEdit}>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        value=${product.title}
      />
      <input
        type="text"
        name="imageUrl"
        id="imageUrl"
        placeholder="Image URL"
        value=${product.imageUrl}
      />
      <input
        type="text"
        name="type"
        id="type"
        placeholder="Type"
        value=${product.type}
      />
      <select name="difficulty" id="difficulty">
        <option value="" disabled>Difficulty</option>
        <option value="Easy" ?selected=${product.difficulty === "Easy"}>
          Easy
        </option>
        <option value="Medium" ?selected=${product.difficulty === "Medium"}>
          Medium
        </option>
        <option value="Hard" ?selected=${product.difficulty === "Hard"}>
          Hard
        </option>
      </select>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="50"
        .value=${product.description}
      ></textarea>
      <button type="submit">Edit</button>
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

    const title = formData.get("title").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const type = formData.get("type").trim();
    const difficulty = formData.get("difficulty");
    const description = formData.get("description").trim();

    if (!title || !imageUrl || !type || !difficulty || !description) {
      return showNotification("All fields are required.");
    }

    try {
      await dataServices.updateProduct(productId, {
        title,
        imageUrl,
        type,
        difficulty,
        description,
      });
      ctx.page.redirect("/details/" + productId);
    } catch (error) {
      return showNotification(error.message);
    }
  }
}
