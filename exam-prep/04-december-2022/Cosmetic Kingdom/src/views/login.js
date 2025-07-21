import { html } from "../../node_modules/lit-html/lit-html.js";
import { setUserData, updateNav } from "../api/userUtility.js";

import { userService } from "../api/userService.js";

const loginTemplate = (onLogin) => html`
  <section id="login">
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
  </section>
`;

export function showLogin(ctx) {
  async function onLogin(e) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!email || !password) {
      return alert("All fields are required!");
    }

    try {
      const user = await userService.login(formData);
      setUserData(user);
      ctx.page.redirect("/");
      updateNav();
    } catch (error) {
      alert("Login failed");
    }
  }

  return ctx.render(loginTemplate(onLogin));
}
