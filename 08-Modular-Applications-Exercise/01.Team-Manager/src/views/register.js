import { html } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../service/userService.js";
import { createSubmitHandler } from "../utility/createSubmitHandler.js";

const registerTemplate = (handler, error) => html`
  <section id="register">
    <article class="narrow">
      <header class="pad-med">
        <h1>Register</h1>
      </header>
      <form id="register-form" class="main-form pad-large" @submit=${handler}>
        ${Boolean(error)
          ? html`<div class="error">${error.message}</div>`
          : null}
        <label>E-mail: <input type="text" name="email" /></label>
        <label>Username: <input type="text" name="username" /></label>
        <label>Password: <input type="password" name="password" /></label>
        <label>Repeat: <input type="password" name="repass" /></label>
        <input class="action cta" type="submit" value="Create Account" />
      </form>
      <footer class="pad-small">
        Already have an account?
        <a href="/login" class="invert">Sign in here</a>
      </footer>
    </article>
  </section>
`;

let context = null;

export function showRegister(ctx) {
  ctx.render(registerTemplate(createSubmitHandler(onSubmit)));
  context = ctx;
}

async function onSubmit(email, password) {
  if (
    !email ||
    !password ||
    password.length < 3 ||
    username.length < 3 ||
    repass !== username
  ) {
    context.render(
      createSubmitHandler(
        registerTemplate(onSubmit(), { message: "All fields are required!" })
      )
    );
  }

  await userService.register(email, password, username);
  context.redirect("/myTeams");
}
