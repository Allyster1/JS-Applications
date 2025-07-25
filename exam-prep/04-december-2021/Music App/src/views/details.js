import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

const detailsTemplate = (product, isOwner, onDelete) => html`<section
  id="detailsPage"
>
  <div class="wrapper">
    <div class="albumCover">
      <img src=${product.imgUrl} />
    </div>
    <div class="albumInfo">
      <div class="albumText">
        <h1>Name: ${product.name}</h1>
        <h3>Artist: ${product.artist}</h3>
        <h4>Genre: ${product.genre}</h4>
        <h4>Price: $${product.price}</h4>
        <h4>Date: ${product.releaseDate}</h4>
        <p>${product.description}</p>
      </div>

      ${isOwner
        ? html` <div class="actionBtn">
            <a href="/edit/${product._id}" class="edit">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} class="remove"
              >Delete</a
            >
          </div>`
        : null}
    </div>
  </div>
</section>`;

export async function detailsView(ctx) {
  const productId = ctx.params.id;

  async function onDelete(e) {
    e.preventDefault();
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await dataServices.deleteProduct(productId);
      ctx.page.redirect("/dashboard");
    }
  }

  try {
    const userData = getUserData();
    const product = await dataServices.getProductById(productId);

    const isOwner = userData && userData._id == product._ownerId;

    return ctx.render(detailsTemplate(product, isOwner, onDelete));
  } catch (error) {
    return alert(error.message);
  }
}
