import React, {useState} from "react"
import {Modal, Form, Button} from 'react-bootstrap'
import { useContacts } from "../../context/ContactsProvider"
import { useConversations } from "../../context/ConversationsProvider"
import {Alert, Snackbar} from "@mui/material";


export default function NewConversationModal({closeModal}) {
    const [selectedContactUsernames, setSelectedContactUsernames] = useState([]);
    const { contacts } = useContacts();
    const {createConversation} = useConversations();
    const [alertOpen, setAlertOpen] = useState(false);
    const [message, setMessage] = useState("");

    function handleSubmit(e){
        e.preventDefault();
        if (selectedContactUsernames.length === 0){
            setMessage('Contact not selected')
            setAlertOpen(true)
        } else {
            createConversation(selectedContactUsernames)
            closeModal();
        }
    }

    const handleAlertClose = () =>{
        setAlertOpen(false);
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
            <Modal.Header onHide={closeModal} closeButton>Create Conversation</Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                     {contacts.map(contact => (
                         <Form.Group controlId={contact.username} key={contact.username} className="m-2">
                             <Form.Check
                                 type="checkbox"
                                 value={selectedContactUsernames.includes(contact.username)}
                                 label={contact.name}
                                 onChange={()=> handleCheckboxChange(contact.username)}/>
                         </Form.Group>
                     ))}
                    <Button type="submit" className="m-2">Create</Button>
                </Form>
            </Modal.Body>
            <Snackbar open={alertOpen} sx={{ width: '100%' }} autoHideDuration={2000} onClose={handleAlertClose}>
                <Alert autoHideDuration={1} severity="error" onClose={handleAlertClose}>
                    {message}
                </Alert>
            </Snackbar>
        </>

    );

}
