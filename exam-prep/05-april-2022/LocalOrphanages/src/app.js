import page from "../node_modules/page/page.mjs";

import { addRender } from "./middlewares/render.js";
import { updateNav } from "./services/userUtility.js";

import { logoutHandler, showLogin, showRegister } from "./views/auth.js";

page(addRender);
page("/", () => console.log("dashboard"));
page("/posts", () => console.log("posts"));
page("/create", () => console.log("create"));
// page("/details", () => console.log("details"));
// page("/edit", () => console.log("edit"));
// page("/delete", () => console.log("delete"));

page("/login", showLogin);
page("/register", showRegister);
page("/logout", logoutHandler);

updateNav();

page.start();
