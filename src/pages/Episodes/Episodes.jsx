import React, { useState, useEffect } from 'react'
import './Episodes.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard';

function Episodes() {

  //when the user selects an episode, this page shows the characters from that episode
  //get episode list when page loads
  //https://rickandmortyapi.com/api/episode

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(1);
  const [selectedEpisode, setSelectedEpisode] = useState('');
  const [characterList, setCharacterList] = useState([]);

  useEffect(
    () => {
      axios.get(`https://rickandmortyapi.com/api/episode`)
        .then(res => {
          const nums = [];
          for (let i = 1; i <= res.data.info.count; i++) {
            nums.push(i)
          }
          setOptions(nums);
        })
        .catch(err => console.log(err))
    }, []
  )

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value)
  }

  useEffect(
    () => {
      fetchEpisodeData()
    }, [selectedOption]
  )

  const fetchEpisodeData = async () => {
    console.log('get epsiode data', selectedOption)
    try {
      const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
      setSelectedEpisode(res.data)
      //make api clals for each character
      const episodeCharacters = await Promise.all(
        res.data.characters.map(url => {
          return axios.get(url).then(res => res.data)
        })
      )
      setCharacterList(episodeCharacters)
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='episodes-container'>
      <div>
        <label>Select an episode</label>
        <select onChange={handleSelectChange}>
          {options.map(num => <option key={num} value={num}>Episode {num}</option>)}
        </select>
      </div>
      <div>
        <div className='episode-info'>
          <p>Episode Name: {selectedEpisode?.name}</p>
          <p>Air Date: {selectedEpisode?.air_date}</p>
        </div>
        <div className='character-container'>
          {characterList.map(item => <CharacterCard
            character={item}
            key={item.id} />)
          }
        </div>
      </div>
    </div>
  )
}

export default Episodes