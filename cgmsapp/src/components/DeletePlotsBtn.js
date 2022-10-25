import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DeletePlotsBtn(props) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteConfirm = (id) => {
    props.deleteFunction(props.index.value);
    //props.index.value
    // deleteFunction(id);
    setOpen(false);
  }

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Are you sure you want to delete this plot?</DialogTitle>
        <DialogContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDeleteConfirm}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}