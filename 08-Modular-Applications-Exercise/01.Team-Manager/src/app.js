import page from "../node_modules/page/page.mjs";

import { addRender } from "./utility/render.js";
import { updateNav } from "./utility/updateNav.js";

import { showHome } from "./views/home.js";
import { showBrowseTeam } from "./views/browseTeam.js";
import { showMyTeam } from "./views/myTeam.js";

import { showCreate } from "./views/create.js";
import { showEdit } from "./views/edit.js";

import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";

page(addRender);
page("/", showHome);
page("/browseTeam", showBrowseTeam);
page("/myTeams", showMyTeam);
page("/details/:id", () => console.log("details"));
page("/create", showCreate);
page("/edit", showEdit);

page("/logout", () => console.log("home"));
page("/login", showLogin);
page("/register", showRegister);

updateNav();

page.start();
