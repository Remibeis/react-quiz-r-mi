import { useState, useEffect } from 'react';
import './Quiz1.css';

const questions = [ // + d'autres à rajouter
  {
    question: "Qui est cette actrice ?",
    image: "src/assets/lily.jpg",
    options: ["Riley Reid", "Lily Phillips", "Mia Malkova", "Abella Danger"],
    answer: "Lily Phillips"
  },
  {
    question: "Qui est cette actrice ?",
    image: "src/assets/lana.jpg",
    options: ["Adriana Chechik", "Angela White", "Lana Rhoades", "Jessa Rhodes"],
    answer: "Lana Rhoades"
  },
  {
    question: "Qui est cette actrice ?",
    image: "src/assets/BonnieForPQUIZ.jpg",
    options: ["Angela White", "Dani Daniels", "Brandi Love", "Bonnie Blue"],
    answer: "Bonnie Blue"
  },
  {
    question: "Qui est cette actrice ?",
    image: "src/assets/MiaForPQUIZ.jpg",
    options: ["Mia Khalifa", "Mia Malkova", "Tori Black", "Abella Danger"],
    answer: "Mia Khalifa"
  },
  {
    question: "Qui est cette actrice ?",
    image: "src/assets/eva.jpg",
    options: ["Abella Danger", "Jenna Haze", "Asa Akira", "Eva Elfie"],
    answer: "Eva Elfie"
  }
];

function Quiz1() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (selectedOption || showResult) return;

    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, selectedOption, showResult]);

  const handleAnswer = (option) => {
    const correct = option === questions[currentQuestion].answer;
    if (correct) setScore(score + 1);

    setSelectedOption(option);
    setIsCorrect(correct);

    setTimeout(() => {
      const next = currentQuestion + 1;
      if (next < questions.length) {
        setCurrentQuestion(next);
        setSelectedOption(null);
        setIsCorrect(null);
        setTimeLeft(10);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

if (showResult) {
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSaveScore = () => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    setSubmitted(true);
  };

  return (
    <div className="quiz-container">
      <h2>Quiz terminé !</h2>
      <p>Score : {score} / {questions.length}</p>

      {!submitted ? (
        <div>
          <input
            type="text"
            placeholder="Entre ton pseudo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
          />
          <button onClick={handleSaveScore} disabled={!name}>
            Enregistrer mon score
          </button>
        </div>
      ) : (
        <div>
          <p>Score enregistré !</p>
          <a href="/leaderboard">Voir le classement</a>
        </div>
      )}
    </div>
  );
}

  return (
    <div className="quiz-container">
      <h2>{questions[currentQuestion].question}</h2>
      <div className="timer">⏱️ Temps restant : {timeLeft}s</div>
      <img src={questions[currentQuestion].image} alt="question visuelle" className="quiz-image" />
      <div className="quiz-options">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={
              selectedOption
                ? option === questions[currentQuestion].answer
                  ? 'correct'
                  : option === selectedOption
                    ? 'incorrect'
                    : ''
                : ''
            }
            onClick={() => handleAnswer(option)}
            disabled={!!selectedOption}
          >
            {option}
          </button>
        ))}
      </div>
      {selectedOption && (
        <p className="feedback">
          {isCorrect ? "Bonne réponse !" : "Raté ou temps écoulé !" }
        </p>
      )}
    </div>
  );
}

export default Quiz1;