import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Quiz1.css';

const rawQuestions = [
  {
    question: "Qui est cette actrice ?",
    image: "/src/assets/lily.jpg",
    options: ["Riley Reid", "Lily Phillips", "Mia Malkova", "Abella Danger"],
    answer: "Lily Phillips",
    fact: "Elle a commencé dans des vidéos de yoga avant de se faire connaître dans le X."
  },
  {
    question: "Qui est cette actrice ?",
    image: "/src/assets/lana.jpg",
    options: ["Adriana Chechik", "Angela White", "Lana Rhoades", "Jessa Rhodes"],
    answer: "Lana Rhoades",
    fact: "Ancienne gymnaste, elle a quitté l'industrie à 23 ans."
  },
  {
    question: "Qui est cette actrice ?",
    image: "/src/assets/jameliz.jpg",
    options: ["Lela Star", "Esperanza Gomez", "Jameliz Benitez", "Reena Sky"],
    answer: "Jameliz Benitez",
    fact: "A percé grâce à TikTok avant de rejoindre l'industrie."
  },
  {
    question: "Qui est cette actrice ?",
    image: "/src/assets/skybri.jpg",
    options: ["Channel Preston", "Sky Bri", "Alexis Crystal", "Alexis Texas"],
    answer: "Sky Bri",
    fact: "S’est fait connaître sur OnlyFans avant d'exploser sur Twitter."
  },
  {
    question: "Qui est cette actrice ?",
    image: "/src/assets/sophie.jpg",
    options: ["Sophie Rain", "Angela White", "Cherry Kiss", "Britney Amber"],
    answer: "Sophie Rain",
    fact: "Fan inconditionnelle de heavy metal et de tatouages."
  },
  {
    question: "Qui est cet acteur ?",
    image: "/src/assets/adlaurent.jpg",
    options: ["AD Moisset", "AD Laurent", "Au DD", "Dédé"],
    answer: "AD Laurent",
    fact: "Acteur fictif légendaire, sacré 'Chibre d’Or' 3 années de suite."
  },
  {
    question: "Qui est cette actrice ?",
    image: "/src/assets/BonnieForPQUIZ.jpg",
    options: ["Angela White", "Dani Daniels", "Brandi Love", "Bonnie Blue"],
    answer: "Bonnie Blue",
    fact: "Connue pour son look rétro et ses répliques iconiques."
  },
  {
    question: "Qui est cette actrice ?",
    image: "/src/assets/MiaForPQUIZ.jpg",
    options: ["Mia Khalifa", "Mia Malkova", "Tori Black", "Abella Danger"],
    answer: "Mia Khalifa",
    fact: "A tourné seulement 3 mois mais est restée une légende du web."
  },
  {
    question: "Qui est cette acteur ?",
    image: "/src/assets/jonnhyFORPQUIZ.jpg",
    options: ["Manuel Ferrara", "Johnny Sins", "Rocco Siffredi", "Alex Adams"],
    answer: "Johnny Sins",
    fact: "Docteur, plombier, astronaute... un CV long comme le bras."
  },
  {
    question: "Qui est cette actrice ?",
    image: "/src/assets/eva.jpg",
    options: ["Abella Danger", "Jenna Haze", "Asa Akira", "Eva Elfie"],
    answer: "Eva Elfie",
    fact: "Ambassadrice du style softcore et star d'Instagram."
  }
];

const endFunFacts = [
  "🍯 Le miel ne se périme jamais, même après 3000 ans.",
  "🪐 Il pleut du métal sur Vénus. Classe, mais dangereux.",
  "🐌 Certains escargots peuvent dormir pendant trois ans.",
  "🧊 L’eau chaude peut geler plus vite que l’eau froide.",
  "🤯 Lilian Grenier a un troisième membre de 3 centimètres, bluffant !",
  "🐓 Une poule a survécu 18 mois sans tête.",
  "🧛 Boire trop de carottes peut te rendre orange.",
  "🎂 Les gâteaux d’anniversaire sont statistiquement l’objet le plus photographié au monde.",
  "🛸 Il existe une loi en France interdisant d’appeler un cochon “Napoléon”.",
  "🧠 Le cerveau humain consomme 20% de l'énergie corporelle au repos.",
  "🦐 Le cœur d’une crevette est situé dans sa tête.",
  "🦑 Un poulpe a trois cœurs et du sang bleu.",
  "📝 Le mot le plus long en français est 'intergouvernementalisations'."
];

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
    const randomEndFact = endFunFacts[Math.floor(Math.random() * endFunFacts.length)];

    return (
      <div className="quiz-container">
        <h2>Quiz terminé !</h2>
        <p>Score : {score} / {shuffledQuestions.length}</p>

        <p className="fun-fact-end">🌍 Fun fact du jour : {randomEndFact}</p>

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
        <>
          <p className="feedback">
            {isCorrect ? "Bonne réponse !" : "Raté ou temps écoulé !" }
          </p>
          {isCorrect && current.fact && (
            <p className="fun-fact">💡 {current.fact}</p>
          )}
        </>
      )}
    </div>
  );
}

export default Quiz1;
