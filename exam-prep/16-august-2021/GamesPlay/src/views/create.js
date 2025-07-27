import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const createTemplate = (onCreate) => html`<section
  id="create-page"
  class="auth"
>
  <form id="create" @submit=${onCreate}>
    <div class="container">
      <h1>Create Game</h1>
      <label for="leg-title">Legendary title:</label>
      <input
        type="text"
        id="title"
        name="title"
        placeholder="Enter game title..."
      />

      <label for="category">Category:</label>
      <input
        type="text"
        id="category"
        name="category"
        placeholder="Enter game category..."
      />

      <label for="levels">MaxLevel:</label>
      <input
        type="number"
        id="maxLevel"
        name="maxLevel"
        min="1"
        placeholder="1"
      />

      <label for="game-img">Image:</label>
      <input
        type="text"
        id="imageUrl"
        name="imageUrl"
        placeholder="Upload a photo..."
      />

      <label for="summary">Summary:</label>
      <textarea name="summary" id="summary"></textarea>
      <input class="btn submit" type="submit" value="Create Game" />
    </div>
  </form>
</section>`;

// TODO: update the data that we will create, the redirect and the validation
export function createView(ctx) {
  ctx.render(createTemplate(onCreate));

  async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const title = formData.get("title").trim();
    const category = formData.get("category").trim();
    const maxLevel = formData.get("maxLevel").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const summary = formData.get("summary").trim();

    if (!title || !category || !maxLevel || !imageUrl || !summary) {
      return alert("All fields are required");
    }

    try {
      await dataServices.createProduct(
        title,
        category,
        maxLevel,
        imageUrl,
        summary
      );
      ctx.page.redirect("/");
    } catch (error) {
      return alert(error.message);
    }
  }
}
