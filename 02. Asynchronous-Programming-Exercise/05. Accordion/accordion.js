function solution() {
  const showMoreBtn = document.querySelector(".button");
  const extraInfo = document.querySelector(".extra");

  showMoreBtn.addEventListener("click", getData);

  let isShown = false;

  async function getData() {
    const id = showMoreBtn.id;

    if (!isShown) {
      const response = await fetch(
        `http://localhost:3030/jsonstore/advanced/articles/details/${id}`
      );
      const data = await response.json();

      extraInfo.innerHTML = `<p>${data.content}</p>`;
      extraInfo.style.display = "block";
      showMoreBtn.textContent = "Less";
    } else {
      extraInfo.innerHTML = `<p>Scalable Vector Graphics .....</p>`;
      extraInfo.style.display = "none";
      showMoreBtn.textContent = "More";
    }

    isShown = !isShown;
  }
}
solution();
