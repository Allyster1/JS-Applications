import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { getUserData } from "../services/userUtility.js";

const detailsTemplate = (
  product,
  isOwner,
  comments,
  canComment,
  onDelete,
  onCommentSubmit
) => html`<section id="game-details">
  <h1>Game Details</h1>
  <div class="info-section">
    <div class="game-header">
      <img class="game-img" src=${product.imageUrl} />
      <h1>${product.title}</h1>
      <span class="levels">MaxLevel: ${product.maxLevel}</span>
      <p class="type">${product.category}</p>
    </div>

    <p class="text">${product.summary}</p>

    <div class="details-comments">
      <h2>Comments:</h2>
      ${comments.length > 0
        ? html`<ul>
            ${comments.map(
              (c) => html`<li class="comment"><p>Content: ${c.comment}</p></li>`
            )}
          </ul>`
        : html`<p class="no-comment">No comments.</p>`}
    </div>

    ${isOwner
      ? html` <div class="buttons">
          <a href="/edit/${product._id}" class="button">Edit</a>
          <a href="javascript:void(0)" @click=${onDelete} class="button"
            >Delete</a
          >
        </div>`
      : null}
    ${canComment
      ? html`<article class="create-comment">
          <label>Add new comment:</label>
          <form class="form" @submit=${onCommentSubmit}>
            <textarea name="comment" placeholder="Comment......"></textarea>
            <input class="btn submit" type="submit" value="Add Comment" />
          </form>
        </article>`
      : null}
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
    const comments = await dataServices.getCommentsByGameId(productId);
    const isOwner = userData && userData._id == product._ownerId;
    const canComment = userData && !isOwner;

    async function onCommentSubmit(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      const comment = formData.get("comment").trim();
      if (!comment) return alert("Comment cannot be empty!");
      await dataServices.createComment(productId, comment);
      e.target.reset();
      ctx.page.redirect(`/details/${productId}`);
    }

    return ctx.render(
      detailsTemplate(
        product,
        isOwner,
        comments,
        canComment,
        onDelete,
        onCommentSubmit
      )
    );
  } catch (error) {
    return alert(error.message);
  }
}
