import page from "../node_modules/page/page.mjs";

import { clearUserData, updateNav } from "./utility.js";
import { addRender } from "./middlewares/render.js";
import { hasUser } from "./middlewares/guard.js";

import { logout } from "./data/user.js";

import { showHome } from "./views/home.js";
import { showDashboard } from "./views/dashboard.js";
import { showAddShow } from "./views/create.js";
import { showLogin, showRegister } from "./views/auth.js";

import { showEdit } from "./views/edit.js";
import { showDetails } from "./views/details.js";
import { showSearch } from "./views/search.js";

const logoutRef = document.querySelector('[data-id="logout"]');

logoutRef.addEventListener("click", async (e) => {
  e.preventDefault();
  await logout();
  clearUserData();
  updateNav();
  page.redirect("/");
});

page(addRender);
page("/", showHome);
page("/dashboard", showDashboard);
page("/create", hasUser, showAddShow);
page("/edit/:id", hasUser, showEdit);
page("/details/:id", showDetails);
page("/search", showSearch);
page("/login", showLogin);
page("/register", showRegister);
page("/search", showSearch);

updateNav();

page.start();
