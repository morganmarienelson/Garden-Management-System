import React, { useState } from 'react';
import { Card} from 'antd';
import PlotGrid from "./PlotGrid";
import AddPlotsBtn from "./AddPlotsBtn";
import GardenGrid from "./GardenGrid";
import '../css/gardenGrid.css'

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
                <div id="page-label-box" style={{margin: 10}}>
                    <h1>Plots</h1>
                </div>
            </div>
            <Card
                className="card"
                style={{ width: "100%" }}
                clas
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
                    <>
                    <AddPlotsBtn />
                    <PlotGrid/>
                    </>
                )}
            </Card>
        </div>
    );
        }