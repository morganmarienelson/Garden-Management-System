import react from 'react';
import { useState } from 'react';
import {Login} from "@mui/icons-material";
import Sidebar from "./directMessagingSystem/sidebar";

export default function Mail({username}){
    return (
        <div className="d-flex" style={{height: "80vh"}}>
        <Sidebar username={username}/>
        </div>
    );
}
