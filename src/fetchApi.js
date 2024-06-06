async function fetchApi() {
  let arrayOfPokemonImages = [];
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
  shuffle(listOfPokemonNames);
  for (let i = 0; i < listOfPokemonNames.length; i++) {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${listOfPokemonNames[i]}`
    );
    const responseJson = await response.json();
    // console.log(responseJson);
    const sprite = responseJson.sprites.front_shiny;
    const id = responseJson.id;
    // console.log(sprite);
    // console.log(id);
    arrayOfPokemonImages.push({ id, sprite });
  }
  // console.log(arrayOfPokemonImages);
  return arrayOfPokemonImages;
}

function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {
    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
}
export default fetchApi;
