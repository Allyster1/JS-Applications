import { html } from "../../node_modules/lit-html/lit-html.js";

import { userService } from "../api/userService.js";
import { setUserData, updateNav } from "../api/userUtility.js";

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
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();

    if (!email || !password) {
      alert("All fields are required!");
      submitBtn.disabled = false;
      return;
    }

    try {
      const user = await userService.login(formData);
      setUserData(user);
      ctx.page.redirect("/");
      updateNav();
    } catch (error) {
      alert("Login failed");
    } finally {
      submitBtn.disabled = false;
    }
  }

  return ctx.render(loginTemplate(onLogin));
}
