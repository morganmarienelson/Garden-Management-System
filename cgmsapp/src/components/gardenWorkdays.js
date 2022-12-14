import React, { useState } from 'react';
import { DataGrid, GridCellParams } from '@mui/x-data-grid';
//import WorkdayData from '../data/WorkdayData';
import UpdateWorkday from "./UpdateWorkday";
import { WorkdayData } from '../data/WorkdayData';
import Box from '@mui/material/Box';
import clsx from 'clsx';

export default function GardenWorkdays(props) {
  const [workdayData, setWorkdayData] = useState(WorkdayData)

  let editFunction = (editedRow) => {
    let temp = workdayData.slice()
    temp[temp.findIndex(x => x.id === editedRow.id)] = editedRow
    console.log(temp)
    setWorkdayData(temp)
  }

  let loadRowData = (id) => {
    return workdayData[workdayData.findIndex(x => x.id === id)]
  }

  const columns = [
    {
      field: 'id',
      headerName: 'ID',
      width: 50,
    },
    { field: 'firstName', 
      headerName: 'First name', 
      width: 130 
    },
    { field: 'lastName', 
      headerName: 'Last name', 
      width: 130 
    },
    // {
    //   field: 'wkd1',
    //   headerName: 'Workday 1',
    //   width: 130,
    //   cellClassName: (params) => {
    //     return clsx('super-app', {
    //       incomplete: params.value === "",
    //     });
    //   },
    // },
    {
      field: 'wkd2',
      headerName: 'Workday',
      width: 130,
      cellClassName: (params) => {
        return clsx('super-app', {
          incomplete: params.value === "",
        });
      },
    },
    // {
    //   field: 'notes',
    //   headerName: 'Additional Notes',
    //   width: 220,
    // },
    // {
    //   field: 'update',
    //   headerName: 'Update Workdays',
    //   width: 150,
    //   renderCell: (params) => {
    //     return <UpdateWorkday id={params.row.id} loadRowData={loadRowData} editFunction={editFunction}></UpdateWorkday>
    //   }
    // },
  ];


  return (
    <div style={{ height: 400, width: '70%' , display: "inline-block", alignContent: "center"}}>
      <Box
          sx={{
            height: 400,
            width: '100%',
            '& .super-app.incomplete': {
            backgroundColor: '#d47483',
            color: 'black',
            fontWeight: '600',
            initialLetter: 'Incomplete',
         },
        }}>
      <DataGrid
        rows={WorkdayData}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        columnThreshold={100}
        editFunction={editFunction}
        loadRowData={loadRowData}
      />
      </Box>
    </div>
  );
}