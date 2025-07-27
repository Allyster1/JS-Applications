import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";

const homeTemplate = (games) => html` <section id="welcome-world">
  <div class="welcome-message">
    <h2>ALL new games are</h2>
    <h3>Only in GamesPlay</h3>
  </div>
  <img src="./images/four_slider_img01.png" alt="hero" />

  <div id="home-page">
    <h1>Latest Games</h1>

    ${games.length
      ? games.map((game) => gameTemplate(game))
      : html`<p class="no-articles">No games yet</p>`}
  </div>
</section>`;

const gameTemplate = (data) => html` <div class="game">
  <div class="image-wrap">
    <img src=${data.imageUrl} />
  </div>
  <h3>${data.title}</h3>
  <div class="rating">
    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
  </div>
  <div class="data-buttons">
    <a href="/details/${data._id}" class="btn details-btn">Details</a>
  </div>
</div>`;

export async function homeView(ctx) {
  try {
    const products = await dataServices.getLatestProducts();
    ctx.render(homeTemplate(products));
  } catch (error) {
    return alert(error.message);
  }
}
