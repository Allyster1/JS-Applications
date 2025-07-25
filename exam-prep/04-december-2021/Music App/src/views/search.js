import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

const searchTemplate = (items = [], onSearch, query = "") => html`
  <section id="searchPage">
    <h1>Search by Name</h1>
    <div class="search">
      <input
        id="search-input"
        type="text"
        name="search"
        placeholder="Enter desired albums's name"
        .value=${query}
      />
      <button @click=${onSearch} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>
    <div class="search-result">
      ${query && items.length === 0
        ? html`<p class="no-result">No result.</p>`
        : items.map((item) => resultTemp(item))}
    </div>
  </section>
`;

const resultTemp = (item) => html`
  <div class="card-box">
    <img src=${item.imgUrl} />
    <div>
      <div class="text-center">
        <p class="name">Name: ${item.name}</p>
        <p class="artist">Artist: ${item.artist}</p>
        <p class="genre">Genre: ${item.genre}</p>
        <p class="price">Price: $${item.price}</p>
        <p class="date">Release Date: ${item.releaseDate}</p>
      </div>

      ${(userData =
        getUserData() !== null
          ? html`<div class="btn-group">
              <a href="/details/${item._id}" id="details"> Details </a>
            </div>`
          : null)}
    </div>
  </div>
`;

let context = null;
let userData;

export async function searchView(ctx) {
  context = ctx;
  const query = ctx.querystring
    ? new URLSearchParams(ctx.querystring).get("query") || ""
    : "";
  let items = [];
  if (query) {
    items = await dataServices.searchProduct(query);
    if (!Array.isArray(items)) {
      items = [];
    }
  }
  ctx.render(searchTemplate(items, onSearch, query));
}

async function onSearch(event) {
  event.preventDefault();
  const input = document.getElementById("search-input");
  const query = input.value.trim();

  if (!query) {
    return alert("All fields are required!");
  }

  context.page.redirect(`/search?query=${encodeURIComponent(query)}`);
}
