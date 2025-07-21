import { getUserData } from "../api/userUtility.js";

export function hasUser(ctx, next) {
  const userData = getUserData();

  if (!userData) {
    return ctx.page.redirect("/login");
  }

  next();
}
