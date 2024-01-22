"use client"

import { useTheme } from 'next-themes';
import { BsMoon, BsSun } from 'react-icons/bs';

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className="p-2 focus:outline-none"
      onClick={toggleTheme}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? <BsMoon size={24} /> : <BsSun size={24} />}
    </button>
  );
};

export default ThemeSwitcher;

