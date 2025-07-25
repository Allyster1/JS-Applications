import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { updateNav } from "../services/userUtility.js";

const editTemplate = (product, onEdit) => html`<section class="editPage">
  <form @submit=${onEdit}>
    <fieldset>
      <legend>Edit Album</legend>

      <div class="container">
        <label for="name" class="vhide">Album name</label>
        <input
          id="name"
          name="name"
          class="name"
          type="text"
          value=${product.name}
        />

        <label for="imgUrl" class="vhide">Image Url</label>
        <input
          id="imgUrl"
          name="imgUrl"
          class="imgUrl"
          type="text"
          value=${product.imgUrl}
        />

        <label for="price" class="vhide">Price</label>
        <input
          id="price"
          name="price"
          class="price"
          type="text"
          value=${product.price}
        />

        <label for="releaseDate" class="vhide">Release date</label>
        <input
          id="releaseDate"
          name="releaseDate"
          class="releaseDate"
          type="text"
          value=${product.releaseDate}
        />

        <label for="artist" class="vhide">Artist</label>
        <input
          id="artist"
          name="artist"
          class="artist"
          type="text"
          value=${product.artist}
        />

        <label for="genre" class="vhide">Genre</label>
        <input
          id="genre"
          name="genre"
          class="genre"
          type="text"
          value=${product.genre}
        />

        <label for="description" class="vhide">Description</label>
        <textarea
          name="description"
          class="description"
          rows="10"
          cols="10"
          .value=${product.description}
        ></textarea>

        <button class="edit-album" type="submit">Edit Album</button>
      </div>
    </fieldset>
  </form>
</section>`;

export async function editView(ctx) {
  const productId = ctx.params.id;
  const product = await dataServices.getProductById(productId);

  ctx.render(editTemplate(product, onEdit));

  async function onEdit(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const name = formData.get("name").trim();
    const imgUrl = formData.get("imgUrl").trim();
    const price = formData.get("price").trim();
    const releaseDate = formData.get("releaseDate").trim();
    const artist = formData.get("artist").trim();
    const genre = formData.get("genre").trim();
    const description = formData.get("description").trim();

    if (
      !name ||
      !imgUrl ||
      !price ||
      !releaseDate ||
      !artist ||
      !genre ||
      !description
    ) {
      return alert("All fields are required.");
    }

    try {
      await dataServices.updateProduct(productId, {
        name,
        imgUrl,
        price,
        releaseDate,
        artist,
        genre,
        description,
      });
      ctx.page.redirect("/details/" + productId);
    } catch (error) {
      return alert(error.message);
    }
  }
}
