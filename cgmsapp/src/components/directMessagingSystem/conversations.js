import React, {useState} from "react"
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../../context/ConversationsProvider";

export default function Conversations() {
    const {conversations, selectedConversationIndex, setConversations} = useConversations();
     const [deleteIndex, setDeleteIndex] = useState(0);

    function onDelete(){
        let convo;
        convo = conversations.filter((conversation, index)=> deleteIndex != index);
        setConversations(convo);
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
                            if (r.name.name) {
                                r.name = r.name.name;
                            }
                                return r.name;
                        }).join(', ')
                        }
                    </ListGroup.Item>
                        <a onClick={onDelete}>
                            <b>Delete</b>
                        </a>
                </ListGroup>
               </div>
            ))}
        </div>
    );

}