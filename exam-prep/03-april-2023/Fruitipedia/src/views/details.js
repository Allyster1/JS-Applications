import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

const detailsTemplate = (data, isOwner, onDelete) => html`<section id="details">
  <div id="details-wrapper">
    <img id="details-img" src=${data.imageUrl} alt="example1" />
    <p id="details-title">${data.name}</p>
    <div id="info-wrapper">
      <div id="details-description">
        <p>${data.description}</p>
        <p id="nutrition">Nutrition</p>
        <p id="details-nutrition">${data.nutrition}</p>
      </div>

      ${isOwner
        ? html` <div id="action-buttons">
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" @click=${onDelete} id="delete-btn"
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
