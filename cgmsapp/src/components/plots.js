import React, { useState } from 'react';
import { Card} from 'antd';
import PlotGrid from "./PlotGrid";
import GardenWorkdays from "./GardenWorkdays";
import AddPlotsBtn from "./AddPlotsBtn";
import GardenGrid from "./GardenGrid";
import '../css/gardenGrid.css'
import { GridTestData } from '../data/GridTestData';
import PlotDataColumns from '../data/PlotDataColumns';

export default function Plots(){
    const [activeTabKey, setActiveTabKey] = useState("grid")
    const [showGrid, setShowGrid] = useState(true)
    const [showWorkday, setShowWorkday] = useState(false)
    const [gridData, setGridData] = useState(GridTestData)
    const [columns, setColumns] = useState(false)
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
                vacant: true,
                dimensions: formState.dimensions,
                feeAmount: formState.feeAmount,
                other: formState.other,
            },
        ])
        console.log(gridData)
        setOpen(false)
    }

    //
    let deleteFunction = (id) => {
        setGridData(gridData.filter((i)=>{
          return i.id !== id;
        }))
      }
    
      let editDoubleClickFunction = (params, event) => {
        let temp = gridData.slice()
        temp[temp.findIndex(x => x.id === params.row.id)][params.field] = event.target.value
        setGridData(temp)
        console.log(gridData)
      }
    
      let editFunction = (editedRow) => {
        let temp = gridData.slice()
        temp[temp.findIndex(x => x.id === editedRow.id)] = editedRow
        setGridData(temp)
        console.log(gridData)
      }
    
      let loadRowData = (id) => {
        return gridData[gridData.findIndex(x => x.id === id)]
      }
    //

    const tabList = [
        {
            key: "grid",
            tab: "Grid Display"
        },
        {
            key: "table",
            tab: "Table Display"
        },
        {
            key: "workday",
            tab: "Workday Display"
        },
    ]

    return (
        <div>
        <div id="content-wrapper">
          <div id="page-label-box" style={{ margin: 10 }}></div>
        </div>
        <Card
          className="card"
          style={{ width: "100%" }}
          clas
          tabList={tabList}
          activeTabKey={activeTabKey}
          onTabChange={(key) => {
            function onTabChange(key) {
              setActiveTabKey(key);
            }
            if (key === "gird") {
              setShowGrid(true);
              setShowWorkday(false);
              setColumns(false);
            } else if (key === "table") {
              setColumns(true)
              setShowGrid(false);
              setShowWorkday(false);
            } else if (key === "workday") {
              setShowWorkday(true);
              setShowGrid(false);
              setColumns(false);
            } else {
              setShowGrid(false);
              setShowWorkday(false);
              setColumns(false)
            }
            onTabChange(key);
          }}
        >
          {columns && <AddPlotsBtn handleSubmitForm={handleSubmitForm} handleFormChange={handleFormChange}/>}
          {columns && <PlotGrid 
                                  columns={columns} 
                                  gridData={gridData} 
                                  deleteFunction={deleteFunction} 
                                  editDoubleClickFunction={editDoubleClickFunction}
                                  editFunction={editFunction}
                                  loadRowData={loadRowData}
                                  />}
          {showWorkday && <GardenWorkdays />}
          {!showWorkday && !columns && <GardenGrid/>}
        </Card>
      </div>
    );
  }