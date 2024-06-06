import React, { useState, useEffect } from "react";
import fetchApi from "../fetchApi";
import "../styles/GameBoard.css";

function GameBoard({ currScore, bestScore, setCurrScore, setBestScore }) {
  const [pokemonSprites, setPokemonSprites] = useState([]);
  const [arrOfPressedCards, setArrOfPressedCards] = useState([0, 1, 2]);
  const [lostRound, setLostRound] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);

  useEffect(() => {
    async function fetchSprites() {
      const sprites = await fetchApi();
      setPokemonSprites(sprites);
    }

    fetchSprites();
  }, [cardClicked]);

  const imagesOnDisplay = pokemonSprites.map((sprite, index) => (
    <li className="listElement" key={index} onClick={() => handleClick(index)}>
      <img src={`${sprite}`} alt={`Pokemon sprite ${index}`} />
    </li>
  ));

  //add event listeners to all cards
  function handleClick(index) {
    //if new card, update score and add index to arrOfPressedCards else refresh scores
    //randomize cards
    console.log("list tag tht has been clicked->" + index);

    if (arrOfPressedCards.includes(index)) {
      // check if lost round
      updateScores(true, setCurrScore, setBestScore, currScore, bestScore);
      updateScoreTags(currScore, bestScore);
      // setArrOfPressedCards([]);
    }
    // else {
    //   // otherwise, won round
    //   setArrOfPressedCards((prevArr) => [...prevArr, index]); // update array
    //   updateScores(true, setCurrScore, setBestScore, currScore, bestScore);
    // }
    // setCardClicked(true);
  }

  return (
    <div className="gameboard">
      <ul className="list-of-cards">{imagesOnDisplay}</ul>
    </div>
  );
}

function updateScores(won, setCurrScore, setBestScore, currScore, bestScore) {
  if (won) {
    setCurrScore((prevScore) => prevScore + 1);
    let newCurrScore = currScore + 1;
    if (newCurrScore >= bestScore) {
      setBestScore(newCurrScore);
    }
  } else if (!won) {
    setCurrScore(0);
  }
}
function updateScoreTags(currScore, bestScore) {
  let scoreTag = document.querySelector(".current-score");
  let bestScoreTag = document.querySelector(".best-score");
  scoreTag.textContent = `Score: ${currScore}`;
  bestScoreTag.textContent = `Best Score: ${bestScore}`;
}
export default GameBoard;
