import { html } from "../../node_modules/lit-html/lit-html.js";

import { searchProduct } from "../api/dataService.js";

const searchTemplate = (product, onSearch, query = "") => html`
  <section id="search">
    <div class="form">
      <h2>Search</h2>
      <form class="search-form" @submit=${onSearch}>
        <input type="text" name="search" id="search-input" .value=${query} />
        <button class="button-list">Search</button>
      </form>
    </div>

    <h4>Results:</h4>

    ${product.length > 0
      ? html`
          <div class="search-result">
            ${product.map(
              (p) => html`
                <div class="fruit">
                  <img src="${p.imageUrl}" alt="${p.name}" />
                  <h3 class="title">${p.name}</h3>
                  <p class="description">${p.description}</p>
                  <a class="details-btn" href="/dashboard/details/${p._id}">
                    More Info
                  </a>
                </div>
              `
            )}
          </div>
        `
      : html`<p class="no-result">No result.</p>`}
  </section>
`;

export async function showSearch(ctx) {
  const query = new URLSearchParams(ctx.querystring).get("query")?.trim() || "";
  const results = query ? await searchProduct(query) : [];

  async function onSearch(e) {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    const searchQuery = formData.get("search").trim();

    if (!searchQuery) {
      alert("The field is required!");
      return;
    }

    ctx.page.redirect(`/search?query=${encodeURIComponent(searchQuery)}`);
  }

  return ctx.render(searchTemplate(results, onSearch, query));
}
