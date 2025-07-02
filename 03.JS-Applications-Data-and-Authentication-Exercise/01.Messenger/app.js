function attachEvents() {
  const messageUI = document.getElementById("messages");

  const authorRef = document.querySelector('input[name="author"]');
  const contentRef = document.querySelector('input[name="content"]');

  const submitBtn = document.getElementById("submit");
  const refreshBtn = document.getElementById("refresh");

  const BASE_URL = "http://localhost:3030/jsonstore/messenger";

  submitBtn.addEventListener("click", submitMessage);

  async function submitMessage() {
    const authorName = authorRef.value.trim();
    const message = contentRef.value.trim();

    if (!authorName || !message) {
      return;
    }

    try {
      const response = await fetch(BASE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          author: authorName,
          content: message,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      throw new Error(`Error ${error}`);
    }

    authorRef.value = "";
    contentRef.value = "";
  }

  refreshBtn.addEventListener("click", getMessages);

  async function getMessages() {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      messageUI.value = "";

      const messages = Object.values(data);
      const formattedMsg = messages
        .map((msg) => `${msg.author}: ${msg.content}`)
        .join("\n");

      messageUI.value = formattedMsg;
    } catch (error) {
      throw new Error(`Error ${error}`);
    }
  }
}

attachEvents();
