import React, { useEffect, useState, useContext } from 'react'
import './Homepage.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import Search from '../../components/Search/Search'
import { ThemeContext } from '../../contexts/ThemeContext'

function Homepage() {
  //create state for characters
  const [characters, setCharacters] = useState([])

  //show all characters when the page loads
  //https://rickandmortyapi.com/api/character
  useEffect(
    () => {
      console.log('Homepage loaded')
      //make api call to get characters
      axios.get(`https://rickandmortyapi.com/api/character`)
        .then(res => {
          console.log(res.data.results)
          //store characters in state
          setCharacters(res.data.results)
        })
        .catch(err => console.log(err)
        )

    }, [] //runs only once when the page loads
  )

  const {darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode?'home-container home-dark':'home-container'}>
      <Search setCharacters={setCharacters}/>
      <h1>Main Characters</h1>
      <div className="characters-container">
        {characters.map(item => <CharacterCard
          character={item}
          key={item.id} />)
        }
      </div>
    </div>
  )
}

export default Homepage