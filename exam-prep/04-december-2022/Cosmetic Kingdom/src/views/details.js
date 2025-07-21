import { html } from "../../node_modules/lit-html/lit-html.js";

import { getProductById, deleteProduct } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

const detailsTemplate = (data, isOwner, onDelete) => html` <section
  id="details"
>
  <div id="details-wrapper">
    <img id="details-img" src="${data.imageUrl}" alt="example1" />
    <p id="details-title">${data.name}</p>
    <p id="details-category">
      Category: <span id="categories">${data.category}</span>
    </p>
    <p id="details-price">
      Price: <span id="price-number">${data.price}</span>$
    </p>
    <div id="info-wrapper">
      <div id="details-description">
        <h4>Bought: <span id="buys">0</span> times.</h4>
        <span>${data.description}</span>
      </div>
    </div>

    ${isOwner
      ? html` <div id="action-buttons">
          <a href="/edit/${data._id}" id="edit-btn">Edit</a>
          <a href="/delete/${data._id}" @click=${onDelete} id="delete-btn"
            >Delete</a
          >
          <a href="" id="buy-btn">Buy</a>
        </div>`
      : null}
  </div>
</section>`;

export async function detailsView(ctx) {
  const productId = ctx.params.id;

  async function onDelete(e) {
    e.preventDefault();
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteProduct(productId);
      ctx.page.redirect("/dashboard");
    }
  }

  try {
    const userData = getUserData();
    const product = await getProductById(productId);

    const isOwner = userData && userData._id == product._ownerId;

    return ctx.render(detailsTemplate(product, isOwner, onDelete));
  } catch (error) {
    return alert(error.message);
  }
}
