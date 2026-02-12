const pokemones = [
  { nombre: "Pikachu", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png" },
  { nombre: "Bulbasaur", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png" },
  { nombre: "Charmander", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/4.png" },
  { nombre: "Squirtle", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/7.png" },
  { nombre: "Eevee", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/133.png" },
  { nombre: "Snorlax", img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/143.png" }
];

const pokedex = document.getElementById("pokedex");
const confirmarBtn = document.getElementById("confirmar");

let seleccionado = null;

pokemones.forEach(pokemon => {
  const card = document.createElement("div");
  card.classList.add("pokemon");

  card.innerHTML = `
    <img src="${pokemon.img}" alt="${pokemon.nombre}">
    <p>${pokemon.nombre}</p>
  `;

  card.addEventListener("click", () => {
    document.querySelectorAll(".pokemon").forEach(p => p.classList.remove("selected"));
    card.classList.add("selected");
    seleccionado = pokemon;

    confirmarBtn.disabled = false;
    confirmarBtn.classList.add("enabled");
  });

  pokedex.appendChild(card);
});

confirmarBtn.addEventListener("click", () => {
  // INTENCIONALMENTE NO HACE NADA
  console.log("Pokémon seleccionado:", seleccionado);
});
