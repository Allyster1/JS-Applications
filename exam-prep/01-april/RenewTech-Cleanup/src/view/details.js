import { html } from "../../node_modules/lit-html/lit-html.js";
import {
  deleteFactById,
  getFactById,
  getTotalLikes,
  like,
  didUserLiked
} from "../api/data.js";

const detailsTamplate = (
  fact,
  isOwner,
  onDelete,
  isLoggedIn,
  totalLikesCount,
  onClickLike,
  didUserLikeded
) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fact.imageUrl}" alt="example1" />
            <div>
            <p id="details-type">${fact.type}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${fact.description}</p>
                <p id ="more-info">${fact.learnMore}</p>
              </div>
              </div>
              <h3>Like Solution:<span id="like">${totalLikesCount}</span></h3>
              <div id="action-buttons">
      ${isOwner
        ? html`<a href="/edit/${fact._id}" id="edit-btn">Edit</a>
            <a href="javascript:void(0)" id="delete-btn" @click=${onDelete}
              >Delete</a
            >`
        : ""}
     ${(() => {
  if (didUserLikeded == 0) {
    if (isLoggedIn && !isOwner) {
      return html` <a href="javascript:void(0)" @click=${onClickLike} id="like-btn">Like</a>`;
    }
  }
})()}
    </div>
            </div>
`;

export async function detailsPage(ctx) {
  const solutionId = ctx.params.id;
  const fact = await getFactById(solutionId);
  const user = ctx.user;

  let userId;
  let totalLikesCount;
  let didUserLikeded;

  if (user != null) {
    userId = user._id;
    didUserLikeded = await didUserLiked(solutionId, userId);
  }

  const isOwner = user && fact._ownerId == user._id;
  const isLoggedIn = user !== undefined;

  totalLikesCount = await getTotalLikes(solutionId);
  ctx.render(
    detailsTamplate(
      fact,
      isOwner,
      onDelete,
      isLoggedIn,
      totalLikesCount,
      onClickLike,
      didUserLikeded
    )
  );

  async function onClickLike() {
    const likes = {
      solutionId: solutionId,
    };
    await like(likes);

    totalLikesCount = await getTotalLikes(solutionId);
    didUserLikeded = await didUserLiked(solutionId, userId);
    ctx.render(
      detailsTamplate(
        fact,
        isOwner,
        onDelete,
        isLoggedIn,
        totalLikesCount,
        onClickLike,
        didUserLiked
      )
    );
  }

  async function onDelete() {
    const confirmed = confirm("Are you sure?");
    if (confirmed) {
      await deleteFactById(solutionId);
      ctx.page.redirect("/dashboard");
    }
  }
}
