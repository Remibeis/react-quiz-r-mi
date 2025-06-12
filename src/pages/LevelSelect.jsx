import { useNavigate } from 'react-router-dom';
import './Quiz1.css';

function LevelSelect() {
  const navigate = useNavigate();

  const handleSelect = (level) => {
    navigate('/quiz1', { state: { level } });
  };

  return (
    <div className="quiz-container">
      <h2>Choisis ton niveau</h2>
      <button onClick={() => handleSelect('easy')}>Facile (15s)</button>
      <button onClick={() => handleSelect('medium')}>Moyen (10s)</button>
      <button onClick={() => handleSelect('hard')}>Hardcore (5s)</button>
    </div>
  );
}

export default LevelSelect;
