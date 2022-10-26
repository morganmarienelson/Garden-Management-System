import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import {GridTestData} from "../data/GridTestData";
import EditPlotsBtn from './EditPlotsBtn';
import DeletePlotsBtn from './DeletePlotsBtn';

class PlotGrid extends React.Component {
  constructor(props) {
    super(props);
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
        field: 'ownerfirstName',
        headerName: 'First Name',
        width: 100,
        editable: true,
      },
      {
        field: 'ownerlastName',
        headerName: 'Last Name',
        width: 100,
        editable: true,
      },
      {
        field: 'other',
        headerName: 'Other Notes',
        width: 350,
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
        renderCell: DeletePlotsBtn,
      }
    ];
    this.state = {gridData: GridTestData, columns: cols};
  }

  testFunc = () => {
    this.setState({ gridData: [...this.state.gridData, 
      {
        id: this.state.gridData.length+1,
        vaccant: false,
        ownerlastName: "Mike",
        ownerfirstName: "Wolff",
        width: "25%",
        dimensions: "20' x 20'",
        feeAmount: 20,
        other: "Plot is right by the road.",
    },] })
    console.log(this.state.gridData)
    this.forceUpdate()
  }


  render() {
    return (
      <div>
      <Box sx={{width: '92%', m: 5}}>
        <DataGrid
          rows={this.state.gridData}
          columns={this.state.columns}
          autoHeight={true}
          pageSize={8}
          rowsPerPageOptions={[5]}
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      <button onClick={this.testFunc} />
      </div>
    );
  };
}

export default PlotGrid;