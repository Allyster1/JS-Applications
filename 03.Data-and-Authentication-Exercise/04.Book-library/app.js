function handleLibraryData() {
  const tbodyRef = document.querySelector("tbody");

  const authorRef = document.getElementById("author");
  const titleRef = document.getElementById("title");

  const BASE_URL = "http://localhost:3030/jsonstore/collections/books";

  const loadBtn = document.getElementById("loadBooks");
  loadBtn.addEventListener("click", onLoad);

  const createBtn = document.getElementById("createBtn");
  createBtn.addEventListener("click", onCreate);

  async function onLoad() {
    try {
      const response = await fetch(BASE_URL);

      if (!response.ok) {
        return;
      }

      const data = await response.json();

      tbodyRef.replaceChildren();

      Object.values(data).forEach((element) => {
        generateHTML(element);
      });
    } catch (error) {
      throw new Error("Error while fetching data", error);
    }
  }

  async function onCreate(event) {
    event.preventDefault();

    const author = authorRef.value;
    const title = titleRef.value;

    if (!author || !title) return;

    try {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ author, title }),
      };

      const response = await fetch(BASE_URL, options);
      if (!response.ok) {
        throw new Error("Failed to create book");
      }
      const data = await response.json();

      generateHTML(data);

      authorRef.value = "";
      titleRef.value = "";
    } catch (error) {
      console.error("Error while creating data:", error);
    }
  }

  function generateHTML(book) {
    const tr = document.createElement("tr");
    tr._id = book._id;

    const tdTitle = document.createElement("td");
    tdTitle.textContent = book.title;

    const tdAuthor = document.createElement("td");
    tdAuthor.textContent = book.author;

    const tdActions = document.createElement("td");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.addEventListener("click", editContent);

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.addEventListener("click", deleteContent);

    tdActions.append(editBtn, delBtn);
    tr.append(tdTitle, tdAuthor, tdActions);
    tbodyRef.appendChild(tr);
  }

  async function editContent(event) {
    createBtn.textContent = "Save";
  }

  async function deleteContent(event) {
    const row = event.target.closest("tr");
    const id = row._id;

    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const response = await fetch(`${BASE_URL}/${id}`, options);

      if (!response.ok) {
        return;
      }

      row.remove();
    } catch (error) {
      throw new Error("Failed to delete book");
    }
  }
}
handleLibraryData();
