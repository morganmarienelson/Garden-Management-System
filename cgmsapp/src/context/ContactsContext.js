import React, {useContext} from 'react';
import useLocalStorage from "../hooks/useLocalStorage"

const ContactsContext = React.createContext()

export function ContactsProvider({children}){
    const [contacts, setContacts] = useLocalStorage('contacts', [])

    function createContact(username, name){
        setContacts(prevContacts => {
            return [...prevContacts, {username, name}]
        })
    }

    return(
        <ContactsContext.Provider value={{contacts, createContact}}>
            {children}
        </ContactsContext.Provider>
    )
}