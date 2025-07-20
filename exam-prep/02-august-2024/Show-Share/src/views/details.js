import { html, nothing } from "../../node_modules/lit-html/lit-html.js";

import { getMovieById, deleteMovieById } from "../data/movies.js";
import { getUserData } from "../utility.js";

const detailsTemplate = (movie, isOwner, onDelete) => html` <section
  id="details"
>
  <div id="details-wrapper">
    <img id="details-img" src="${movie.imageUrl}" alt="example1" />
    <div id="details-text">
      <p id="details-title">${movie.title}</p>
      <div id="info-wrapper">
        <div id="description">
          <p id="details-description">${movie.details}</p>
        </div>
      </div>
      ${isOwner
        ? html`
            <div id="action-buttons">
              <a href="/edit/${movie._id}" id="edit-btn">Edit</a>
              <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
                >Delete</a
              >
            </div>
          `
        : nothing}
    </div>
  </div>
</section>`;

export async function showDetails(ctx) {
  const movieId = ctx.params.id;

  ctx.render(html`<p style="color: white">Loading...</p>`);

  const userData = getUserData();

  const movie = await getMovieById(movieId);
  const isOwner = userData && userData.id == movie._ownerId;

  ctx.render(detailsTemplate(movie, isOwner, onDelete));

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteMovieById(movieId);
      ctx.page.redirect("/dashboard");
    }
  }
}
