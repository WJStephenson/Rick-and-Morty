import React, { useContext, useState, useEffect } from 'react'
import './CharacterCard.css'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import { FavoritesContext } from '../../contexts/FavoritesContext'

function CharacterCard({ character }) {
    //access global state
    const { addCharacter, favorites, removeCharacter } = useContext(FavoritesContext)

    //start with a variable to test UI

    const [isFavorite, setIsFavorite] = useState(false)

    useEffect(() => {
        setIsFavorite(favorites?.find(item => item.id === character.id))
    }, [favorites])

    return (
        <div className='character-card'>
            <img src={character.image} alt={character.name} />
            <p>{character.name}</p>
            <Link to={`/details/${character.id}`}>See Details</Link>
            {
                isFavorite ?
                    <FaHeart onClick={()=>removeCharacter(character.id)}
                    className='heart-icon' />
                    :
                    <FaRegHeart onClick={() => addCharacter(character)}
                        className='heart-icon' />
            }
        </div>
    )
}

export default CharacterCard