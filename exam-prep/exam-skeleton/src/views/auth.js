import { html } from "../../node_modules/lit-html/lit-html.js";

import { userServices } from "../services/userService.js";

// TODO: update register template / update the onRegister handler
const registerTemplate = () => html``;

// TODO: update login template / update the onLogin handler
const loginTemplate = () => html``;

// TODO: keep for testing purposes (remove after testing)
export function registerView(ctx) {
  ctx.render(registerTemplate(onRegister));
}

// TODO: update register view
// export function registerView(ctx) {
//   ctx.render(registerTemplate(onRegister));
//   async function onRegister(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);

//     const email = formData.get("email").trim();
//     const password = formData.get("password").trim();
//     const rePass = formData.get("re-password").trim();

//     if (!email || !password) {
//       return alert("All fields are required");
//     }

//     if (password !== rePass) {
//       return alert("Passwords do not match");
//     }

//     try {
//       await userServices.register(email, password);
//       ctx.page.redirect("/dashboard");
//     } catch (error) {
//       return alert(error.message);
//     }
//   }
// }

// TODO: keep for testing purposes (remove after testing)
export function loginView(ctx) {
  ctx.render(loginTemplate(onLogin));
}

// TODO: update login view
// export function loginView(ctx) {
//   ctx.render(loginTemplate(onLogin));

//   async function onLogin(event) {
//     event.preventDefault();

//     const formData = new FormData(event.target);

//     const email = formData.get("email").trim();
//     const password = formData.get("password").trim();

//     if (!email || !password) {
//       return alert("All fields are required");
//     }

//     try {
//       await userServices.login(email, password);
//       ctx.page.redirect("/dashboard");
//     } catch (error) {
//       return alert(error.message);
//     }
//   }
// }

// TODO: update logout handler route
export async function logoutHandler(ctx) {
  try {
    await userServices.logout();
    ctx.page.redirect("/dashboard");
  } catch (error) {
    return alert(error.message);
  }
}
