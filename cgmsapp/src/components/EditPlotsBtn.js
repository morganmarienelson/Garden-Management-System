import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputAdornment from '@mui/material/InputAdornment';
import { Checkbox, FormControlLabel, FormHelperText, OutlinedInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';

export default function EditPlotsBtn(props) {
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

  const handleEditConfirm = (id) => {
    props.editFunction(props.index.value);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Plot</DialogTitle>
        <DialogContent>
          <Divider margin>Plot Information</Divider>
          {/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Plot ID</InputLabel>
            <OutlinedInput id="id" label="Plot ID" onChange={props.handleFormChange}/>   
          </FormControl> */}
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Plot Size</InputLabel>
            <OutlinedInput id="dimensions" label="Plot Size" onChange={props.handleFormChange}/>
          </FormControl> 
          <FormControl sx={{ m: 1, width: '25ch' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Yearly Fee</InputLabel>
            <OutlinedInput id="feeAmount" label="Yearly Fee" startAdornment={<InputAdornment position="start">$</InputAdornment>}  onChange={props.handleFormChange} />
          </FormControl>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="checkbox" >
            <FormControlLabel control = {<Checkbox checked={checked} id="vacant" onChange={handleChange}/>} label = "Vacant Lot"></FormControlLabel>
          </FormControl>
          <Divider>Additional Information</Divider>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Additional Details</InputLabel>
            <OutlinedInput id="other" onChange={props.handleFormChange} label="Additional Details"  />
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleEditConfirm}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}