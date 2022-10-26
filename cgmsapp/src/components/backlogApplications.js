import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import UndoRejectButton from "./UndoRejectButton";

export default function DeclinedTable() {
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
      field: 'age',
      headerName: 'Age',
      type: 'number',
      width: 90,
    },
    {
      field: 'fullName',
      headerName: 'Full name',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
    {
      field: 'reopen',
      headerName: 'Re-Open',
      width: 120,
      renderCell: (index) => {
        return <UndoRejectButton handleUndoReject={handleUndoReject} index={index}></UndoRejectButton>
      },
    },
  ];
  
  let rowData = [
    { id: 1, lastName: 'Testingson', firstName: 'Jon', age: 35, reopen: 1},
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, reopen: 2 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, reopen: 3 },
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
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnThreshold={100}
      />
    </div>
  );
}