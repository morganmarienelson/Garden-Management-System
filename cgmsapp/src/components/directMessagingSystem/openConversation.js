import React, {useState, useCallback} from 'react';
import {Form, InputGroup, Button} from 'react-bootstrap'
import {useConversations} from "../../context/ConversationsProvider";

export default function OpenConversation({deleteIndex}){
    const [text, setText] = useState('');
    const setRef = useCallback(node => {
        if (node){
            node.scrollIntoView({smooth: true})
        }
    }, [])
    const {sendMessage, selectedConversation} = useConversations();
    const {conversations, setConversations} = useConversations();

    function handleSubmit(e){
        e.preventDefault();
        sendMessage(selectedConversation.recipients.map( r => r.username),
            text
        )
        setText('')
    }

    function onDelete(){
        console.log(deleteIndex);
        let convo;
        convo = conversations.filter((conversation, index)=> deleteIndex != index);
        setConversations(convo);
    }

    return (
        <div className="d-flex flex-column flex-grow-1 t-3">
            <a onClick={onDelete}   style={{padding: 5, width: "100%", float: "right"}}>
                <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24">
                    <path
                        d="M7 21q-.825 0-1.412-.587Q5 19.825 5 19V6H4V4h5V3h6v1h5v2h-1v13q0 .825-.587 1.413Q17.825 21 17 21ZM17 6H7v13h10ZM9 17h2V8H9Zm4 0h2V8h-2ZM7 6v13Z"/>
                </svg>
            </a>
            <div className="flex-grow-1 overflow-auto">
                <div className="d-flex flex-column align-items-start justify-content-end px-3">
                    {selectedConversation.messages.map((message, index) => {
                        const lastMessage = selectedConversation.messages.length -1  === index
                        return (
                            <div
                                ref={lastMessage ? setRef : null}
                                key={index}
                                className={`my-1 d-flex flex-column ${message.fromMe ?
                                'align-self-end' : ' '}`}>
                                <div className={`rounded px-2 py-1 ${message.fromMe ?
                                    'bg-primary text-white' : 'border'}`}>
                                    {message.text}
                                </div>
                                <div className={`text-muted small ${message.fromMe ?
                                    'text-right' : ''}`}>
                                    {message.fromMe ? 'You' : message.senderName}
                                </div>
                            </div>
                        )
                    })}
                </div>

            </div>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="m-2">
                    <InputGroup>
                        <Form.Control
                            as="textarea"
                            required
                            value={text}
                            onChange={e => setText(e.target.value) }
                            style={{height: '75px', resize: 'none' }}
                            ></Form.Control>
                        <InputGroup className="m-2" >
                            <Button type="submit">Send</Button>
                        </InputGroup>
                    </InputGroup>
                </Form.Group>
            </Form>
        </div>
    );
}
