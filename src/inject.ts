(() => {
  const BUTTON_ID = "my-extension-button";
  console.log("Inside Inject ts file");
  if (document.getElementById(BUTTON_ID)) return;

  function conditionsMet(): boolean {
    return (
      document.querySelector(".required-class") !== null &&
      document.querySelector(".another-class") !== null
    );
  }

  function insertButton() {
    if (!conditionsMet()) return;

    if (document.getElementById(BUTTON_ID)) return;

    const button = document.createElement("button");
    button.id = BUTTON_ID;
    button.textContent = "My Extension";

    Object.assign(button.style, {
      position: "fixed",
      bottom: "20px",
      right: "20px",
      zIndex: "99999",
      padding: "10px 14px",
      background: "#2563eb",
      color: "#fff",
      borderRadius: "6px",
      border: "none",
      cursor: "pointer"
    });

    button.onclick = () => {
      alert("Extension button clicked!");
    };

    document.body.appendChild(button);
    observer.disconnect();
  }

  // Wait for full render (SPA-safe)
  const observer = new MutationObserver(() => {
    insertButton();
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  window.addEventListener("load", insertButton);
})();
