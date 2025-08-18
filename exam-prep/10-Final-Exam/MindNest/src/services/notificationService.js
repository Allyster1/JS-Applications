export function showNotification(message, type = "error") {
  const errorBox = document.getElementById("errorBox");

  if (!errorBox) {
    console.error("Error box not found");
    return;
  }

  const msgSpan = errorBox.querySelector(".msg");

  if (!msgSpan) {
    console.error("Message span not found");
    return;
  }

  msgSpan.textContent = message;

  errorBox.style.display = "block";
  console.log(
    "Notification displayed:",
    message,
    "ErrorBox visible:",
    errorBox.style.display
  );

  setTimeout(() => {
    if (errorBox) {
      errorBox.style.display = "none";
    }
  }, 3000);
}

export function hideNotification() {
  const errorBox = document.getElementById("errorBox");
  if (errorBox) {
    errorBox.style.display = "none";
  }
}
