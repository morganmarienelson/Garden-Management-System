import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import UndoRejectButton from "./UndoRejectButton";
import Button from '@mui/material/Button';
import ViewAppBtn from "./ViewAppBtn";
import DeleteAppBtn from "./DeletePlotsBtn";

export default function AcceptedApps() {
    const columns = [
        { field: "firstName", headerName: "First name", width: 130 },
        { field: "lastName", headerName: "Last name", width: 130 },
        { field: "feePaid", headerName: "Fee Paid", width: 130},
        { field: "currentMember", headerName: "Existing Application", width: 160 },
        { field: "submitDate", headerName: "Submission Date", width: 140},
        { field: "submitTime", headerName: "Submission Time", width: 140},
        {
          field: "preferredPlotSize",
          headerName: "Plot Size",
          width: 120,
        },
        {
          field: "view",
          headerName: "View",
          width: 130,
          renderCell: ViewAppBtn,
        },
        {
          field: "delete",
          headerName: "Delete",
          width: 130,
          renderCell: DeleteAppBtn,
        },
      ];
  
  let rowData = [
    { id: 1, lastName: 'Johnson', firstName: 'Donny', age: 35, reopen: 1, },
    { id: 2, lastName: 'Levi', firstName: 'Donavon', age: 42, reopen: 2 },
    { id: 3, lastName: 'Gerald', firstName: 'Jiminies', age: 45, reopen: 3 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, reopen: 4 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null, reopen: 5 },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, reopen: 6 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 , reopen: 7},
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, reopen: 8 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, reopen: 9 },
  ];
  
  const [rows, setRows] = useState(rowData)
  
  const handleUndoReject = (i, handleClose) => {
    console.log(i)
    let temp = rows.slice()
    let index = temp.map(function(e) { return e.id; }).indexOf(i);
    temp.splice(index, 1)
    setRows(temp)
    // TODO: post to open-applications in db
    handleClose()
  }

  return (
    <div style={{ height: 400, width: '100%' , display: "inline-block", alignContent: "center"}}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnThreshold={100}
      />
      <Button variant="outlined">Assign Plots</Button>
    </div>
  );
}