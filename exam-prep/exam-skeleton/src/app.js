import page from "../node_modules/page/page.mjs";

import { addRender } from "./middlewares/render.js";
import { hasUser } from "./middlewares/guard.js";
import { updateNav } from "./services/userUtility.js";

import { homeView } from "./views/home.js";
import { registerView, loginView, logoutHandler } from "./views/auth.js";

import { dashboardView } from "./views/dashboard.js";
import { createView } from "./views/create.js";
import { detailsView } from "./views/details.js";
import { editView } from "./views/edit.js";

// TODO: update routes
page(addRender);
page("/", homeView);
page("/dashboard", dashboardView);
page("/create", hasUser, createView);
page("/details/:id", detailsView);
page("/edit/:id", hasUser, editView);

page("/login", loginView);
page("/register", registerView);
page("/logout", hasUser, logoutHandler);

updateNav();

page.start();
