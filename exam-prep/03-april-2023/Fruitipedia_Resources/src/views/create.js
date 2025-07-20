import { html } from "../../node_modules/lit-html/lit-html.js";

import { createProduct } from "../api/dataService.js";

const createTemplate = (onCreate) => html` <section id="create">
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

export function showCreate(ctx) {
  async function onCreate(e) {
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
      alert("All fields are required!");
      submitBtn.disabled = false;
      return;
    }

    try {
      await createProduct(name, imageUrl, description, nutrition);
      form.reset();
      ctx.page.redirect("/dashboard");
    } catch (error) {
      alert("Register failed");
    } finally {
      submitBtn.disabled = false;
    }
  }

  return ctx.render(createTemplate(onCreate));
}
