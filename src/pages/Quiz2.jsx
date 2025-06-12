import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Quiz2.css';

const questions = [
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

function PlayerQuiz({ playerId, level }) {
const timeSettings = {
    easy: 15,
    medium: 10,
    hard: 5
};

const [currentQuestion, setCurrentQuestion] = useState(0);
const [score, setScore] = useState(0);
const [showResult, setShowResult] = useState(false);
const [selectedOption, setSelectedOption] = useState(null);
const [isCorrect, setIsCorrect] = useState(null);
const [timeLeft, setTimeLeft] = useState(timeSettings[level]);
const [name, setName] = useState('');
const [submitted, setSubmitted] = useState(false);

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
        setTimeLeft(timeSettings[level]);
    } else {
        setShowResult(true);
    }
    }, 1000);
};

const handleSaveScore = () => {
    const leaderboard = JSON.parse(localStorage.getItem(`leaderboard-${playerId}`)) || [];
    leaderboard.push({ name, score });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem(`leaderboard-${playerId}`, JSON.stringify(leaderboard));
    setSubmitted(true);
};

const handleReplay = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setIsCorrect(null);
    setTimeLeft(timeSettings[level]);
    setName('');
    setSubmitted(false);
};

if (showResult) {
    return (
    <div className="quiz-container">
        <h2>Joueur {playerId} – Quiz terminé !</h2>
        <p>Score : {score} / {questions.length}</p>
        {!submitted ? (
        <div>
            <input
            type="text"
            placeholder="Ton pseudo"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="name-input"
            />
            <button onClick={handleSaveScore} disabled={!name}>
            Enregistrer
            </button>
        </div>
        ) : (
        <div>
            <p>Score enregistré !</p>
            <a href="/leaderboard">Voir classement</a>
        </div>
        )}
        <button onClick={handleReplay}>Rejouer</button>
    </div>
    );
}

return (
    <div className="quiz-container">
    <h2>Joueur {playerId} : {questions[currentQuestion].question}</h2>
    <div className="timer">⏱️ {timeLeft}s</div>
    <img src={questions[currentQuestion].image} alt="actrice" className="quiz-image" />
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
        {isCorrect ? "✔ Bonne réponse !" : "❌ Mauvaise réponse ou temps écoulé !"}
        </p>
    )}
    </div>
);
}

function Quiz2Players() {
const location = useLocation();
const level = location.state?.level || 'medium';

return (
    <div className="quiz2players-wrapper">
    <PlayerQuiz playerId={1} level={level} />
    <PlayerQuiz playerId={2} level={level} />
    </div>
);
}

export default Quiz2Players;

