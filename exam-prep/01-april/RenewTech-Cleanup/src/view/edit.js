import { html } from "../../node_modules/lit-html/lit-html.js";
import { editFactById, getFactById } from "../api/data.js";

const editTamplate = (fact, onSubmit) => html`
  <section id="edit">
    <div class="form">
      <img class="border" src="../images/border.png" alt="" />
      <h2>Edit Character</h2>
      <form class="edit-form" @submit=${onSubmit}>
        <input
          type="text"
          name="type"
          id="type"
          placeholder="Solution Type"
          value="${fact.type}"
        />
        <input
          type="text"
          name="image-url"
          id="image-url"
          placeholder="Image URL"
          value="${fact.imageUrl}"
        />

        <textarea
          id="description"
          name="description"
          placeholder="Description"
          rows="2"
          cols="10"
        >
${fact.description}</textarea
        >

        <textarea
          id="more-info"
          name="more-info"
          placeholder="Additional Info"
          rows="2"
          cols="10"
        >
${fact.learnMore}</textarea
        >

        <button type="submit">Edit</button>
      </form>
    </div>
  </section>
`;

export async function editPage(ctx) {
  const factId = ctx.params.id;

  const fact = await getFactById(factId);
  ctx.render(editTamplate(fact, onSubmit));

  async function onSubmit(fact) {
    fact.preventDefault();
    const formData = new FormData(fact.target);

    const editFact = {
      type: formData.get("type").trim(),
      imageUrl: formData.get("image-url").trim(),
      description: formData.get("description").trim(),
      learnMore: formData.get("more-info").trim(),
    };

    if (Object.values(editFact).some((x) => !x)) {
      return alert("All fields are required!");
    }

    await editFactById(factId, editFact);
    fact.target.reset();
    ctx.page.redirect(`/details/${factId}`);
  }
}
