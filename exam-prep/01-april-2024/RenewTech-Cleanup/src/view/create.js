import { html } from "../../node_modules/lit-html/lit-html.js";
import { addFact } from "../api/data.js";

const createTamplate = (onSubmit) => html`
<section id="create">
          <div class="form">
          <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form class="create-form" @submit=${onSubmit}>
            <input
            type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="more-info"
              name="more-info"
              placeholder="More Info"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Solution</button>
            </form>
          </div>
        </section>
`;

export async function createPage(ctx) {
  ctx.render(createTamplate(onSubmit));

  async function onSubmit(fact) {
    fact.preventDefault();
    const formData = new FormData(fact.target);

    const newFact = {
      type: formData.get("type").trim(),
      imageUrl: formData.get("image-url").trim(),
      description: formData.get("description").trim(),
      learnMore: formData.get("more-info").trim(),
    };

    if (Object.values(newFact).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await addFact(newFact);
    fact.target.reset();
    ctx.page.redirect("/dashboard");
  }
}
