import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-selector">
      <label>Thème : </label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="PornQuiz">PornQuiz</option>
        <option value="CyberpornQuiz">CyberpornQuiz</option>
        <option value="DarkQuiz">DarkQuiz</option>
      </select>
    </div>
  );
}

export default ThemeSelector;
