import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Checkbox, FormControlLabel, FormHelperText, OutlinedInput } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Divider from '@mui/material/Divider';

export default function UpdateWorkday(props) {
  const [open, setOpen] = React.useState(false);
  const [rowData, setRowData] = React.useState(props.loadRowData(props.id))
  const [checked, setChecked] = React.useState(rowData.vacant);

  const handleClickOpen = () => {
    props.loadRowData(props.id)
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setChecked(event.target.checked);
    handleFormChange(event, true)
  };

  const handleFormChange = (event, isCheckbox=false) => {
    const label = event.target.id;
    let value = isCheckbox ? event.target.checked : event.target.value
    setRowData({...rowData, [label]: value})
  }

  const handleEditConfirm = () => {
    console.log("this fired.")
    props.editFunction(rowData);
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Update
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Update Workday</DialogTitle>
        <DialogContent>
          <Divider margin>Workday</Divider>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Workday 1</InputLabel>
            <OutlinedInput id="wkd1" defaultValue={rowData.wkd1} label="Date" onChange={handleFormChange}/>
          </FormControl> 
          <FormControl sx={{ m: 1, width: '25ch' }}>
            <InputLabel htmlFor="outlined-adornment-amount">Workday 2</InputLabel>
            <OutlinedInput id="wkd2" defaultValue={rowData.wkd2} label="Date"  onChange={handleFormChange} />
          </FormControl>
          <Divider>Additional Information</Divider>
          <FormControl sx={{ m: 1, width: '60ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Additional Details</InputLabel>
            <OutlinedInput id="notes" defaultValue={rowData.notes} onChange={handleFormChange} label="Additional Details"  />
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