import React, { useState, useEffect } from "react";
import fetchApi from "../fetchApi";
import "../styles/GameBoard.css";

function GameBoard() {
  const [pokemonSprites, setPokemonSprites] = useState([]);

  useEffect(() => {
    async function fetchSprites() {
      const sprites = await fetchApi();
      setPokemonSprites(sprites);
    }

    fetchSprites();
  }, []);

  const imagesOnDisplay = pokemonSprites.map((sprite, index) => (
    <li key={index}>
      <img src={`${sprite}`} alt={`Pokemon sprite ${index}`} />
    </li>
  ));

  return (
    <div className="gameboard">
      <ul className="list-of-cards">{imagesOnDisplay}</ul>
    </div>
  );
}

export default GameBoard;
