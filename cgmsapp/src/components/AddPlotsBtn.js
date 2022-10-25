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

export default function AddPlotsBtn(props) {
  const [open, setOpen] = React.useState(false);
  const [checked, setChecked] = React.useState(false);
  // const [formState, setFormState] = React.useState(false);
  
  // const handleFormChange = (event, isCheckbox=false) => {
  //   const label = event.target.id;
  //   let value = isCheckbox ? event.target.checked : event.target.value
  //   setFormState({...formState, [label]: value})
  //   console.log(`${label}: ${value}`)
  //   console.log(formState)
  // }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    props.handleFormChange(event, true)
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
          <Button onClick={props.handleSubmitForm}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}


