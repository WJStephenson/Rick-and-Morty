import { useState, createContext, useEffect } from "react";

//create context
export const FavoritesContext = createContext();

export default function FavoritesContextProvider(props) {
    const [favorites, setFavorites] = useState([]);

    //get theme from localstorage
    useEffect(
        () => {
            const storedFavorites = localStorage.getItem('favoritesList')
            if (storedFavorites) {
                setFavorites(JSON.parse(storedFavorites))
            }
        }, [])

    //save favorites to local storage
    useEffect(
        () => {
            localStorage.setItem('favoritesList', JSON.stringify(favorites))
        }, [favorites])


    //create a function to add a character to state
    const addCharacter = (charToAdd) => {
        let newFavorites = [...favorites, charToAdd]
        setFavorites(newFavorites)
    }

    //create function to remove character
    const removeCharacter = (charId) => {
        let newFavorites = (favorites.filter(item => item.id != charId))
        setFavorites(newFavorites)
    }

    return (
        <FavoritesContext.Provider value={{ addCharacter, favorites, removeCharacter }}>
            {props.children}
        </FavoritesContext.Provider>
    );
}