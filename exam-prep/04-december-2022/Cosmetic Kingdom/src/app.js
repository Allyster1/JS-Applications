import page from "../node_modules/page/page.mjs";

import { addRender } from "./middlewares/render.js";
import { showHome } from "./views/home.js";

page(addRender);
page("/", showHome);
page("/dashboard", () => console.log("dashboard"));
page("/create", () => console.log("create"));

page("/logout", () => console.log("logout"));
page("/login", () => console.log("login"));
page("/register", () => console.log("register"));

page.start();
