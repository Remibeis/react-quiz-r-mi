import { createContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('PornQuiz');

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    console.log("🎨 Thème actif :", theme);
    document.body.className = '';
    document.body.classList.add(`theme-${theme}`);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext, ThemeProvider };
