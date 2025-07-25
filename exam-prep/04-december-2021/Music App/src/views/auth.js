import { html } from "../../node_modules/lit-html/lit-html.js";

import { userServices } from "../services/userService.js";

const registerTemplate = (onRegister) => html`<section id="registerPage">
  <form @submit=${onRegister}>
    <fieldset>
      <legend>Register</legend>

      <label for="email" class="vhide">Email</label>
      <input
        id="email"
        class="email"
        name="email"
        type="text"
        placeholder="Email"
      />

      <label for="password" class="vhide">Password</label>
      <input
        id="password"
        class="password"
        name="password"
        type="password"
        placeholder="Password"
      />

      <label for="conf-pass" class="vhide">Confirm Password:</label>
      <input
        id="conf-pass"
        class="conf-pass"
        name="conf-pass"
        type="password"
        placeholder="Confirm Password"
      />

      <button type="submit" class="register">Register</button>

      <p class="field">
        <span>If you already have profile click <a href="/login">here</a></span>
      </p>
    </fieldset>
  </form>
</section>`;

const loginTemplate = (onSubmit) => html`<section id="loginPage">
  <form @submit=${onSubmit}>
    <fieldset>
      <legend>Login</legend>

      <label for="email" class="vhide">Email</label>
      <input
        id="email"
        class="email"
        name="email"
        type="text"
        placeholder="Email"
      />

      <label for="password" class="vhide">Password</label>
      <input
        id="password"
        class="password"
        name="password"
        type="password"
        placeholder="Password"
      />

      <button type="submit" class="login">Login</button>

      <p class="field">
        <span
          >If you don't have profile click <a href="/register">here</a></span
        >
      </p>
    </fieldset>
  </form>
</section>`;

export function registerView(ctx) {
  ctx.render(registerTemplate(onRegister));
  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("conf-pass").trim();

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
