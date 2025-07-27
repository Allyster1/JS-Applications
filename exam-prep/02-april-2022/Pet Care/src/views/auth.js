import { html } from "../../node_modules/lit-html/lit-html.js";

import { userServices } from "../services/userService.js";

const registerTemplate = (onRegister) => html`<section id="registerPage">
  <form class="registerForm" @submit=${onRegister}>
    <img src="./images/logo.png" alt="logo" />
    <h2>Register</h2>
    <div class="on-dark">
      <label for="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="steven@abv.bg"
        value=""
      />
    </div>

    <div class="on-dark">
      <label for="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <div class="on-dark">
      <label for="repeatPassword">Repeat Password:</label>
      <input
        id="repeatPassword"
        name="repeatPassword"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <button class="btn" type="submit">Register</button>

    <p class="field">
      <span>If you have profile click <a href="/login">here</a></span>
    </p>
  </form>
</section>`;

const loginTemplate = (onLogin) => html`<section id="loginPage">
  <form class="loginForm" @submit=${onLogin}>
    <img src="./images/logo.png" alt="logo" />
    <h2>Login</h2>

    <div>
      <label for="email">Email:</label>
      <input
        id="email"
        name="email"
        type="text"
        placeholder="steven@abv.bg"
        value=""
      />
    </div>

    <div>
      <label for="password">Password:</label>
      <input
        id="password"
        name="password"
        type="password"
        placeholder="********"
        value=""
      />
    </div>

    <button class="btn" type="submit">Login</button>

    <p class="field">
      <span>If you don't have profile click <a href="/register">here</a></span>
    </p>
  </form>
</section>`;

export function registerView(ctx) {
  ctx.render(registerTemplate(onRegister));
  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("repeatPassword").trim();

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
