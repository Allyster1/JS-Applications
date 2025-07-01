async function lockedProfile() {
  const main = document.getElementById("main");
  main.innerHTML = "";

  const response = await fetch(
    "http://localhost:3030/jsonstore/advanced/profiles"
  );
  const data = await response.json();

  let index = 1;

  for (const profile of Object.values(data)) {
    const profileDiv = document.createElement("div");
    profileDiv.className = "profile";

    profileDiv.innerHTML = `
      <img src="./iconProfile2.png" class="userIcon" />
      <label>Lock</label>
      <input type="radio" name="user${index}Locked" value="lock" checked>
      <label>Unlock</label>
      <input type="radio" name="user${index}Locked" value="unlock"><br>
      <hr>
      <label>Username</label>
      <input type="text" name="user${index}Username" value="${profile.username}" disabled readonly />
      <div class="hiddenInfo">
        <hr>
        <label>Email:</label>
        <input type="email" name="user${index}Email" value="${profile.email}" disabled readonly />
        <label>Age:</label>
        <input type="number" name="user${index}Age" value="${profile.age}" disabled readonly />
      </div>
      <button>Show more</button>
    `;

    const hiddenDiv = profileDiv.querySelector(".hiddenInfo");
    const button = profileDiv.querySelector("button");

    button.addEventListener("click", () => {
      const isUnlocked = profileDiv.querySelector(
        `input[name="user${index}Locked"][value="unlock"]`
      ).checked;

      if (!isUnlocked) return;

      const labels = hiddenDiv.querySelectorAll("label, input, hr");
      const isHidden = labels[0].style.display !== "block";

      labels.forEach((el) => {
        el.style.display = isHidden
          ? el.tagName === "INPUT"
            ? "inline-block"
            : "block"
          : "none";
      });

      button.textContent = isHidden ? "Hide it" : "Show more";
    });

    main.appendChild(profileDiv);
    index++;
  }
}
