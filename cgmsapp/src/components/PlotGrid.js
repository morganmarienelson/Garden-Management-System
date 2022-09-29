import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, editable: false},
  {
    field: 'dimensions',
    headerName: 'Dimensions',
    width: 150,
    editable: false,
  },
  {
    field: 'plotOwner',
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

const rows = [
  { id: 1, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 2, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 3, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 4, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 5, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 6, dimensions: "20x20", feeAmount: 123.45},
  { id: 7, dimensions: "20x20", feeAmount: 123.45},
  { id: 8, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 9, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 10, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 11, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 12, dimensions: "20x20", feeAmount: 123.45, plotOwner: 9001},
  { id: 13, dimensions: "20x20", feeAmount: 123.45},
  { id: 14, dimensions: "20x20", feeAmount: 123.45},
];

export default function PlotGrid() {
  return (
    <Box sx={{width: '92%', m: 5.5}}>
      <DataGrid
        rows={rows}
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