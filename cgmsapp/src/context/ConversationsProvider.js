import React, {useContext, useState} from 'react';
import useLocalStorage from "../hooks/useLocalStorage"
import {useContacts} from "./ContactsProvider";
import {message} from "antd";

const ConversationsContext = React.createContext()

export function useConversations(){
    return useContext(ConversationsContext)
}

export function ConversationsProvider({username, children}){
    const [conversations, setConversations] = useLocalStorage('conversations', []);
    const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);
    const {contacts} = useContacts();

    function createConversation(recipients){
        setConversations(prevConversations => {
            return [...prevConversations, {recipients, messages: []}]
        })
    }

    function addMessageToConversation({recipients, text, sender}){
        setConversations(prevConversations => {
            let madeChange = false
            const newMessage = { sender, text}
            const newConversations = prevConversations.map
            (conversation => {
                if (arrayEquality(conversation.recipients, recipients))
                {
                    madeChange = true
                    return {...conversation,
                        messages: [...conversation.messages, newMessage]
                    }
                }
                return conversation
            })

            if (madeChange){
                return  newConversations
            } else {
                return [
                    ...prevConversations,
                    {recipients, messages: [newMessage]}
                ]
            }
        })
    }

    function sendMessage(recipients, text){
        addMessageToConversation({recipients, text, sender: username})
    }

    const formattedConversations = conversations.map((conversation, index) => {
        const recipients = conversation.recipients.map(recipient => {
            const contact = contacts.find(contact => {
                return contact.username === recipient
            })
            const name = (contact && contact.name) || recipient
            return { username: recipient, name}
        })
        const messages = conversation.messages.map(message=>{
            const contact = contacts.find(contact => {
                return contact.username === message.sender
            })
            const name = (contact && contact.name) || message.sender
            const fromMe = username === message.sender
            return {...message, senderName: name, fromMe}
        })
        const selected = index === selectedConversationIndex
        return { ...conversation, messages, recipients, selected }
    })

    const value = {
        conversations: formattedConversations,
        selectedConversation: formattedConversations
        [selectedConversationIndex],
        sendMessage,
        selectedConversationIndex: setSelectedConversationIndex,
        createConversation
    }

    return(
        <ConversationsContext.Provider value={value}>
            {children}
        </ConversationsContext.Provider>
    )
}

function arrayEquality(a, b){
    if (a.length !== b.length) return false
    a.sort()
    b.sort()

    return a.every((element, index) => {
        return element === b[index]
    })
}