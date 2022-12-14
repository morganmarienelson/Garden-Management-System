import React, { useState } from 'react';
import { Card} from 'antd';
import PlotGrid from "./PlotGrid";
import AddPlotsBtn from "./AddPlotsBtn";
import GardenGrid from "./GardenGrid";
import '../css/gardenGrid.css'
import { GridTestData } from '../data/GridTestData';
import PlotDataColumns from '../data/PlotDataColumns';
import apiClient from '../api/apiClient';
import { useEffect } from 'react';

export default function Plots(){
    const [activeTabKey, setActiveTabKey] = useState('grid')
    const [showGrid, setShowGrid] = useState(true)
    const [gridData, setGridData] = useState([])
    const [columns, setColumns] = useState(PlotDataColumns)
    const [formState, setFormState] = React.useState(false);

    useEffect(() => {
        apiClient.get("/v1/plots/get/all")
          .then (res => {
            res.data.forEach((row) => {
              row.vacant = true
            });
          setGridData(res.data);
        })
      }, []);
    console.log("plots rendered.")
  
    const handleFormChange = (event, isCheckbox=false) => {
      const label = event.target.id;
      let value = isCheckbox ? event.target.checked : event.target.value
      setFormState({...formState, [label]: value})
    }

    const handleSubmitForm = (setOpen) => {
        let temp = [...gridData, {id: 0}]
        setGridData([...gridData, 
              {
                id: temp.reduce((prev, current) => (+prev.id > +current.id) ? prev : current), //TODO: This too. Yikes.
                owner: "Vacant",
                width: "25%",
                vacant: true,
                dimensions: formState.dimensions,
                feeAmount: formState.feeAmount,
                other: formState.other,
            },
        ])
        // TODO: Not tested due to internal server error!
        let apiObject = {
            "plotId": temp.reduce((prev, current) => (+prev.id > +current.id) ? prev : current),
            "size": formState.dimensions,
            "feeAmount": parseInt(formState.feeAmount),
            "memberId": 420,
        }
        apiClient.post('/v1/plots/create', {apiObject})
        setOpen(false)
    }

    let deleteFunction = (id) => {
        setGridData(gridData.filter((i)=>{
          return i.id !== id;
        }))
      }
    
      let editDoubleClickFunction = (params, event) => {
        let temp = gridData.slice()
        temp[temp.findIndex(x => x.id === params.row.id)][params.field] = event.target.value
        setGridData(temp)
        // TODO: Not tested due to internal server error!
        // apiClient.put(`/v1/plots/update/${formState.id}`,
        // {
        //     "size": formState.dimensions,
        //     "feeAmount": formState.feeAmount,
        //     "memberId": null,
        // })
      }
    
      let editFunction = (editedRow) => {
        let temp = gridData.slice()
        temp[temp.findIndex(x => x.plotId === editedRow.plotId)] = editedRow
        setGridData(temp)
        // TODO: Not tested due to internal server error!
        // apiClient.put(`/v1/plots/update/${editedRow.plotId}`, 
        // {
        //     size: editedRow.dimensions,
        //     feeAmount: parseInt(editedRow.feeAmount),
        //     memberId: 1234,
        // })
      }
    
      let loadRowData = (id) => {
        return gridData[gridData.findIndex(x => x.plotId == id)]
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
    ]

    let realData = []
    if (!!gridData) {
      for (const row of gridData) {
        realData.push({
          id: row.plotId,
          dimensions: row.size,
          feeAmount: row.feeAmount,
          vacant: true,
        })
      }
    }

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
                    <PlotGrid 
                        columns={columns} 
                        gridData={realData} 
                        deleteFunction={deleteFunction} 
                        editDoubleClickFunction={editDoubleClickFunction}
                        editFunction={editFunction}
                        loadRowData={loadRowData}
                    />
                    </>
                )}
            </Card>
        </div>
    );
        }