import React, {useState} from 'react'
import axios from 'axios'
import './Search.css'

function Search({setCharacters}) {
    //need state to hold user input
    const [query, setQuery] = useState('')

    //https://rickandmortyapi.com/api/character/?name=rick

    const handleSubmit = (e) => {
        e.preventDefault();
        //make api call to get matchig characters to query
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
            .then(res => setCharacters(res.data.results))
            .catch(err => {
                if(err.response.status === 404) {
                    alert(`No characters names ${query}`)
                }
                console.log(err)
            })
        //clear text box
        setQuery('')
    }

    return (
        <form action="" className='search-container' onSubmit={handleSubmit}>
            <input type="text" onChange={(e) => setQuery(e.target.value)}
            placeholder='Search all characters' />
        </form>
    )
}

export default Search