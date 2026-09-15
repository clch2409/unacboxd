import peliculas from "./peliculas.json" with { type: "json" };

let peliculas_filtradas = [...peliculas];

const contenedor_img = document.querySelector(".contenedor-img");
const dialog = document.getElementById("rating-dialog");
const rating_close = document.getElementById("rating-close");

contenedor_img.addEventListener("click", mostrarModal);
contenedor_img.addEventListener("click", agregarFavoritoCalificada);
rating_close.addEventListener("click", cerrarModal);

mostrarPeliculas();

function mostrarPeliculas() {
  let html = ``;
  peliculas_filtradas.forEach((peli) => {
    html += `
      <div class="contenedor-peli">
        <img src="${peli.poster}" alt="${peli.titulo}">
        <span class="material-symbols-outlined non-favourite heart" id="peli-${peli.id}">favorite</span>
        <span class="material-symbols-outlined non-calificated star" id="peli-${peli.id}">star</span>
    </div>
    `;
  });
  contenedor_img.innerHTML = html;
}

function agregarFavoritoCalificada(evento) {
  let target = evento.target;
  if (target.tagName == "SPAN") {
    let target_id = evento.target.id;
    let numero_id = target_id.split("-")[1];
    let pelicula_encontrada = peliculas_filtradas.find(
      (peli) => peli.id == numero_id,
    );

    if (target.classList.contains("heart")) {
      target.classList.toggle("favourite-heart");
      target.classList.toggle("non-favourite");
      if (target.classList.contains("favourite-heart")) {
        pelicula_encontrada.favorito = true;
      } else if (target.classList.contains("non-favourite")) {
        pelicula_encontrada.favorito = false;
      }
    } else if (target.classList.contains("star")) {
      target.classList.toggle("calificated");
      target.classList.toggle("non-calificated");
      if (target.classList.contains("calificated")) {
        pelicula_encontrada.calificada = true;
      } else if (target.classList.contains("non-calificated")) {
        pelicula_encontrada.calificada = false;
      }
    }
  }
}

function mostrarModal(evento) {
  let target = evento.target;

  if (
    target.tagName == "SPAN" &&
    target.classList.contains("star") &&
    target.classList.contains("non-calificated")
  ) {
    dialog.showModal();
    document.querySelector("body").classList.toggle("dont-move");
  }
}

function cerrarModal() {
  dialog.close();
  document.querySelector("body").classList.toggle("dont-move");
}
