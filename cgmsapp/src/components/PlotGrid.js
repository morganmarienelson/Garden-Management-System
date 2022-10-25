import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

class PlotGrid extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (
      <div>
      <Box sx={{width: '92%', m: 5}}>
        <DataGrid
          rows={this.props.gridData}
          columns={this.props.columns}
          handleSubmitForm={this.handleSubmitForm}
          autoHeight={true}
          pageSize={8}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
        />
      </Box>
      </div>
    );
  };
}

export default PlotGrid;