import page from "../node_modules/page/page.mjs";

import { addRender } from "./middlewares/render.js";
import { hasUser } from "./middlewares/guard.js";
import { updateNav } from "./api/userUtility.js";

import { showHome } from "./views/home.js";
import { showDashboard } from "./views/dashboard.js";
import { showCreate } from "./views/create.js";
import { showSearch } from "./views/search.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";

import { showRegister } from "./views/register.js";
import { showLogin } from "./views/login.js";
import { logoutHandler } from "./views/logoutHandler.js";

page(addRender);
page("/", showHome);
page("/dashboard", showDashboard);
page("/search", showSearch);
page("/create", hasUser, showCreate);
page("/dashboard/details/:productId", showDetails);
page("/edit/:productId", hasUser, showEdit);

page("/login", showLogin);
page("/register", showRegister);
page("/logout", hasUser, logoutHandler);

updateNav();

page.start();
