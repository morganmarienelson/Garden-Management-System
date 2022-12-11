import React, {useState} from "react"
import {ListGroup} from "react-bootstrap";
import {useConversations} from "../../context/ConversationsProvider";

export default function Conversations({deleteIndex, setDeleteIndex}) {
    const {conversations, selectedConversationIndex} = useConversations();

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
                                            console.log(deleteIndex)
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
                </ListGroup>
               </div>
            ))}
        </div>
    );

}