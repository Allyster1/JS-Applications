import { html } from "../../node_modules/lit-html/lit-html.js";

import { getAllMovies } from "../data/movies.js";

const dashboardTemplate = (movie) => html`<h2>Users Recommendations</h2>
  <section id="shows">
    ${movie.length == 0
      ? html`<h2 id="no-show">No shows Added.</h2>`
      : movie.map(
          (e) => html`
            <div class="show">
              <img src="${e.imageUrl}" alt="example1" />
              <div class="show-info">
                <h3 class="title">${e.title}</h3>
                <p class="genre">Genre: ${e.genre}</p>
                <p class="country-of-origin">Country of Origin: ${e.country}</p>
                <a class="details-btn" href="/details/${e._id}">Details</a>
              </div>
            </div>
          `
        )}
  </section>`;

export async function showDashboard(ctx) {
  const movies = await getAllMovies();
  ctx.render(dashboardTemplate(movies));
}
