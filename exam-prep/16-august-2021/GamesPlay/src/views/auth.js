import { html } from "../../node_modules/lit-html/lit-html.js";
import { userServices } from "../services/userService.js";

const registerTemplate = (onRegister) => html`<section
  id="register-page"
  class="content auth"
>
  <form id="register" @submit=${onRegister}>
    <div class="container">
      <div class="brand-logo"></div>
      <h1>Register</h1>

      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="maria@email.com"
      />

      <label for="pass">Password:</label>
      <input type="password" name="password" id="register-password" />

      <label for="con-pass">Confirm Password:</label>
      <input type="password" name="confirm-password" id="confirm-password" />

      <input class="btn submit" type="submit" value="Register" />

      <p class="field">
        <span>If you already have profile click <a href="/login">here</a></span>
      </p>
    </div>
  </form>
</section>`;

const loginTemplate = (onLogin) => html`<section id="login-page" class="auth">
  <form id="login" @submit=${onLogin}>
    <div class="container">
      <div class="brand-logo"></div>
      <h1>Login</h1>
      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        placeholder="Sokka@gmail.com"
      />

      <label for="login-pass">Password:</label>
      <input type="password" id="login-password" name="password" />
      <input type="submit" class="btn submit" value="Login" />
      <p class="field">
        <span
          >If you don't have profile click <a href="/register">here</a></span
        >
      </p>
    </div>
  </form>
</section>`;

export function registerView(ctx) {
  ctx.render(registerTemplate(onRegister));
  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("confirm-password").trim();

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
