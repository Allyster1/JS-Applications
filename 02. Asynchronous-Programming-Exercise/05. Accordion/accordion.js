window.addEventListener("load", loadArticles);

async function loadArticles() {
  const mainSection = document.getElementById("main");

  try {
    const response = await fetch(
      "http://localhost:3030/jsonstore/advanced/articles/list"
    );
    const data = await response.json();

    for (const element of data) {
      const accordion = document.createElement("div");
      accordion.className = "accordion";

      accordion.innerHTML = `
        <div class="head">
          <span>${element.title}</span>
          <button class="button" id="${element._id}">More</button>
        </div>
        <div class="extra">
          <p></p>
        </div>
      `;

      const button = accordion.querySelector("button");
      const extra = accordion.querySelector(".extra");
      const p = extra.querySelector("p");

      extra.style.display = "none";

      button.addEventListener("click", async () => {
        if (button.textContent === "More") {
          try {
            const contentResponse = await fetch(
              `http://localhost:3030/jsonstore/advanced/articles/details/${button.id}`
            );
            const contentData = await contentResponse.json();

            p.textContent = contentData.content;
            extra.style.display = "block";
            button.textContent = "Less";
          } catch (error) {
            console.error("Failed to fetch article content:", error);
          }
        } else {
          extra.style.display = "none";
          button.textContent = "More";
        }
      });

      mainSection.appendChild(accordion);
    }
  } catch (error) {
    console.error("Failed to fetch article list:", error);
  }
}
