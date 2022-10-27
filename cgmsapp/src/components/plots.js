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
    const [showGrid, setShowGrid] = useState(true)
    const [gridData, setGridData] = useState(GridTestData)
    const [columns, setColumns] = useState(PlotDataColumns)
    const [formState, setFormState] = React.useState(false);
  
    const handleFormChange = (event, isCheckbox=false) => {
      const label = event.target.id;
      let value = isCheckbox ? event.target.checked : event.target.value
      setFormState({...formState, [label]: value})
      console.log(`${label}: ${value}`)
      console.log(formState)
    }

    const handleSubmitForm = (setOpen) => {
        setGridData([...gridData, 
              {
                id: gridData.length+1,
                owner: "Vacant",
                width: "25%",
                dimensions: formState.dimensions,
                feeAmount: formState.feeAmount,
                other: formState.other,
            },
        ])
        console.log(gridData)
        setOpen(false)
    }

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
                    <AddPlotsBtn handleSubmitForm={handleSubmitForm} handleFormChange={handleFormChange}/>
                    <PlotGrid columns={columns} gridData={gridData}/>
                    </>
                )}
            </Card>
        </div>
    );
        }