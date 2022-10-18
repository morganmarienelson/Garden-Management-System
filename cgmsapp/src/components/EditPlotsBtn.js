import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function EditPlotsBtn() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
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
          <DialogContentText>
          </DialogContentText>
          <div>
            <TextField margin="dense" id="outlined-basic" label="Plot ID" variant="outlined" />
          </div>
          <div>
            <TextField margin="dense" id="outlined-basic" label="Dimensions" variant="outlined" />
          </div>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Additional Details"
            type="email"
            variant="outlined"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Create</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}