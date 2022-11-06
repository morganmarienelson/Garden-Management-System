import react from 'react';
import { useState } from 'react';
import {Login} from "@mui/icons-material";
import Sidebar from "./directMessagingSystem/sidebar";

export default function Mail({userName}){
    return (
        <div className="d-flex" style={{height: "80vh"}}>
        <Sidebar userName={userName}/>
        </div>
    );
}
