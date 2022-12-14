import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { OutlinedInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import apiClient from '../api/apiClient';

export default function AddPlotsBtn() {
  const [open, setOpen] = React.useState(false);
  const [plotId, setPlotId] = React.useState("");
  const [dimensions, setDimensions] = React.useState("");
  const [feeAmount, setFeeAmount] = React.useState("");


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addPlot = () => {
    apiClient.post(`/v1/plots/create`, {plotId: plotId, size: dimensions, feeAmount: feeAmount, memberId: 0})
      .then((res) => {
        console.log(res.data);
        //if status is 200, then the plot was added successfully
        if (res.status === 200) {
          setOpen(false);
        }else {
          alert("Error adding plot");
        }
      }
    )
  }

  const handleFormChange = (event) => {
    const { id, value } = event.target;
    if (id === "ID") {
      setPlotId(value);
    } else if (id === "dimensions") {
      setDimensions(value);
    } else if (id === "feeAmount") {
      setFeeAmount(value);
    }
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Add A Plot
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add A New Plot</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{mb: 2}}>
            Please enter the following information to add a new plot.
          </DialogContentText>
          
          <Divider margin>Plot Information</Divider>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Plot ID</InputLabel>
            <OutlinedInput id="ID" label="Plot ID" onChange={handleFormChange}/>
          </FormControl> 
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Plot Size</InputLabel>
            <OutlinedInput id="dimensions" label="Plot Size" onChange={handleFormChange}/>
          </FormControl> 
          <FormControl sx={{ m: 1, width: '25ch' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Yearly Fee</InputLabel>
            <OutlinedInput id="feeAmount" label="Yearly Fee" startAdornment={<InputAdornment position="start">$</InputAdornment>}  onChange={handleFormChange} />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addPlot}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
