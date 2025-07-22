import { html } from "../../node_modules/lit-html/lit-html.js";
import { userService } from "../services/userService.js";

const loginTemplate = (onLogin) => html` <section id="login-page" class="auth">
  <form id="login" @submit=${onLogin}>
    <h1 class="title">Login</h1>

    <article class="input-group">
      <label for="login-email">Email: </label>
      <input type="email" id="login-email" name="email" />
    </article>

    <article class="input-group">
      <label for="password">Password: </label>
      <input type="password" id="password" name="password" />
    </article>

    <input type="submit" class="btn submit-btn" value="Log In" />
  </form>
</section>`;

const registerTemplate = (onRegister) => html` <section
  id="register-page"
  class="auth"
>
  <form id="register" @submit=${onRegister}>
    <h1 class="title">Register</h1>

    <article class="input-group">
      <label for="register-email">Email: </label>
      <input type="email" id="register-email" name="email" />
    </article>

    <article class="input-group">
      <label for="register-password">Password: </label>
      <input type="password" id="register-password" name="password" />
    </article>

    <article class="input-group">
      <label for="repeat-password">Repeat Password: </label>
      <input type="password" id="repeat-password" name="repeatPassword" />
    </article>

    <input type="submit" class="btn submit-btn" value="Register" />
  </form>
</section>`;

export async function showLogin(ctx) {
  ctx.render(loginTemplate(onLogin));

  async function onLogin(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      await userService.login(email, password);
      ctx.page.redirect("/");
    } catch (error) {
      return alert(error.message);
    }
  }
}

export async function showRegister(ctx) {
  ctx.render(registerTemplate(onRegister));

  async function onRegister(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const email = formData.get("email");
    const password = formData.get("password");
    const repeatPassword = formData.get("repeatPassword");

    if (password !== repeatPassword) {
      return alert("Passwords do not match");
    }

    try {
      await userService.register(email, password);
      ctx.page.redirect("/");
    } catch (error) {
      return alert(error.message);
    }
  }
}

export async function logoutHandler(ctx) {
  try {
    await userService.logout();
    ctx.page.redirect("/");
  } catch (error) {
    return alert(error.message);
  }
}
