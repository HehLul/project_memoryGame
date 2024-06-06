import "../styles/Header.css";
function Header({ currScore, bestScore }) {
  return (
    <div className="header">
      <div className="score">
        <h3 className="current-score">Score: {currScore}</h3>
        <h3 className="best-score">Best Score: {bestScore}</h3>
      </div>
      <h1>Memory Card Game!</h1>
      <p>
        To play, chose the card that you haven't clicked on yet. Keep going
        until your memory goes crazy!
      </p>
    </div>
  );
}

export default Header;
