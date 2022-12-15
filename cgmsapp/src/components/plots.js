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