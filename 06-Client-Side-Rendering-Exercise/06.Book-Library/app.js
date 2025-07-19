import { html, render } from "./node_modules/lit-html/lit-html.js";

const tableRoot = document.getElementById("tableRoot");
const formRoot = document.getElementById("formRoot");

const tableTemplate = (books) => html`
  <button id="loadBooks" @click=${onLoadAllBook}>LOAD ALL BOOKS</button>
  <table>
    <thead>
      <tr>
        <th>Title</th>
        <th>Author</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${books?.map((book) => bookTempalte(book))}
    </tbody>
  </table>
`;

const bookTempalte = (book) => html`
  <tr>
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>
      <button data-id=${book.id} @click=${onEdit}>Edit</button>
      <button data-id=${book.id} @click=${onDelete}>Delete</button>
    </td>
  </tr>
`;

const booksTemplate = () => html` <form @submit=${onSubmit} id="add-form">
  <h3>Add book</h3>
  <label>TITLE</label>
  <input type="text" name="title" placeholder="Title..." />
  <label>AUTHOR</label>
  <input type="text" name="author" placeholder="Author..." />
  <input type="submit" value="Submit" />
</form>`;

const editBookTemplate = (book) => html`
  <form @submit=${onubmitEditBook} id="edit-form">
    <input type="hidden" name="id" data-id=${book.id} />
    <h3>Edit book</h3>
    <label>TITLE</label>
    <input
      type="text"
      name="title"
      placeholder="Title..."
      value=${book.title}
    />
    <label>AUTHOR</label>
    <input
      type="text"
      name="author"
      placeholder="Author..."
      value=${book.author}
    />
    <input type="submit" value="Save" />
  </form>
`;

render(tableTemplate(), tableRoot);
render(booksTemplate(), formRoot);

function onubmitEditBook(e) {
  e.preventDefault();

  const formData = new FormData(e.target);

  const { id, title, author } = Object.fromEntries(formData);

  if (!title || !author) {
    return;
  }

  storeEditBook(id, { title, author });
}

function storeEditBook() {}

async function onLoadAllBook() {
  const response = await fetch(
    "http://localhost:3030/jsonstore/collections/books"
  );
  const data = await response.json();

  Object.entries(data).forEach(([k, v]) => (v.id = k));

  render(tableTemplate(Object.values(data)), tableRoot);
}

async function saveBook(data) {
  const option = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };

  await fetch("http://localhost:3030/jsonstore/collections/books", option);
  onLoadAllBook();
}

function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const { title, author } = Object.fromEntries(formData);

  if (!title || !author) {
    return;
  }

  e.target.reset();
  saveBook(title, author);
}

async function onEdit(e) {
  const id = e.target.dataset.id;
  const response = await fetch(
    "http://localhost:3030/jsonstore/collections/books/" + id
  );
  const data = await response.JSON();

  render(editBookTemplate(data), formRoot);
}

async function onDelete(e) {
  const id = e.target.dataset.id;
  await fetch("http://localhost:3030/jsonstore/collections/books/" + id, {
    method: "DELETE",
  });
  onLoadAllBook();
}
