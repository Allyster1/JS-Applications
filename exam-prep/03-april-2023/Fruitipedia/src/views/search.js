import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const searchTemplate = (items = [], onSearch, query = "") => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form class="search-form" @submit=${onSearch}>
        <input type="text" name="search" id="search-input" .value=${query} />
        <button class="button-list" type="submit">Search</button>
      </form>
    </div>
    <h4>Results:</h4>

    ${query && items.length === 0
      ? html`<p class="no-result">No result.</p>`
      : html`<div class="search-result">
          ${items.map((item) => resultTemp(item))}
        </div>`}
  </section>
`;

const resultTemp = (item) => html`
  <div class="fruit">
    <img src="${item.imageUrl}" alt="example1" />
    <h3 class="title">${item.name}</h3>
    <p class="description">${item.description}</p>
    <a class="details-btn" href="/details/${item._id}">More Info</a>
  </div>
`;

let context = null;

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
  const formData = new FormData(event.target);
  const query = formData.get("search").trim();

  if (!query) {
    return alert("All fields are required!");
  }

  context.page.redirect(`/search?query=${encodeURIComponent(query)}`);
}
