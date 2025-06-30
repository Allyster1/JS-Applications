function solve() {
  const departBtn = document.getElementById("depart");
  const arriveBtn = document.getElementById("arrive");

  const infoTextRef = document.querySelector(".info");
  let current = "";
  let next = "depot";

  let url = `http://localhost:3030/jsonstore/bus/schedule/${next}`;

  async function depart() {
    const response = await fetch(url);

    if (response.status !== 200) {
      throw Error("Invalid request");
    }

    try {
      const data = await response.json();

      current = data.name;
      next = data.next;

      infoTextRef.textContent = `Next stop ${data.name}`;

      departBtn.disabled = true;
      arriveBtn.disabled = false;
    } catch (error) {
      infoTextRef.textContent = "error";
      departBtn.disabled = true;
      arriveBtn.disabled = true;
    }
  }

  async function arrive() {
    infoTextRef.textContent = `Arriving at ${current}`;

    url = `http://localhost:3030/jsonstore/bus/schedule/${next}`;

    departBtn.disabled = false;
    arriveBtn.disabled = true;
  }

  return {
    depart,
    arrive,
  };
}

let result = solve();
