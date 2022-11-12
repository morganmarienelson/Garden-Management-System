import React, { useState } from "react";
import { DataGrid } from '@mui/x-data-grid';
import UndoRejectButton from "./UndoRejectButton";

export default function workdayTable() {
  const columns = [
    { field: 'firstName', 
      headerName: 'First name', 
      width: 130 
    },
    { field: 'lastName', 
      headerName: 'Last name', 
      width: 130 
    },
    {
      field: 'id',
      headerName: 'ID',
      width: 130,
    },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
    {
      field: 'wkd1',
      headerName: 'Workday 1',
      width: 130,
    },
    {
      field: 'wkd2',
      headerName: 'Workday 2',
      width: 130,
    },
  ];

  const rows = [
    {
      firstName: "Joe",
      lastName: "Jenkins",
      id: "1",
      wkd1: "12/25/2022",
      wkd2: "06/15/2023",
    }
  ]

  return (
    <div style={{ height: 400, width: '70%' , display: "inline-block", alignContent: "center"}}>
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