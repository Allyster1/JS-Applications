import { html } from "../../node_modules/lit-html/lit-html.js";

import { userServices } from "../services/userService.js";

const registerTemplate = (onRegister) => html`<section id="register">
  <div class="form">
    <h2>Register</h2>
    <form class="register-form" @submit=${onRegister}>
      <input type="text" name="email" id="register-email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="register-password"
        placeholder="password"
      />
      <input
        type="password"
        name="re-password"
        id="repeat-password"
        placeholder="repeat password"
      />
      <button type="submit">register</button>
      <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
  </div>
</section>`;

const loginTemplate = (onLogin) => html`<section id="login">
  <div class="form">
    <h2>Login</h2>
    <form class="login-form" @submit=${onLogin}>
      <input type="text" name="email" id="email" placeholder="email" />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="password"
      />
      <button type="submit">login</button>
      <p class="message">
        Not registered? <a href="/register">Create an account</a>
      </p>
    </form>
  </div>
</section>`;

export function registerView(ctx) {
  ctx.render(registerTemplate(onRegister));
  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("re-password").trim();

    if (!email || !password) {
      return alert("All fields are required");
    }

    if (password !== rePass) {
      return alert("Passwords do not match");
    }

    try {
      await userServices.register(email, password);
      ctx.page.redirect("/");
    } catch (error) {
      return alert(error.message);
    }
  }
}

export function loginView(ctx) {
  ctx.render(loginTemplate(onLogin));

  async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!email || !password) {
      return alert("All fields are required");
    }

    try {
      await userServices.login(email, password);
      ctx.page.redirect("/");
    } catch (error) {
      return alert(error.message);
    }
  }
}

export async function logoutHandler(ctx) {
  try {
    await userServices.logout();
    ctx.page.redirect("/");
  } catch (error) {
    return alert(error.message);
  }
}
