export const Overlay = () => {
  const closeOverlay = () => {
    const overlay = document.querySelector(".layout-overlay");
    const html = document.querySelector("html");
    html.classList.remove("layout-expanded");
    if (overlay.style.display === "block") overlay.style.display = "none";
  };

  return (
    <div
      className="layout-overlay layout-sidenav-toggle"
      style={{ display: "none" }}
      onClick={closeOverlay}
    ></div>
  );
};
