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
        renderCell: EditPlotsBtn,
      },
      {
        field: 'delete',
        headerName: 'Delete',
        width: 150,
        renderCell: () => {
          return <DeletePlotsBtn></DeletePlotsBtn>
        }
      }
    ];
    const [gridData, setGridData] = useState(GridTestData);
    const columns = cols

  let testFunc = () => {
    this.setState({ gridData: [...this.state.gridData, 
      {
        id: this.state.gridData.length+1,
        owner: "Vacant",
        width: "25%",
        dimensions: "20' x 20'",
        feeAmount: 20,
        other: "Plot is right by the road.",
        delete: this.state.gridData.length+1,
    },] })
    console.log(this.state.gridData)
    this.forceUpdate()
  }

  let deleteFunction = (id) => {
    //this.setState({gridData: this.gridData.filter((i)=>{
    //  return i.id!==id;
    //})})
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
      <button onClick={testFunc} />
      </div>
    );
  };