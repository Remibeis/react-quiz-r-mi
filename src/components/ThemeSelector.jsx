import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import './ThemeSelector.css';


function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-selector">
      <label>Theme : </label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="PornQuiz">PornQuiz</option>
        <option value="CyberpornQuiz">CyberpornQuiz</option>
        <option value="DarkQuiz">DarkQuiz</option>
      </select>
    </div>
  );
}

export default ThemeSelector;
