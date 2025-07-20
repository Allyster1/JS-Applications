import { html } from "../../node_modules/lit-html/lit-html.js";

import { userService } from "../api/userService.js";
import { setUserData, updateNav } from "../api/userUtility.js";

const registerTemplate = (onRegister) => html`
  <!-- Register Page (Only for Guest users) -->
  <section id="register">
    <div class="form">
      <h2>Register</h2>
      <form class="register-form" @submit=${onRegister}>
        <input
          type="text"
          name="email"
          id="register-email"
          placeholder="email"
        />
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
  </section>
`;

export function showRegister(ctx) {
  async function onRegister(e) {
    e.preventDefault();

    const form = e.currentTarget;
    const submitBtn = form.querySelector("button[type=submit]");
    submitBtn.disabled = true;

    const formData = new FormData(form);
    const email = formData.get("email").trim();
    const password = formData.get("password").trim();
    const rePass = formData.get("re-password").trim();

    if (!email || !password || !rePass) {
      alert("All fields are required!");
      submitBtn.disabled = false;
      return;
    }

    if (password !== rePass) {
      alert("Passwords don't match");
      submitBtn.disabled = false;
      return;
    }

    try {
      const user = await userService.register(formData);
      setUserData(user);
      ctx.page.redirect("/");
      updateNav();
    } catch (error) {
      alert("Register failed");
    } finally {
      submitBtn.disabled = false;
    }
  }

  return ctx.render(registerTemplate(onRegister));
}
