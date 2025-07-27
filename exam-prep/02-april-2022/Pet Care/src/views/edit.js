import { html } from "../../node_modules/lit-html/lit-html.js";
import { dataServices } from "../services/dataService.js";
import { updateNav } from "../services/userUtility.js";

const editTemplate = (product, onEdit) => html`<section id="editPage">
  <form class="editForm" @submit=${onEdit}>
    <img src=${product.image} />
    <div>
      <h2>Edit PetPal</h2>
      <div class="name">
        <label for="name">Name:</label>
        <input name="name" id="name" type="text" value=${product.name} />
      </div>
      <div class="breed">
        <label for="breed">Breed:</label>
        <input name="breed" id="breed" type="text" value=${product.breed} />
      </div>
      <div class="Age">
        <label for="age">Age:</label>
        <input name="age" id="age" type="text" value=${product.age} />
      </div>
      <div class="weight">
        <label for="weight">Weight:</label>
        <input name="weight" id="weight" type="text" value=${product.weight} />
      </div>
      <div class="image">
        <label for="image">Image:</label>
        <input name="image" id="image" type="text" value=${product.image} />
      </div>
      <button class="btn" type="submit">Edit Pet</button>
    </div>
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
    const breed = formData.get("breed").trim();
    const age = formData.get("age").trim();
    const weight = formData.get("weight").trim();
    const image = formData.get("image").trim();

    if (!name || !breed || !age || !weight || !image) {
      return alert("All fields are required");
    }

    try {
      await dataServices.updateProduct(productId, {
        name,
        breed,
        age,
        weight,
        image,
      });
      ctx.page.redirect("/details/" + productId);
    } catch (error) {
      return alert(error.message);
    }
  }
}
