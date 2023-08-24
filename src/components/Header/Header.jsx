import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../contexts/ThemeContext';

function Header() {
  //create state to control dark mode

  //const [ darkMode, setDarkMode ] = useState(false);
  //change to global context
  const { darkMode, setDarkMode } = useContext(ThemeContext)


  return (
    <div className={darkMode ? "header-container header-dark" : "header-container"}>
      <div>
        <Link to="/" style={{ marginRight: "10px" }}>Home</Link>
        <Link to="/about" style={{ marginRight: "10px" }}>About</Link>
        <Link to="/episodes">Episodes</Link>
      </div>
      <div>
        <Link to="/myfavorites">My Favorites</Link>
        <button className={darkMode ? "theme-button theme-button-dark" : "theme-button"} onClick={() => setDarkMode(!darkMode)}>
          {
            darkMode ? "Light Mode" : "Dark Mode"
          }
        </button>
      </div>
    </div>
  )
}

export default Header