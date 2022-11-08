import React, {useState} from 'react';
import {Tab, Nav, Button, Modal} from 'react-bootstrap'
import Conversations from "./conversations";
import Contacts from "./contacts";
import NewConversationModal from "./newConversationModal";
import NewContactModal from "./newContactModal";

const Conversations_key = "conversations"
const Contact_key = "contacts"

export default function Sidebar({username}){
    const [activeKey, setActiveKey] = useState(Conversations_key);
    const [modalOpen, setModalOpen] = useState(false);
    const conversationOpen = activeKey === Conversations_key;

    function closeModal(){
        setModalOpen(false);
    }

    return (
        <div style={{width: '350px'}} className="d-flex flex-column border border-right bg-light border-right">
            <Tab.Container activeKey={activeKey} onSelect={setActiveKey}>
                <Nav variant="tabs" className="flex-row">
                    <Nav.Item className="col-xs-4 col-sm-6 text-center">
                        <Nav.Link eventKey={Conversations_key}>
                            Conversations
                        </Nav.Link>
                    </Nav.Item>
                    <Nav.Item className="col-xs-4 col-sm-6 text-center">
                        <Nav.Link eventKey={Contact_key}>
                            Contact
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
                <Tab.Content className="border-right overflow-auto flex-grow-1">
                    <Tab.Pane eventKey={Conversations_key}>
                        <Conversations/>
                    </Tab.Pane>
                    <Tab.Pane eventKey={Contact_key}>
                        <Contacts/>
                    </Tab.Pane>
               </Tab.Content>
                <div className="p-2 border-top border-right small">
                    Your Username: <span className="text-muted">{username}</span>
                </div>
                <Button className="rounded-0" onClick={() => setModalOpen(true)}>
                    New {conversationOpen ? 'Conversation' : 'Contact'}
                </Button>

                <Modal show={modalOpen} close={closeModal}>
                    {conversationOpen ?
                    <NewConversationModal closeModal={closeModal}/> :
                        <NewContactModal closeModal={closeModal}/>
                    }
                </Modal>
            </Tab.Container>
        </div>
    )
}