import React from "react"
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../../context/ConversationsProvider";

export default function Conversations() {
    const {conversations, selectedConversationIndex, setConversations} = useConversations();


    function onDelete(){
        console.log("I was clicked")
        console.log(conversations);
        const convo = conversations.filter((conversation, index)=> 1 != index);
        console.log(convo)
        setConversations(convo);
    }



    return (
        <div>
            {conversations.map((conversation, index)  => (
               <div>
                <ListGroup horizontal>
                    <ListGroup.Item key={index}
                                    action
                                    onClick={() =>       selectedConversationIndex(index) }
                                    active={conversation.selected}
                    >
                        {conversation.recipients.map(r => r.name).join(', ')}
                    </ListGroup.Item>
                        <a onClick={onDelete}>Delete</a>
                </ListGroup>
               </div>
            ))}
        </div>
    );

}