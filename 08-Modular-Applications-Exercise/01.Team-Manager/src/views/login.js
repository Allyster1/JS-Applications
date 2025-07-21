import { html } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../service/userService.js";

import { createSubmitHandler } from "../utility/createSubmitHandler.js";

const loginTemplate = (handler, error) => html` <section id="login">
  <article class="narrow">
    <header class="pad-med">
      <h1>Login</h1>
    </header>
    <form id="login-form" class="main-form pad-large" @submit=${handler}>
      ${Boolean(error) ? html`<div class="error">${error.message}</div>` : null}
      <label>E-mail: <input type="text" name="email" /></label>
      <label>Password: <input type="password" name="password" /></label>
      <input class="action cta" type="submit" value="Sign In" />
    </form>
    <footer class="pad-small">
      Don't have an account? <a href="/register" class="invert">Sign up here</a>
    </footer>
  </article>
</section>`;

let context = null;
export function showLogin(ctx) {
  ctx.render(createSubmitHandler(onSubmit));
  context = ctx;
}

async function onSubmit(email, password) {
  if (!email || !password) {
    context.render(
      createSubmitHandler(
        loginTemplate(onSubmit(), { message: "All fields are required!" })
      )
    );
  }

  await userService.login(email, password);
  context.redirect("/myTeams");
}
