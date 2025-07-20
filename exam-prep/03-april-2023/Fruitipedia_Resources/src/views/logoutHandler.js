import { userService } from "../api/userService.js";
import { updateNav } from "../api/userUtility.js";
import page from "../../node_modules/page/page.mjs";

export async function logoutHandler() {
  try {
    await userService.logout();
  } catch (error) {
    console.log("Logout failed");
  }

  updateNav();
  page.redirect("/");
}
