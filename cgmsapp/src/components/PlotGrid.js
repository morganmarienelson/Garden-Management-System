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
          return <EditPlotsBtn id={params.row.id} editFunction={props.editFunction} loadRowData={props.loadRowData}></EditPlotsBtn>
        }
      },
      {
        field: 'delete',
        headerName: 'Delete',
        width: 150,
        renderCell: (params) => {
          return <DeletePlotsBtn id={params.row.id} deleteFunction={props.deleteFunction}></DeletePlotsBtn>
        }
      }
    ];

    return (
      <div>
      <Box sx={{width: '92%', m: 5}}>
        <DataGrid
          rows={props.gridData}
          columns={cols}
          autoHeight={true}
          pageSize={8}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          onCellEditStop={(params, event) => {props.editDoubleClickFunction(params, event)}}
          columnThreshold={100}
        />
      </Box>
      </div>
    );
  };