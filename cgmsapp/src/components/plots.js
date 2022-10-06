import { red } from "@mui/material/colors";
import React from "react";
import OpenAppBtn from "./openAppBtn";

import PlotGrid from "./PlotGrid";
import AddPlotsBtn from "./AddPlotsBtn";

export default function Plots() {
    const contentWrapperStyle = {
        "margin": "40px"
    }
    return (
        <div>
            <div id="content-wrapper" style={contentWrapperStyle}>
                <div id="page-label-box">
                    <h1>Plots</h1>
                    <AddPlotsBtn />
                </div>
            </div>
            <PlotGrid />
        </div>
    );
    };