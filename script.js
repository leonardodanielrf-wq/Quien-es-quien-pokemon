let pokemonSeleccionado = false;

async function iniciarJuego() {
    // 1. Mostrar el área de juego
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    
    const board = document.getElementById('pokedex');
    board.innerHTML = "Cargando Pokédex...";

    // 2. Generar 40 IDs únicos aleatorios
    const ids = [];
    while(ids.length < 40) {
        let r = Math.floor(Math.random() * 898) + 1;
        if(!ids.includes(r)) ids.push(r);
    }

    board.innerHTML = ""; // Limpiar mensaje de carga

    // 3. Cargar datos de la API
    for(let id of ids) {
        try {
            const res = await fetch(`https://pokeapi.co{id}`);
            const data = await res.json();

            const card = document.createElement('div');
            card.className = 'pokemon';
            card.innerHTML = `
                <img src="${data.sprites.front_default}">
                <p>${data.name.toUpperCase()}</p>
            `;

            card.onclick = () => {
                if (!pokemonSeleccionado) {
                    // El primer toque elige TU Pokémon
                    card.classList.add('selected');
                    pokemonSeleccionado = true;
                    document.getElementById('status').innerText = "¡Adivina el del rival!";
                    document.getElementById('status').style.color = "#4CAF50";
                } else {
                    // Los siguientes toques descartan a los demás
                    if (!card.classList.contains('selected')) {
                        card.classList.toggle('marked');
                    }
                }
            };
            board.appendChild(card);
        } catch (error) {
            console.log("Error cargando Pokémon:", error);
        }
    }
}
