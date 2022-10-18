import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { Checkbox, FormControlLabel, FormHelperText, OutlinedInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

export default function AddPlotsBtn() {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
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
            <OutlinedInput id="outlined-adornment-amount" label="Plot ID"  />   
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Plot Size</InputLabel>
            <OutlinedInput id="outlined-adornment-amount" label="Plot Size"  />
          </FormControl> 
          <FormControl sx={{ m: 1, width: '25ch' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Yearly Fee</InputLabel>
            <OutlinedInput id="outlined-basic" label="Yearly Fee" startAdornment={<InputAdornment position="start">$</InputAdornment>} />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="checkbox">
            <FormControlLabel control = {<Checkbox checked={checked} onChange={handleChange}/>} label = "Vacant Lot"></FormControlLabel>
          </FormControl>
         
          <Divider>Owner Information</Divider>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">First Name</InputLabel>
            <OutlinedInput disabled = {checked === true} id="outlined-adornment-amount" label="Owner First Name"  />
            <FormHelperText>{checked === true ? "Vacant Lot" : ""}</FormHelperText>
          </FormControl>
          <FormControl variant="outlined" sx={{ m: 1, width: '25ch' }} >
            <InputLabel htmlFor="outlined-adornment-amount">Last Name</InputLabel>
            <OutlinedInput disabled = {checked === true} id="outlined-adornment-amount" label="Owner Last Name"  />
            <FormHelperText>{checked === true ? "Vacant Lot" : ""}</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Email</InputLabel>
            <OutlinedInput disabled = {checked === true} id="outlined-adornment-amount" label="Owner Email"  />
            <FormHelperText>{checked === true ? "Vacant Lot" : ""}</FormHelperText>
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Phone Number</InputLabel>
            <OutlinedInput disabled = {checked === true} id="outlined-adornment-amount" label="Owner Phone Number"  />
            <FormHelperText>{checked === true ? "Vacant Lot" : ""}</FormHelperText>
          </FormControl>
          <Divider>Additional Information</Divider>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Additional Details</InputLabel>
            <OutlinedInput id="outlined-adornment-amount" label="Additional Details"  />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


