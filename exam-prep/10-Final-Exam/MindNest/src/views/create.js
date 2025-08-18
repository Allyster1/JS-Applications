import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { showNotification } from "../services/notificationService.js";

const createTemplate = (onCreate) => html`<section id="create">
  <div class="form form-item">
    <h2>Share Your Tip</h2>
    <form class="create-form" @submit=${onCreate}>
      <input type="text" name="title" id="title" placeholder="Title" />
      <input
        type="text"
        name="imageUrl"
        id="imageUrl"
        placeholder="Image URL"
      />
      <input type="text" name="type" id="type" placeholder="Type" />
      <select name="difficulty" id="difficulty">
        <option value="" disabled selected>Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>
      <textarea
        id="description"
        name="description"
        placeholder="Description"
        rows="2"
        cols="50"
      ></textarea>
      <button type="submit">Add</button>
    </form>
  </div>
</section>`;

export function createView(ctx) {
  ctx.render(createTemplate(onCreate));

  async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = (formData.get("title") || "").trim();
    const imageUrl = (formData.get("imageUrl") || "").trim();
    const type = (formData.get("type") || "").trim();
    const difficulty = (formData.get("difficulty") || "").trim();
    const description = (formData.get("description") || "").trim();

    if (!name || !imageUrl || !type || !difficulty || !description) {
      return showNotification("All fields are required");
    }

    try {
      await dataServices.createProduct(
        name,
        imageUrl,
        type,
        difficulty,
        description
      );
      ctx.page.redirect("/dashboard");
    } catch (error) {
      return showNotification(error.message);
    }
  }
}
