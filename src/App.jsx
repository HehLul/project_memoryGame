import "./styles/App.css";
import Header from "./components/Header";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
function App() {
  const [currScore, setCurrScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  return (
    <>
      <Header currScore={currScore} bestScore={bestScore}></Header>
      <GameBoard
        currScore={currScore}
        bestScore={bestScore}
        setCurrScore={setCurrScore}
        setBestScore={setBestScore}
      ></GameBoard>
    </>
  );
}

export default App;
