import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Quiz1.css';

const rawQuestions = [
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
    image: "src/assets/jameliz.jpg",
    options: ["Lela Star", "Esperanza Gomez", "Jameliz Benitez", "Reena Sky"],
    answer: "Jameliz Benitez"
  },
  {
    question: "Qui est cette actrice ?",
    image: "src/assets/skybri.jpg",
    options: ["Channel Preston", "Sky Bri", "Alexis Crystal", "Alexis Texas"],
    answer: "Sky Bri"
  },
  {
    question: "Qui est cette actrice ?",
    image: "src/assets/sophie.jpg",
    options: ["Sophie Rain", "Angela White", "Cherry Kiss", "Britney Amber"],
    answer: "Sophie Rain"
  },
  {
    question: "Qui est cet acteur ?",
    image: "src/assets/adlaurent.jpg",
    options: ["AD Moisset", "AD Laurent", "Au DD", "Dédé"],
    answer: "AD Laurent"
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
    question: "Qui est cette acteur ?",
    image: "src/assets/jonnhyFORPQUIZ.jpg",
    options: ["Manuel Ferrara", "Johnny Sins", "Rocco Siffredi", "Alex Adams"],
    answer: "Johnny Sins"
  },
  {
    question: "Qui est cette actrice ?",
    image: "src/assets/eva.jpg",
    options: ["Abella Danger", "Jenna Haze", "Asa Akira", "Eva Elfie"],
    answer: "Eva Elfie"
  }
];

// Mélangeur générique (Fisher-Yates)
const shuffleArray = (array) => {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
};

function Quiz1() {
  const location = useLocation();
  const level = location.state?.level || 'medium';

  const timeSettings = {
    easy: 15,
    medium: 10,
    hard: 5
  };

  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [timeLeft, setTimeLeft] = useState(timeSettings[level]);
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const shuffled = shuffleArray(rawQuestions).map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }));
    setShuffledQuestions(shuffled);
  }, []);

  useEffect(() => {
    if (selectedOption || showResult) return;

    if (timeLeft === 0) {
      handleAnswer(null);
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, selectedOption, showResult]);

  const handleAnswer = (option) => {
    const correct = option === shuffledQuestions[currentQuestion].answer;
    if (correct) setScore(score + 1);

    setSelectedOption(option);
    setIsCorrect(correct);

    setTimeout(() => {
      const next = currentQuestion + 1;
      if (next < shuffledQuestions.length) {
        setCurrentQuestion(next);
        setSelectedOption(null);
        setIsCorrect(null);
        setTimeLeft(timeSettings[level]);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const handleSaveScore = () => {
    const leaderboard = JSON.parse(localStorage.getItem('leaderboard')) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    setSubmitted(true);
  };

  const handleReplay = () => {
    const reshuffled = shuffleArray(rawQuestions).map((q) => ({
      ...q,
      shuffledOptions: shuffleArray(q.options)
    }));

    setShuffledQuestions(reshuffled);
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(timeSettings[level]);
    setName('');
    setSubmitted(false);
  };

  if (shuffledQuestions.length === 0) return <div>Chargement du quiz...</div>;

  if (showResult) {
    return (
      <div className="quiz-container">
        <h2>Quiz terminé !</h2>
        <p>Score : {score} / {shuffledQuestions.length}</p>

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

        <button onClick={handleReplay}>Rejouer</button>
      </div>
    );
  }

  const current = shuffledQuestions[currentQuestion];

  return (
    <div className="quiz-container">
      <h2>{current.question}</h2>
      <div className="timer">⏱️ Temps restant : {timeLeft}s</div>
      <img
        src={current.image}
        alt="question visuelle"
        className="quiz-image"
      />
      <div className="quiz-options">
        {current.shuffledOptions.map((option, index) => (
          <button
            key={index}
            className={
              selectedOption
                ? option === current.answer
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
