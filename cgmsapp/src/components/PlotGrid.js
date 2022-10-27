import * as React from 'react';
import { useState } from "react";
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {GridTestData} from "../data/GridTestData";
import EditPlotsBtn from './EditPlotsBtn';
import DeletePlotsBtn from './DeletePlotsBtn';

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
        field: 'owner email',
        headerName: 'Email',
        width: 100,
        editable: true,
      },
      {
        field: 'owner phone',
        headerName: 'Phone',
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
          return <EditPlotsBtn index={index} deleteFunction={deleteFunction}></EditPlotsBtn>
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
    setGridData(gridData.filter((i)=>{
      return i.id!==id;
    }))
  }

  let editFunction = (id) => {
    
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
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          columnThreshold={100}
        />
      </Box>
      </div>
    );
  };