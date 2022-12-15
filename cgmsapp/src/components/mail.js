import Sidebar from "./directMessagingSystem/sidebar";
import OpenConversation from "./directMessagingSystem/openConversation";
import {useConversations} from "../context/ConversationsProvider";
import {useState} from "react";

export default function Mail({username}){
    const { selectedConversation } = useConversations();
    const [deleteIndex, setDeleteIndex] = useState(0);

    return (
        <div className="d-flex" style={{height: "100vh"}}>
        <Sidebar username={username} deleteIndex={deleteIndex} setDeleteIndex={setDeleteIndex}/>
            {selectedConversation &&     <OpenConversation deleteIndex={deleteIndex}/>}
        </div>
    );
}