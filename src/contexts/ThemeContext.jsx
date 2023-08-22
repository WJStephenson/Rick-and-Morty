import { useState, createContext, useEffect } from "react";

//create context
export const ThemeContext = createContext();

export default function ThemeContextProvider(props) {
    const [darkMode, setDarkMode] = useState(false);

    //get theme from localstorage
    useEffect(
        () => {
            const storedDarkMode = localStorage.getItem('darkMode')
            if(storedDarkMode){
                setDarkMode(JSON.parse(storedDarkMode))
            }
        }, [])

    //save theme to local storage
    useEffect(
        () => {
            localStorage.setItem('darkMode', JSON.stringify(darkMode))
        }, [darkMode])



    
    return (
        <ThemeContext.Provider value={{ darkMode, setDarkMode }}>
            {props.children}
        </ThemeContext.Provider>
    );
}