import peliculas from "./peliculas.json" with { type: "json" };

let peliculas_filtradas = [...peliculas];

const contenedor_img = document.querySelector(".contenedor-img");

contenedor_img.addEventListener("click", (target) => {
  let imagen = target;
  let corazon = imagen.target;

  if (corazon.tagName == "SPAN") {
    corazon.classList.toggle("favourite");
  }
});
