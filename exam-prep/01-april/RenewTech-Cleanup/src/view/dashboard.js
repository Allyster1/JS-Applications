import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllFacts } from "../api/data.js";

const dashboardTemplate = (solut) => html`<h2>Solutions</h2>
<section id="solutions">
  ${solut.length == 0
    ? html`<h2 id="no-solution" >No Solutions Added.</h2>`
    : solut.map(
        (e) => html`       
        <div class="solution">
    <img src="${e.imageUrl}" alt="example1" />
    <div class="solution-info">
    <h3 class="type">${e.type}</h3>
    <p class="description">${e.description}</p>
    <a class="details-btn" href="/details/${e._id}">Learn More</a>
  </div>
  </div>
        `
      )}
</section>`;


export async function dashboardPage(ctx) {
  const events = await getAllFacts();
  console.log(events);
  ctx.render(dashboardTemplate(events));
}
