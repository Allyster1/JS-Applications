import { html } from "../../node_modules/lit-html/lit-html.js";

import { login, register } from "../data/user.js";
import { saveUserData, updateNav } from "../utility.js";

const loginTemplate = (onLogin) => html` <section id="login">
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

export function showLogin(ctx) {
  ctx.render(loginTemplate(onLogin));

  async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    if (!email || !password) {
      return alert("All fields are required!");
    }

    ctx.render(loginTemplate());

    const data = await login(email, password);
    saveUserData({
      id: data._id,
      accessToken: data.accessToken,
    });

    updateNav();
    ctx.page.redirect("/");
  }
}

const registerTemplate = (onRegister) => html` <section id="register">
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

export function showRegister(ctx) {
  ctx.render(registerTemplate(onRegister));

  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const rePass = formData.get("re-password");

    if (!email || !password || !rePass) {
      return alert("All fields are required!");
    }

    if (password !== rePass) {
      return alert("Passwords do not match!");
    }
    const data = await register(email, password, rePass);
    saveUserData({
      id: data._id,
      accessToken: data.accessToken,
    });

    updateNav();
    ctx.page.redirect("/");
  }
}
