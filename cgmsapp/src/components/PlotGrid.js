import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import EditPlotsBtn from './EditPlotsBtn';
import DeletePlotsBtn from './DeletePlotsBtn';
import { GridTestData } from '../data/GridTestData';

export default function PlotGrid(props) {
    const cols = [
      { field: 'id', headerName: 'ID', width: 100, editable: false},
      {
        field: 'dimensions',
        headerName: 'Dimensions',
        width: 100,
        editable: true,
      },
      {
        field: 'feeAmount',
        headerName: 'Yearly Fee',
        width: 100,
        editable: true,
      },
      {
        field: 'vacant',
        headerName: 'Vacant',
        width: 100,
        editable: false,
      },
      {
        field: 'owner firstName',
        headerName: 'First Name',
        width: 100,
        editable: false,
      },
      {
        field: 'owner lastName',
        headerName: 'Last Name',
        width: 100,
        editable: false,
      },
      {
        field: 'other',
        headerName: 'Other Notes',
        width: 400,
        editable: true,
      },
      {
        field: 'edit',
        headerName: 'Edit',
        width: 150,
        renderCell: (params) => {
          return <EditPlotsBtn id={params.row.id} editFunction={editFunction} loadRowData={loadRowData}></EditPlotsBtn>
        }
      },
      {
        field: 'delete',
        headerName: 'Delete',
        width: 150,
        renderCell: (params) => {
          return <DeletePlotsBtn id={params.row.id} deleteFunction={deleteFunction}></DeletePlotsBtn>
        }
      }
    ];
    const [gridData, setGridData] = useState(GridTestData);
    const columns = cols

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
    temp[temp.findIndex(x => x.id == editedRow.id)] = editedRow
    setGridData(temp)
    console.log(gridData)
  }

  let loadRowData = (id) => {
    return gridData[gridData.findIndex(x => x.id == id)]
  }


    return (
      <div>
      <Box sx={{width: '92%', m: 5}}>
        <DataGrid
          rows={gridData}
          columns={columns}
          autoHeight={true}
          pageSize={8}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onCellEditStop={(params, event) => {editDoubleClickFunction(params, event)}}
          columnThreshold={100}
        />
      </Box>
      </div>
    );
  };