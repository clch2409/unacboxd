import peliculas from "./peliculas.json" with { type: "json" };

let peliculas_original = [...peliculas];
let peliculas_filtradas = peliculas_original;
let tipoBusqueda = "";

const contenedor_img = document.querySelector(".contenedor-img");
const dialog = document.getElementById("rating-dialog");
const rating_close = document.getElementById("rating-close");
const list_options = document.querySelector(".list-options");
const reset_icon = document.querySelector(".non-filter-icon");
const find_movie = document.getElementById("find-movie");
const radios = document.querySelector(".radios");

contenedor_img.addEventListener("click", mostrarModal);
contenedor_img.addEventListener("click", agregarFavoritoCalificada);
rating_close.addEventListener("click", cerrarModal);
list_options.addEventListener("click", filtrarPeliculas);
reset_icon.addEventListener("click", resetPeliculas);
find_movie.addEventListener("keyup", buscarPeliculas);
radios.addEventListener("click", obtenerTipoBusqueda);

mostrarPeliculas();

function mostrarPeliculas() {
  let html = ``;
  peliculas_filtradas.forEach((peli) => {
    html += `
      <div class="contenedor-peli">
        <img src="${peli.poster}" alt="${peli.titulo}">
        <span class="material-symbols-outlined non-favorite heart" id="peli-${peli.id}">favorite</span>
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
      target.classList.toggle("favorite-heart");
      target.classList.toggle("non-favorite");
      if (target.classList.contains("favorite-heart")) {
        pelicula_encontrada.favorito = true;
      } else if (target.classList.contains("non-favorite")) {
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
  console.log(evento);
  console.log(target.value);

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
