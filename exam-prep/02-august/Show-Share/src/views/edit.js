import { html } from "../../node_modules/lit-html/lit-html.js";

import { getMovieById, updateMovie } from "../data/movies.js";

const editTemplate = (movie, onSubmit) => html` <section id="edit">
  <div class="form">
    <h2>Edit Show</h2>
    <form class="edit-form" @submit=${onSubmit}>
      <input type="text" name="title" id="title" value=${movie.title} />
      <input
        type="text"
        name="image-url"
        id="image-url"
        value=${movie.imageUrl}
      />
      <input type="text" name="genre" id="genre" value=${movie.genre} />
      <input type="text" name="country" id="country" value=${movie.country} />
      <textarea name="details" id="details">${movie.details}</textarea>
      <button type="submit">Edit Show</button>
    </form>
  </div>
</section>`;

export async function showEdit(ctx) {
  const movieId = ctx.params.id;

  const movie = await getMovieById(movieId);
  ctx.render(editTemplate(movie, onSubmit));

  async function onSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const editMovie = {
      title: formData.get("title").trim(),
      imageUrl: formData.get("image-url").trim(),
      genre: formData.get("genre").trim(),
      country: formData.get("country").trim(),
      details: formData.get("details").trim(),
    };

    if (Object.values(editMovie).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await updateMovie(movieId, editMovie);
    event.target.reset();
    ctx.page.redirect(`/details/${movieId}`);
  }
}
