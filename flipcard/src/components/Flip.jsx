import { useState, useEffect } from 'react';
import './Flip.css'; 
import img1 from "../assets/1.jpg";
import img2 from "../assets/2.jpg";
import img3 from "../assets/3.jpg";
import img4 from "../assets/4.jpg";
import img5 from "../assets/5.jpg";
import img6 from "../assets/6.jpg";

const cardImages = [
  { src: img1, id: 1 },
  { src: img2, id: 2 },
  { src: img3, id: 3 },
  { src: img4, id: 4 },
  { src: img5, id: 5 },
  { src: img6, id: 6 }
];

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const Flip = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [score, setScore] = useState(0);
  const [clickCount, setClickCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60); 
  const [isGameOver, setIsGameOver] = useState(false); 

  
  const initializeGame = () => {
    const shuffledCards = shuffleArray([...cardImages, ...cardImages]);
    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setScore(0);
    setClickCount(0);
    setTimeLeft(60); 
    setIsGameOver(false); 
  };

  useEffect(() => {
    initializeGame(); 
  }, []);


  useEffect(() => {
    if (timeLeft === 0) {
      setIsGameOver(true); 
      return;
    }
    
    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(timer); 
  }, [timeLeft]);

  
  const handleFlip = (index) => {
    if (flippedCards.length === 2 || flippedCards.includes(index) || isGameOver) return;

    const newFlippedCards = [...flippedCards, index];
    setFlippedCards(newFlippedCards);
    setClickCount(clickCount + 1); 

    
    if (newFlippedCards.length === 2) {
      const [firstIndex, secondIndex] = newFlippedCards;
      
    
      if (cards[firstIndex].id === cards[secondIndex].id) {
        setMatchedCards([...matchedCards, firstIndex, secondIndex]);
        setScore(score + 1); 
        setFlippedCards([]); 
      } else {
        setTimeout(() => {
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  
  const handlePlayAgain = () => {
    initializeGame(); 
  };

  return (
    <div className="flip-container">
      <div className="score-board">
        <h3>Score: {score}</h3>
        <h3>Clicks: {clickCount}</h3>
        <h3>Time Left: {timeLeft} seconds</h3>
      </div>
      {isGameOver && <h2 className="game-over">Game Over!</h2>}
      <button className='playbtn' onClick={handlePlayAgain} disabled={!isGameOver}>
        Play Again
      </button>
      <div className="flip-grid">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`flip-card ${
              flippedCards.includes(index) || matchedCards.includes(index) ? 'flipped' : ''
            }`}
            onClick={() => handleFlip(index)}
          >
            <div className="flip-card-inner">
              <div className="flip-card-front">
                <img src="https://i.pinimg.com/736x/62/df/ed/62dfed9c4df6bbcbd5e4cb6cc35cbdb6.jpg" alt="Back" />
              </div>
              <div className="flip-card-back">
                <img src={card.src} alt={`Card ${card.id}`} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  
};

export default Flip;
