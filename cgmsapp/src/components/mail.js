import Sidebar from "./directMessagingSystem/sidebar";
import OpenConversation from "./directMessagingSystem/openConversation";
import {useConversations} from "../context/ConversationsProvider";

export default function Mail({username}){
    const { selectedConversation } = useConversations();

    return (
        <div className="d-flex" style={{height: "100vh"}}>
        <Sidebar username={username}/>
            {selectedConversation &&     <OpenConversation/>}
        </div>
    );
}
// import React from "react";
//
// export default function Mail({username}){
//     return (
//         <div>
//             <h1>Mail</h1>
//         </div>
//     );
// }

