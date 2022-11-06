import React from "react";
import {useContacts} from "../../context/ContactsProvider";
import { ListGroup } from 'react-bootstrap'

export default function Contacts() {
    const {contacts } = useContacts();

    return (
      <ListGroup variant="flush">
          {contacts.map(contact => (
              <ListGroup.Item key={contact.username}>
                  {contact.name}
              </ListGroup.Item>
          ))}
      </ListGroup>
    );

}