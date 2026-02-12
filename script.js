let pokemonSeleccionado = false;

async function iniciarJuego() {
    document.getElementById('setup').style.display = 'none';
    document.getElementById('game').style.display = 'block';
    
    const board = document.getElementById('board');
    board.innerHTML = "Generando Pokédex...";

    // Generar 40 IDs aleatorios entre el 1 y el 898
    const ids = [];
    while(ids.length < 40) {
        let r = Math.floor(Math.random() * 898) + 1;
        if(!ids.includes(r)) ids.push(r);
    }

    board.innerHTML = ""; // Limpiar texto de carga

    for(let id of ids) {
        try {
            const res = await fetch(`https://pokeapi.co{id}`);
            const data = await res.json();

            const card = document.createElement('div');
            card.className = 'card';
            // Usamos el sprite oficial de alta calidad
            const imgUrl = data.sprites.front_default;
            card.innerHTML = `<img src="${imgUrl}"><p>${data.name.toUpperCase()}</p>`;

            card.onclick = () => {
                if (!pokemonSeleccionado) {
                    // Acción: Elegir mi Pokémon secreto
                    card.classList.add('secreto');
                    pokemonSeleccionado = true;
                    document.getElementById('status').innerText = "¡Adivina el del rival!";
                    document.getElementById('mi-target').innerHTML = `
                        <p style="color:#4CAF50; margin:0;">TU POKÉMON: ${data.name.toUpperCase()}</p>
                    `;
                } else {
                    // Acción: Marcar/Desmarcar para descartar (si no es el elegido)
                    if (!card.classList.contains('secreto')) {
                        card.classList.toggle('marcado');
                    }
                }
            };
            board.appendChild(card);
        } catch (e) { console.error("Error cargando pokemon", e); }
    }
}
