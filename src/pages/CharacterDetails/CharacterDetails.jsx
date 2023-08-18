import React, { useEffect, useState } from 'react'
import './CharacterDetails.css'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function CharacterDetails() {
    //this page shows details of a specific character when the page loads

    //which character

    //the id is in the url

    //retrieve id with useParams
    const {characterId} = useParams()

    const [character, setCharacter] = useState('')

    //https://rickandmortyapi.com/api/character/
    useEffect(()=>{
        axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
        .then(res => {
            setCharacter(res.data)
        })
        .catch(err => console.log(err))
    }, []);

  return (
    <div className='details-container'>
        <img src={character?.image} alt="character image" />
        <div className="container-info">
            <p>Name: {character?.name}</p>
            <p>Gender: {character?.gender}</p>
            <p>Location: {character?.location?.name}</p>
        </div>
    </div>
  )
}

export default CharacterDetails