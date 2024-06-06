const listOfPokemonNames = [
  "charizard",
  "charmander",
  "pikachu",
  "gengar",
  "eevee",
  "lugia",
  "garchomp",
  "dragonite",
  "blastoise",
  "snorlax",
];

async function fetchApi() {
  let arrayOfPokemonImages = [];

  shuffle(listOfPokemonNames);
  for (let i = 0; i < listOfPokemonNames.length; i++) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${listOfPokemonNames[i]}`
    );
    const responseJson = await response.json();
    const sprite = responseJson.sprites.front_shiny;
    const id = responseJson.id;
    arrayOfPokemonImages.push({ id, sprite });
  }
  return arrayOfPokemonImages;
}

function shuffle(array) {
  let currentIndex = array.length;

  while (currentIndex != 0) {
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}

export default fetchApi;
