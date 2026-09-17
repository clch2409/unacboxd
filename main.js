import peliculas from "./peliculas.json" with { type: "json" };

let peliculas_original = [...peliculas];
let peliculas_filtradas = peliculas_original;
let tipoBusqueda = "";

const contenedor_img = document.querySelector(".contenedor-img");
const dialog = document.getElementById("rating-dialog");
const rating_close = document.getElementById("rating-close");
const list_options = document.querySelector(".list-options");
const reset_filter_icon = document.querySelector(".non-filter-icon");
const find_movie = document.getElementById("find-movie");
const radios = document.querySelector(".radios");
const reset_find_icon = document.querySelector(".quit-find-icon");
const all_radio_buttons = document.querySelectorAll(".radiobutton");

contenedor_img.addEventListener("click", mostrarModal);
contenedor_img.addEventListener("click", agregarFavoritoCalificada);
rating_close.addEventListener("click", cerrarModal);
list_options.addEventListener("click", filtrarPeliculas);
reset_filter_icon.addEventListener("click", resetPeliculas);
find_movie.addEventListener("keyup", buscarPeliculas);
radios.addEventListener("click", obtenerTipoBusqueda);
reset_find_icon.addEventListener("click", quitarSeleccionRadios);

mostrarPeliculas();

function mostrarPeliculas() {
  let html = ``;

  // Como el diseño ya no depende del fondo, usamos una sola plantilla para todas
  peliculas_filtradas.forEach((peli) => {
    html += `
      <div class="contenedor-peli">
        <p class="peli-rating">${peli.rating.toFixed(2)}</p>
        <img src="${peli.poster}" alt="${peli.titulo}">
        <span class="material-symbols-outlined non-favorite heart" id="peli-${peli.id}">favorite</span>
        <span class="material-symbols-outlined non-calificated star" id="peli-${peli.id}">star</span>
      </div>`;
  });

  contenedor_img.innerHTML = html;
}

function agregarFavoritoCalificada(evento) {
  const target = evento.target;

  if (target.tagName !== "SPAN") return;

  const numero_id = target.id.split("-")[1];
  const pelicula = peliculas_filtradas.find((peli) => peli.id == numero_id);

  if (target.classList.contains("heart")) {
    pelicula.favorito = !pelicula.favorito;

    target.classList.toggle("favorite-heart", pelicula.favorito);
    target.classList.toggle("non-favorite", !pelicula.favorito);
  } else if (target.classList.contains("star")) {
    pelicula.calificada = !pelicula.calificada;

    target.classList.toggle("calificated", pelicula.calificada);
    target.classList.toggle("non-calificated", !pelicula.calificada);
  }
}

function mostrarModal(evento) {
  let target = evento.target;
  console.log(target);
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

function resetPeliculas() {
  peliculas_original = [...peliculas];
  peliculas_filtradas = peliculas_original;
  mostrarPeliculas();
}

function filtrarPeliculas(evento) {
  let target = evento.target;
  let id_target = target.id;

  if (id_target == "fav") {
    peliculas_filtradas = peliculas_original.filter((peli) => peli.favorito);
  } else if (id_target == "cal") {
    peliculas_filtradas = peliculas_original.filter((peli) => peli.calificada);
  } else if (id_target == "topMejor") {
    peliculas_filtradas = peliculas_original.sort(
      (peli, peli2) => peli2.rating - peli.rating,
    );
  } else if (id_target == "topPeor") {
    peliculas_filtradas = peliculas_original.sort(
      (peli, peli2) => peli.rating - peli2.rating,
    );
  }

  mostrarPeliculas();
}

function obtenerTipoBusqueda(evento) {
  let target = evento.target;

  tipoBusqueda = target.value;
}

function buscarPeliculas(evento) {
  let target = evento.target;

  if (target.value == "") {
    resetPeliculas();
  } else {
    if (tipoBusqueda == "pelicula") {
      peliculas_filtradas = peliculas_original.filter((peli) =>
        peli.titulo.toLowerCase().startsWith(target.value.toLowerCase()),
      );
    } else if (tipoBusqueda == "actor") {
      peliculas_filtradas = peliculas_original.filter((peli) =>
        peli.elenco.some((persona) =>
          persona.toLowerCase().startsWith(target.value.toLowerCase()),
        ),
      );
    } else if (tipoBusqueda == "genero") {
      peliculas_filtradas = peliculas_original.filter((peli) =>
        peli.genero.some((genero) =>
          genero.toLowerCase().startsWith(target.value.toLowerCase()),
        ),
      );
    } else if (tipoBusqueda == "director") {
      peliculas_filtradas = peliculas_original.filter((peli) =>
        peli.director.toLowerCase().startsWith(target.value.toLowerCase()),
      );
    }

    mostrarPeliculas();
  }
}

function quitarSeleccionRadios() {
  all_radio_buttons.forEach((elemento) => {
    if (elemento.checked) {
      elemento.checked = false;
    }
  });
}
