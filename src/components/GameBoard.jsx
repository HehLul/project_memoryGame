import React, { useState, useEffect } from "react";
import fetchApi from "../fetchApi";
import "../styles/GameBoard.css";

function GameBoard({ currScore, bestScore, setCurrScore, setBestScore }) {
  const [pokemonSprites, setPokemonSprites] = useState([]);
  const [arrOfPressedCards, setArrOfPressedCards] = useState([
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  ]);
  const [lostRound, setLostRound] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);

  useEffect(() => {
    async function fetchSprites() {
      const sprites = await fetchApi();
      setPokemonSprites(sprites);
    }

    fetchSprites();
    setCardClicked(false);
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
      console.log("inside if cond to check if card prev clicked");
      // check if lost round
      let [newCurrScore, newBestScore] = updateScores(
        true,
        setCurrScore,
        setBestScore,
        currScore,
        bestScore
      );
      updateScoreTags(newCurrScore, newBestScore);
      setCardClicked(true);
      // setArrOfPressedCards([]);
    }
    // else {
    //   // otherwise, won round
    //   setArrOfPressedCards((prevArr) => [...prevArr, index]); // update array
    //   updateScores(true, setCurrScore, setBestScore, currScore, bestScore);
    // }
  }

  return (
    <div className="gameboard">
      <ul className="list-of-cards">{imagesOnDisplay}</ul>
    </div>
  );
}

function updateScores(won, setCurrScore, setBestScore, currScore, bestScore) {
  let newCurrScore;
  let newBestScore;
  if (won) {
    setCurrScore((prevScore) => prevScore + 1);
    newCurrScore = currScore + 1;
    console.log("newScore->" + newCurrScore);
    if (newCurrScore >= bestScore) {
      newBestScore = newCurrScore;
      setBestScore(newCurrScore);
    } else {
      newBestScore = bestScore;
    }
  } else if (!won) {
    setCurrScore(0);
    newCurrScore = 0;
  }

  return [newCurrScore, newBestScore];
}
function updateScoreTags(currScore, bestScore) {
  let scoreTag = document.querySelector(".current-score");
  let bestScoreTag = document.querySelector(".best-score");
  scoreTag.textContent = `Score: ${currScore}`;
  bestScoreTag.textContent = `Best Score: ${bestScore}`;
}
export default GameBoard;
