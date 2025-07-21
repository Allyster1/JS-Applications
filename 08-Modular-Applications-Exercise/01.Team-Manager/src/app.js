import page from "../node_modules/page/page.mjs";

import { addRender } from "./utility/render.js";
import { updateNav } from "./utility/updateNav.js";

import { showHome } from "./views/home.js";

page(addRender);
page("/", showHome);
page("/browseTeam", () => console.log("browseTeam"));
page("/myTeams", () => console.log("myTeams"));
page("/details/:id", () => console.log("details"));

page("/logout", () => console.log("home"));
page("/login", () => console.log("login"));
page("/register", () => console.log("register"));

page.start();

updateNav();
