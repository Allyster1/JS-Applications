import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

const detailsTemplate = (
  data,
  isOwner,
  isUser,
  totalDonations,
  hasUserDonated,
  onDelete,
  onDonate
) => html`<section id="detailsPage">
  <div class="details">
    <div class="animalPic">
      <img src="./images/Shiba-Inu.png" />
    </div>
    <div>
      <div class="animalInfo">
        <h1>Name: ${data.name}</h1>
        <h3>Breed: ${data.breed}</h3>
        <h4>Age: ${data.age}</h4>
        <h4>Weight: ${data.weight}</h4>
        <h4 class="donation">Donation: ${totalDonations * 100}$</h4>
      </div>

      ${isUser
        ? html` <div class="actionBtn">
            ${isOwner
              ? html` <a href="/edit/${data._id}" class="edit">Edit</a>
                  <a href="javascript:void(0)" @click=${onDelete} class="remove"
                    >Delete</a
                  >`
              : !hasUserDonated
              ? html`<a
                  href="javascript:void(0)"
                  @click=${onDonate}
                  class="donate"
                  >Donate</a
                >`
              : null}
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
      ctx.page.redirect("/");
    }
  }

  async function onDonate(e) {
    e.preventDefault();
    try {
      await dataServices.addDonations(productId);
      ctx.page.redirect(`/details/${productId}`);
    } catch (error) {
      return alert(error.message);
    }
  }

  try {
    const userData = getUserData();
    const product = await dataServices.getProductById(productId);

    const totalDonations = await dataServices.getTotalDonation(productId);
    let hasUserDonated = false;

    if (userData) {
      const userDonationCount = await dataServices.userTotalDonation(
        productId,
        userData._id
      );
      hasUserDonated = userDonationCount > 0;
    }

    const isOwner = userData && userData._id == product._ownerId;
    const isUser = !!userData;

    return ctx.render(
      detailsTemplate(
        product,
        isOwner,
        isUser,
        totalDonations,
        hasUserDonated,
        onDelete,
        onDonate
      )
    );
  } catch (error) {
    return alert(error.message);
  }
}
