import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { Row } from "antd";

export default function DeleteAppBtn() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
    // const id = applicant.id;
    // setApplicant((current) =>
    //   current.filter((applicant) => {
    //     return applicant.id !== id;
    //   })
    // );
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Reject
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          Are you sure you want to reject this application?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Reject</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
