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
        editable: false,
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
        editable: true,
      },
      {
        field: 'owner firstName',
        headerName: 'First Name',
        width: 100,
        editable: true,
      },
      {
        field: 'owner lastName',
        headerName: 'Last Name',
        width: 100,
        editable: true,
      },
      {
        field: 'other',
        headerName: 'Other Notes',
        width: 400,
        editable: false,
      },
      {
        field: 'edit',
        headerName: 'Edit',
        width: 150,
        renderCell: (index) => {
          return <EditPlotsBtn index={index} editFunction={editFunction} getRowData={getRowData}></EditPlotsBtn>
        }
      },
      {
        field: 'delete',
        headerName: 'Delete',
        width: 150,
        renderCell: (index) => {
          return <DeletePlotsBtn index={index} deleteFunction={deleteFunction}></DeletePlotsBtn>
        }
      }
    ];
    const [gridData, setGridData] = useState(GridTestData);
    const columns = cols

  let deleteFunction = (id) => {
    //console.log(id);
    setGridData(gridData.filter((i)=>{
      return i.id!==id;
    }))
  }

  let getRowData = (id) => {
    const foundData = gridData.find((data) => { return data.id === id });
    return foundData;
  }

  let editFunction = (id) => {
    setGridData([...gridData,
      {
      dimensions: formState.dimensions,
      feeAmount: formState.feeAmount,
      other: formState.other,
      },])
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
          columnThreshold={100}
        />
      </Box>
      </div>
    );
  };