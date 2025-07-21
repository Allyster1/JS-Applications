import { html } from "../../node_modules/lit-html/lit-html.js";

import { deleteProduct, getProductById } from "../api/dataService.js";
import { getUserData } from "../api/userUtility.js";

const detailsTemplate = (product, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${product.imageUrl} alt="example1" />
      <p id="details-title">${product.name}</p>
      <p id="details-category">
        Category: <span id="categories">${product.category}</span>
      </p>
      <p id="details-price">
        Price: <span id="price-number">${product.price}</span>$
      </p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Bought: <span id="buys">0</span> times.</h4>
          <span>${product.description}</span>
        </div>
      </div>

      ${
        isOwner
          ? html` <div id="action-buttons">
              <a href="/edit/${product._id}" id="edit-btn">Edit</a>
              <a
                href="/delete/${product._id}"
                @click=${onDelete}
                id="delete-btn"
                >Delete</a
              >
            </div>`
          : null
      }

        <!--Bonus - Only for logged-in users ( not authors )-->
        <a href="" id="buy-btn">Buy</a>
      </div>
    </div>
  </section>
`;

export async function showDetails(ctx) {
  const productId = ctx.params.productId;

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
