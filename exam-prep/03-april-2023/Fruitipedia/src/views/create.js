import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const createTemplate = (onCreate) => html`<section id="create">
  <div class="form">
    <h2>Add Fruit</h2>
    <form class="create-form" @submit=${onCreate}>
      <input type="text" name="name" id="name" placeholder="Fruit Name" />
      <input
        type="text"
        name="imageUrl"
        id="Fruit-image"
        placeholder="Fruit Image"
      />
      <textarea
        id="fruit-description"
        name="description"
        placeholder="Description"
        rows="10"
        cols="50"
      ></textarea>
      <textarea
        id="fruit-nutrition"
        name="nutrition"
        placeholder="Nutrition"
        rows="10"
        cols="50"
      ></textarea>
      <button type="submit">Add Fruit</button>
    </form>
  </div>
</section>`;

export function createView(ctx) {
  ctx.render(createTemplate(onCreate));

  async function onCreate(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const name = formData.get("name").trim();
    const imageUrl = formData.get("imageUrl").trim();
    const description = formData.get("description").trim();
    const nutrition = formData.get("nutrition").trim();

    if (!name || !imageUrl || !description || !nutrition) {
      return alert("All fields are required");
    }

    try {
      await dataServices.createProduct(name, imageUrl, description, nutrition);
      ctx.page.redirect("/dashboard");
    } catch (error) {
      return alert(error.message);
    }
  }
}
