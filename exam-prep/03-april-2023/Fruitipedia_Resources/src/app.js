import page from "../node_modules/page/page.mjs";

import { addRender } from "./middlewares/render.js";
import { showHome } from "./views/home.js";

page(addRender);
page("/", showHome);
page("/dashboard", () => console.log("dashboard"));
page("/search", () => console.log("search"));
page("/create", () => console.log("create"));

page("/login", () => console.log("login"));
page("/register", () => console.log("register"));
page("/logout", () => console.log("logout"));

page.start();
