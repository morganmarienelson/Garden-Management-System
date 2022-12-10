import React, {useState} from "react"
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../../context/ConversationsProvider";

export default function Conversations() {
    const {conversations, selectedConversationIndex, setConversations} = useConversations();
     const [deleteIndex, setDeleteIndex] = useState(0);

    function onDelete(){
        console.log("I was clicked")
        setConversations(conversations.filter((conversation, index)=> deleteIndex != index));
        conversations.map(conversation => {
            conversation.recipients.map(r => {
                //TODO: need to set it to old name
               r.name = "test";
            })

        })
        conversations.map((conversation, index)  => {
            conversation.recipients.map(r =>  {
                console.log(r.name);
            })
        })
    }

    return (
        <div>
            {conversations.map((conversation, index)  => (
               <div>
                <ListGroup horizontal>
                    <ListGroup.Item key={index}
                                    action
                                    onClick={() => {
                                        selectedConversationIndex(index);
                                            setDeleteIndex(index);
                                            console.log(conversations);
                                            console.log(conversation.recipients);
                                    }
                    }
                                    active={conversation.selected}
                    >
                        {conversation.recipients.map(r => {
                            if (r.name.name){
                            return r.name.name;
                            } else {
                                return r.name;
                            }
                        }).join(', ')
                        }
                    </ListGroup.Item>
                        <a onClick={onDelete}>Delete</a>
                </ListGroup>
               </div>
            ))}
        </div>
    );

}