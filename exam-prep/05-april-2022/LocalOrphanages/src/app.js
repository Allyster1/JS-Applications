import page from "../node_modules/page/page.mjs";

import { addRender } from "./middlewares/render.js";

page(addRender);
page("/", () => console.log("dashboard"));
page("/posts", () => console.log("posts"));
page("/create", () => console.log("create"));
// page("/details", () => console.log("details"));
// page("/edit", () => console.log("edit"));
// page("/delete", () => console.log("delete"));

page("/login", () => console.log("login"));
page("/register", () => console.log("register"));
page("/logout", () => console.log("logout"));

page.start();
