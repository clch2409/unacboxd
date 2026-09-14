import peliculas from "./peliculas.json" with { type: "json" };
// // Funciona
// peliculas.forEach((peli) => console.log(peli));

// // JSON -> Javascript Object Notation

let persona = {
  nombre: "Cesar",
  edad: 24,
};

console.log(
  `La persona se llama ${persona.nombre} y tiene una edad de ${persona.edad}`,
);
