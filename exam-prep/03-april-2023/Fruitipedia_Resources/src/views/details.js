import { html } from "../../node_modules/lit-html/lit-html.js";

import { deleteProduct, getProductById } from "../api/dataService.js";
import { getUserData } from "../api/userUtility.js";

const detailsTemplate = (product, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${product.imageUrl} alt="example1" />
      <p id="details-title">${product.name}</p>
      <div id="info-wrapper">
        <div id="details-description">
          <p>${product.description}</p>
          <p id="nutrition">Nutrition</p>
          <p id="details-nutrition">${product.nutrition}</p>
        </div>
        <!--Edit and Delete are only for creator-->
        ${isOwner
          ? html` <div id="action-buttons">
              <a href="/edit/${product._id}" id="edit-btn">Edit</a>
              <a
                href="/delete/${product._id}"
                @click=${onDelete}
                id="delete-btn"
                >Delete</a
              >
            </div>`
          : null}
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
