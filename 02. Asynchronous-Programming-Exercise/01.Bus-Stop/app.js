async function getInfo() {
  const stopNameRef = document.getElementById("stopName");
  const busRef = document.getElementById("buses");

  const stopIdRef = document.getElementById("stopId");

  const stopId = stopIdRef.value;
  const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`;

  try {
    stopIdRef.value = "";
    busRef.replaceChildren();
    const response = await fetch(url);

    if (response.status !== 200) {
      throw Error("Stop Id is not found!");
    }

    const data = await response.json();

    stopNameRef.textContent = data.name;

    for (const [busNumber, arrivalTime] of Object.entries(data.buses)) {
      const li = document.createElement("li");
      li.textContent = `Bus ${busNumber} arrives in ${arrivalTime}`;

      busRef.appendChild(li);
    }
  } catch (error) {
    stopNameRef.textContent = "Error";
  }
}
