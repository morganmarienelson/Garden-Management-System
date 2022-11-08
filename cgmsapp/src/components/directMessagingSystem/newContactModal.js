import React, {useRef} from "react"
import {Modal, Form, Button} from 'react-bootstrap'
import {useContacts } from "../../context/ContactsProvider"

export default function NewContactModal({closeModal}) {
    const usernameRef = useRef();
    const nameRef = useRef();
    const { createContact } = useContacts()

    function handleSubmit(e){
        e.preventDefault();
        createContact(usernameRef.current.value, nameRef.current.value)
        closeModal();
    }

    return (
       <>
        <Modal.Header closeButton onHide={closeModal}>Create Contact</Modal.Header>
           <Modal.Body>
               <Form onSubmit={handleSubmit}>
                   <Form.Group className="m-2">
                   <Form.Label>Username</Form.Label>
                       <Form.Control type="text" ref={usernameRef} required/>
                   </Form.Group>
                   <Form.Group className="m-2">
                       <Form.Label>Name</Form.Label>
                       <Form.Control type="text" ref={nameRef} required/>
                   </Form.Group>
                   <Button className="m-2" type="submit">Create</Button>
               </Form>
           </Modal.Body>
       </>

    );

}
