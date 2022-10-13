import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {GridTestData} from "../data/GridTestData";

const columns = [
  { field: 'id', headerName: 'ID', width: 70, editable: false},
  {
    field: 'dimensions',
    headerName: 'Dimensions',
    width: 150,
    editable: false,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 100,
    editable: false,
  },
  {
    field: 'owner',
    headerName: 'Owner',
    width: 150,
    editable: false,
  },
  {
    field: 'feeAmount',
    headerName: 'Yearly Fee',
    width: 150,
    editable: false,
  },
  {
    field: 'other',
    headerName: 'Other Notes',
    width: 400,
    editable: false,
  }
];

const jsonResp = { // dummy data, json structure could change depending on what backend does
  "plots": [
    {
      "id":"1",
      "dimensions": "10' x 20'", 
      "status": true,
      "feeAmount": 20,
      "plotOwner": "Blugold, Blu T.",
      "other": "Plot can only be used for vegetables.",
    },
    {
      "id":"2",
      "dimensions": "10' x 20'", 
      "status": true,
      "feeAmount": 20,
      "plotOwner": "Blugold, Blu T.",
      "other": "Plot is next to road.",
    },
    {
      "id":"3",
      "dimensions": "20' x 20'", 
      "status": false,
      "feeAmount": 20,
      "plotOwner": "Blugold, Blu T.",
      "other": "Plot can only be used for vegetables.",
    },
    {
      "id":"4",
      "dimensions": "30' x 30'", 
      "status": false,
      "feeAmount": 20,
      "plotOwner": "Blugold, Blu T.",
      "other": "Plot can only be used for fruits.",
    },
    {
      "id":"5",
      "dimensions": "10' x 10'", 
      "status": true,
      "feeAmount": 20,
      "plotOwner": "Blugold, Blu T.",
      "other": "",
    },
  ]
}

for (let plot of jsonResp.plots) {
  plot.status = plot.status ? "✅" : "❌";
  plot.feeAmount = `$${plot.feeAmount}`
}


export default function PlotGrid() {
  return (
    <Box sx={{width: '92%', m: 5}}>
      <DataGrid
        rows={GridTestData}
        columns={columns}
        autoHeight={true}
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
      />
    </Box>
  );
}