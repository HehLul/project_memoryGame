import { useState, useEffect } from "react";
import fetchApi from "../fetchApi";
import "../styles/GameBoard.css";

function GameBoard({ currScore, bestScore, setCurrScore, setBestScore }) {
  const [pokemonSprites, setPokemonSprites] = useState([]);
  const [arrOfPressedCards, setArrOfPressedCards] = useState([]);
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
    <li
      className="listElement"
      key={`${sprite.id}-${index}`}
      onClick={() => handleClick(sprite.id)}
    >
      <img src={sprite.sprite} alt={`Pokemon sprite ${sprite.id}`} />
    </li>
  ));

  function handleClick(index) {
    setArrOfPressedCards((prevArr) => [...prevArr, index]);
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
      let [newCurrScore, newBestScore] = updateScores(
        true,
        setCurrScore,
        setBestScore,
        currScore,
        bestScore
      );
      updateScoreTags(newCurrScore, newBestScore);
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
    if (newCurrScore >= bestScore) {
      newBestScore = newCurrScore;
      setBestScore(newCurrScore);
    } else {
      newBestScore = bestScore;
    }
  } else {
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
