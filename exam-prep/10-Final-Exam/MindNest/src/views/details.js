import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";
import { showNotification } from "../services/notificationService.js";

const detailsTemplate = (product, isOwner, onEdit, onDelete) => html`<section
  id="details"
>
  <div id="details-wrapper">
    <div>
      <img id="details-img" src=${product.imageUrl} alt="example1" />
      <p id="details-title">${product.title}</p>
    </div>
    <div id="info-wrapper">
      <div id="details-description">
        <p class="details-type">Type: ${product.type}</p>
        <p class="details-difficulty">Difficulty: ${product.difficulty}</p>
        <p id="tip-description">${product.description}</p>
      </div>
      <div id="action-buttons">
        ${isOwner
          ? html`<a href="/edit/${product._id}" @click=${onEdit} id="edit-btn"
                >Edit</a
              >
              <a href="javascript:void(0)" @click=${onDelete} id="delete-btn"
                >Delete</a
              >`
          : null}
      </div>
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

  async function onEdit(e) {
    e.preventDefault();
    ctx.page.redirect(`/edit/${productId}`);
  }

  try {
    const userData = getUserData();
    const product = await dataServices.getProductById(productId);

    const isOwner = userData && userData._id == product._ownerId;

    return ctx.render(detailsTemplate(product, isOwner, onEdit, onDelete));
  } catch (error) {
    return showNotification(error.message);
  }
}
