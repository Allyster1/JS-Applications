import { html } from "../../node_modules/lit-html/lit-html.js";

import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

const detailsTemplate = (
  data,
  isOwner,
  canBuy,
  totalBought,
  onDelete,
  onBuy
) => html` <section id="details">
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
        <h4>Bought: <span id="buys">${totalBought}</span> times.</h4>
        <span>${data.description}</span>
      </div>
    </div>

    <div id="action-buttons">
      ${isOwner
        ? html`
            <a href="/edit/${data._id}" id="edit-btn">Edit</a>
            <a href="/delete/${data._id}" @click=${onDelete} id="delete-btn"
              >Delete</a
            >
          `
        : null}
      ${canBuy
        ? html`<a href="javascript:void(0)" @click=${onBuy} id="buy-btn"
            >Buy</a
          >`
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
      try {
        await dataServices.deleteProduct(productId);
        ctx.page.redirect("/dashboard");
      } catch (error) {
        return alert(error.message);
      }
    }
  }

  async function onBuy(e) {
    e.preventDefault();
    try {
      await dataServices.buyProduct(productId);
      ctx.page.redirect(`/details/${productId}`);
    } catch (error) {
      return alert(error.message);
    }
  }

  try {
    const userData = getUserData();
    const product = await dataServices.getProductById(productId);
    const totalBought = await dataServices.getTotalBought(productId);
    let canBuy = false;
    let isOwner = false;
    if (userData) {
      isOwner = userData._id == product._ownerId;
      const userBought = await dataServices.userTotalBought(
        productId,
        userData._id
      );
      canBuy = !isOwner && userBought == 0;
    }
    return ctx.render(
      detailsTemplate(product, isOwner, canBuy, totalBought, onDelete, onBuy)
    );
  } catch (error) {
    return alert(error.message);
  }
}
