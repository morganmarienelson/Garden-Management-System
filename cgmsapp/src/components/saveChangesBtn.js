import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiClient from "../api/apiClient";

export default function SaveChangesAppBtn() {
  const [open, setOpen] = React.useState(false);
  const [applicant, setApplicant] = React.useState([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTest = () => {
      apiClient.get("/v1/applications/get/all")
      .then (res => {
        console.log(res);
        console.log(res.data);
        setApplicant(res.data);
      })
    };

    // for each array item print out the first name
    const applicantList = applicant.map((applicant) => {
      return (
        <div>
          <p>{applicant.firstName}</p>
        </div>
      )});

  
    

  return (
    <div>
      <Button variant="outlined" onClick={handleTest}>
        Save Changes
      </Button>
      {applicantList}

      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
            Are you sure you want to save these changes?
        </DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Save Changes</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
}
