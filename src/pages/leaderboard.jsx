import { useEffect, useState } from 'react';
import './Quiz1.css';

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('leaderboard')) || [];
    setScores(data);
  }, []);

  return (
    <div className="quiz-container">
      <h2>Classement des Joueurs</h2>
      {scores.length === 0 ? (
        <p>Aucun score enregistré pour l’instant.</p>
      ) : (
        <ol>
          {scores.map((entry, index) => (
            <li key={index}>
              <strong>{entry.name}</strong> — {entry.score} pts
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

export default Leaderboard;
