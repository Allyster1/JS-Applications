import { html } from "../../node_modules/lit-html/lit-html.js";

import { addMovie } from "../data/movies.js";

const createTemplate = (onCreate) => html` <section id="create">
  <div class="form">
    <h2>Add Show</h2>
    <form class="create-form" @submit=${onCreate}>
      <input type="text" name="title" id="title" placeholder="TV Show title" />
      <input
        type="text"
        name="image-url"
        id="image-url"
        placeholder="Image URL"
      />
      <input type="text" name="genre" id="genre" placeholder="Genre" />
      <input type="text" name="country" id="country" placeholder="Country" />
      <textarea
        id="details"
        name="details"
        placeholder="Details"
        rows="2"
        cols="10"
      ></textarea>
      <button type="submit">Add Show</button>
    </form>
  </div>
</section>`;

export async function showAddShow(ctx) {
  ctx.render(createTemplate(onCreate));

  async function onCreate(event) {
    event.preventDefault();

    try {
      const formData = new FormData(event.target);
      const newMovie = {
        title: formData.get("title"),
        imageUrl: formData.get("image-url"),
        genre: formData.get("genre"),
        country: formData.get("country"),
        details: formData.get("details"),
      };

      if (Object.values(newMovie).some((x) => !x)) {
        return alert("All fields are required!");
      }

      await addMovie(newMovie);
      event.target.reset();
      ctx.page.redirect("/dashboard");
    } catch (error) {
      alert(error.message);
    }
  }
}
