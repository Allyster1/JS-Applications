import { html } from "../../node_modules/lit-html/lit-html.js";

import { search } from "../data/movies.js";
import { getUserData } from "../utility.js";

const searchTemplate = (movies, onSearch) => html` <section id="search">
  <div class="form">
    <h2>Search</h2>
    <form class="search-form" @submit=${onSearch}>
      <input type="text" name="search" id="search-input" />
      <button class="button-list" type="submit">Search</button>
    </form>
  </div>
  <h4>Results:</h4>

  ${movies != undefined
    ? html` <div class="search-result">
        ${movies.length == 0
          ? html` <p class="no-result">There is no TV show with this title</p>`
          : movies.map(
              (p) => html` <div class="show">
                <img src="${p.imageUrl}" alt="example1" />
                <h3 class="title">${p.title}</h3>
                <p class="genre">Genre: ${p.genre}</p>
                <p class="country-of-origin">Country of Origin: ${p.country}</p>
                <a class="details-btn" href="/details/${p._id}">Details</a>
              </div>`
            )}
      </div>`
    : null}
</section>`;

export async function showSearch(ctx) {
  const query = new URLSearchParams(ctx.querystring).get("query")?.trim();
  const movies = query ? await search(query) : null;

  ctx.render(searchTemplate(movies, onSearch));

  async function onSearch(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const query = formData.get("search").trim();

    if (!query) {
      return alert("All fields are required!");
    }

    ctx.page.redirect(`/search?query=${query}`);
  }
}
