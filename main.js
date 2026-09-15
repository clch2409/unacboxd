import peliculas from "./peliculas.json" with { type: "json" };

const contenedor_img = document.querySelector(".contenedor-img");

contenedor_img.addEventListener("click", (target) => {
  if (target.target.tagName === "SPAN") {
    target.target.classList.toggle("favourite");
  }
});
