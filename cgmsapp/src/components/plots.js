import React, { useState } from 'react';
import { Card} from 'antd';
import PlotGrid from "./PlotGrid";
import AddPlotsBtn from "./AddPlotsBtn";
import GardenGrid from "./GardenGrid";

export default function Plots(){
    const [activeTabKey, setActiveTabKey] = useState('grid')
    const [showGrid, setShowGrid] = useState(true)

    const tabList = [
        {
            key: "grid",
            tab: "Grid Display"
        },
        {
            key: "table",
            tab: "Table Display"
        },
]

    return (
        <div>
            <div id="content-wrapper" >
                <div id="page-label-box">
                    <h1>Plots</h1>
                    <AddPlotsBtn />
                </div>
            </div>
            <Card
                style={{ width: "100%" }}
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                    function onTabChange(key) {
                        setActiveTabKey(key)
                        if (key === "grid"){
                            setShowGrid(true);
                        } else {
                            setShowGrid(false)
                        }
                    }
                    onTabChange(key);
                }}
            >
                {showGrid ? (
                    <GardenGrid/>
                ) : (
                    <PlotGrid/>
                )}
            </Card>
        </div>
    );
        }