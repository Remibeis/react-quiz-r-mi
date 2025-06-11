import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

function ThemeSelector() {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className="theme-selector">
      <label>Thème : </label>
      <select value={theme} onChange={(e) => setTheme(e.target.value)}>
        <option value="default">Default</option>
        <option value="cyberpunk">Cyberpunk</option>
        <option value="dark">Dark</option>
      </select>
    </div>
  );
}

export default ThemeSelector;
