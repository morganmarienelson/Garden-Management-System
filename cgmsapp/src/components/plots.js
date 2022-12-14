import React, { useState } from 'react';
import { Card} from 'antd';
import PlotGrid from "./PlotGrid";
import AddPlotsBtn from "./AddPlotsBtn";
import GardenGrid from "./GardenGrid";
import '../css/gardenGrid.css'
import { GridTestData } from '../data/GridTestData';
import PlotDataColumns from '../data/PlotDataColumns';

export default function Plots(){
    const [activeTabKey, setActiveTabKey] = useState('grid')
    const [showTable, setShowTable] = useState(true)

    const tabList = [
        {
            key: "table",
            tab: "Plot Table"
        },
        {
            key: "Grid",
            tab: "Grid Display"
        },
]

    return (
        <div>
            <div id="content-wrapper" >
                <div id="page-label-box" style={{margin: 10}}>
                </div>
            </div>
            <Card
                className="card"
                style={{ width: "100%" }}
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                    function onTabChange(key) {
                        setActiveTabKey(key)
                        if (key === "table"){
                            setShowTable(true);
                        } else {
                            setShowTable(false)
                        }
                    }
                    onTabChange(key);
                }}
            >
                {showTable ? (
                    <>
                    <AddPlotsBtn />
                    <PlotGrid/>
                    </>
                ) : (
                    <GardenGrid/>
                )}
            </Card>
        </div>
    );
        }