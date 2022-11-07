import React, {useState} from "react"
import {Modal, Form, Button} from 'react-bootstrap'
import { useContacts } from "../../context/ContactsProvider"
import { useConversations } from "../../context/ConversationsProvider"

export default function NewConversationModal({closeModal}) {
    const [selectedContactUsernames, setSelectedContactUsernames] = useState([]);
    const { contacts } = useContacts();
    const {createConversation} = useConversations();

    function handleSubmit(e){
        e.preventDefault();
         createConversation(selectedContactUsernames)
        closeModal();
    }

    function handleCheckboxChange(contactUsername){
        setSelectedContactUsernames(prevSelectedContactUsernames => {
            if (prevSelectedContactUsernames.includes(contactUsername)){
                return prevSelectedContactUsernames.filter(prevUsername => {
                    return contactUsername !== prevUsername
                })
            } else {
                return [...prevSelectedContactUsernames, contactUsername]
            }
        })
    }

    return (
        <>
            <Modal.Header closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                     {contacts.map(contact => (
                         <Form.Group controlId={contact.username} key={contact.username}>
                             <Form.Check
                                 type="checkbox"
                                 value={selectedContactUsernames.includes(contact.username)}
                                 label={contact.name}
                                 onChange={()=> handleCheckboxChange(contact.username)}/>
                         </Form.Group>

                     ))}
                    <Button type="submit">Create</Button>
                </Form>
            </Modal.Body>
        </>

    );

}
