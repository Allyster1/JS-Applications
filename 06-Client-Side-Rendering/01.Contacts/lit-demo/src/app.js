import { html, render } from "../node_modules/lit-html/lit-html.js";

// Layout: header + main content
const layout = (menu, page) => html`
  <header>${menu}</header>
  <main>${page}</main>
`;

// Menu component: renders nav links
const menu = (links) => html` <nav>${links.map(link)}</nav> `;

// Single link item
const link = ({ href, label }) => html`
  <a href="${href}" @click=${onNavClick}>${label}</a>
`;

// Page content with optional message and input to test input event
const page = (title, content, inputValue) => html`<section>
  <h1>${title}</h1>
  ${content
    ? html`<p>${content}</p>`
    : html`<p class="notice">No content yet</p>`}

  <input
    type="text"
    placeholder="Type something"
    .value=${inputValue}
    @input=${onInputChange}
  />
  <p>You typed: ${inputValue}</p>

  <button @click=${onButtonClick}>Click me</button>
  <p>Button clicked ${clickCount} times</p>
</section> `;

let counter = 1;
let clickCount = 0;
let typedText = "";
let currentPage = "Home-Page";

// Event handlers

function onNavClick(e) {
  e.preventDefault();
  currentPage = e.target.textContent;
  update();
}

function onInputChange(e) {
  typedText = e.target.value;
  update();
}

function onButtonClick() {
  clickCount++;
  update();
}

// Update function: renders to body
function update() {
  render(
    layout(
      menu([
        { href: "/", label: "Home" },
        { href: "/catalog", label: "Catalog" },
        { href: "/about", label: "About" },
      ]),
      page(
        currentPage,
        `You have visited this page ${counter++} times`,
        typedText
      )
    ),
    document.body
  );
}

// Expose update globally so button in HTML can call it if needed
window.update = update;
