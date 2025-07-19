function attachEvents() {
  const phonebookUI = document.getElementById("phonebook");

  const personRef = document.getElementById("person");
  const phoneRef = document.getElementById("phone");

  const BASE_URL = "http://localhost:3030/jsonstore/phonebook";

  const loadBtn = document.getElementById("btnLoad");
  loadBtn.addEventListener("click", onLoad);

  const createBtn = document.getElementById("btnCreate");
  createBtn.addEventListener("click", onCreate);

  async function onLoad() {
    try {
      const response = await fetch(BASE_URL);
      if (!response.ok) throw new Error(`Failed to load: ${response.status}`);

      const data = await response.json();

      phonebookUI.innerHTML = "";

      Object.values(data).forEach((element) => {
        const li = document.createElement("li");
        li.textContent = `${element.person}: ${element.phone}`;

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => onDelete(element._id));

        li.appendChild(deleteBtn);
        phonebookUI.appendChild(li);
      });
    } catch (error) {
      console.error("Error while fetching data:", error);
    }
  }

  async function onCreate() {
    const person = personRef.value.trim();
    const phone = phoneRef.value.trim();
    if (!person || !phone) return;

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ person, phone }),
    };

    try {
      const response = await fetch(BASE_URL, options);
      if (!response.ok) throw new Error(`Failed to create: ${response.status}`);

      personRef.value = "";
      phoneRef.value = "";

      await onLoad();
    } catch (error) {
      console.error("Error while creating entry:", error);
    }
  }

  async function onDelete(id) {
    try {
      const response = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error(`Failed to delete: ${response.status}`);

      await onLoad();
    } catch (error) {
      console.error("Error while deleting data:", error);
    }
  }
}

attachEvents();
