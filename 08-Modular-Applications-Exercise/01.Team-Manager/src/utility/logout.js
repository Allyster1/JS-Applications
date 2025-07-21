import { userService } from "../service/userService.js";
import { updateNav } from "./updateNav.js";

export async function logout(ctx) {
  await userService.logout;
  updateNav();
  ctx.redirect("/");
}
