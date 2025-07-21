import page from "../node_modules/page/page.mjs";

import { addRender } from "./middlewares/render.js";
import { updateNav } from "./api/userUtility.js";
import { hasUser } from "./middlewares/guard.js";

import { showHome } from "./views/home.js";
import { showDashboard } from "./views/dashboard.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";

import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { logoutHandler } from "./views/logoutHandler.js";

page(addRender);
page("/", showHome);
page("/dashboard", showDashboard);
page("/create", hasUser, showCreate);
page("/dashboard/details/:productId", showDetails);
page("/edit/:productId", hasUser, showEdit);

page("/logout", hasUser, logoutHandler);
page("/login", showLogin);
page("/register", showRegister);

updateNav();

page.start();
