import React, { useState, useEffect } from "react";
import fetchApi from "../fetchApi";
import "../styles/GameBoard.css";

function GameBoard({ currScore, bestScore, setCurrScore, setBestScore }) {
  const [pokemonSprites, setPokemonSprites] = useState([]);
  const [arrOfPressedCards, setArrOfPressedCards] = useState([]);
  const [lostRound, setLostRound] = useState(false);
  const [cardClicked, setCardClicked] = useState(false);

  useEffect(() => {
    async function fetchSprites() {
      const sprites = await fetchApi();
      setPokemonSprites(sprites);
      // console.log(sprites);
    }

    fetchSprites();
    setCardClicked(false);
  }, [cardClicked]);

  const imagesOnDisplay = pokemonSprites.map((sprite) => (
    <li
      className="listElement"
      key={sprite.id}
      onClick={() => handleClick(sprite.id)}
    >
      <h3>{sprite.id}</h3>
      <img src={`${sprite.sprite}`} alt={`Pokemon sprite ${sprite.id}`} />
    </li>
  ));

  //add event listeners to all cards

  function handleClick(index) {
    //if new card, update score and add index to arrOfPressedCards else refresh scores
    //randomize cards
    console.log("list tag that has been clicked->" + index);
    setArrOfPressedCards((prevArr) => [...prevArr, index]);
    console.log("arrayOfPressedCards before if cond->" + arrOfPressedCards);
    if (arrOfPressedCards.includes(index)) {
      alert(`Lost at Score: ${currScore}`);
      let [newCurrScore, newBestScore] = updateScores(
        false,
        setCurrScore,
        setBestScore,
        currScore,
        bestScore
      );
      updateScoreTags(newCurrScore, newBestScore);
      setArrOfPressedCards([]);
    } else {
      console.log("WON ROUND!");
      let [newCurrScore, newBestScore] = updateScores(
        true,
        setCurrScore,
        setBestScore,
        currScore,
        bestScore
      );
      updateScoreTags(newCurrScore, newBestScore);
      // otherwise, won round
      // setArrOfPressedCards((prevArr) => [...prevArr, index]); // update array
      // updateScores(true, setCurrScore, setBestScore, currScore, bestScore);
    }
    setCardClicked(true);
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
    newBestScore = bestScore;
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
