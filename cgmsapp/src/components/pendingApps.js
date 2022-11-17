import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ViewAppBtn from "./ViewAppBtn";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiClient from "../api/apiClient";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { OutlinedInput } from "@mui/material";
import moment from "moment";

export default function PendingApps() {
  const [applicant, setApplicant] = useState([]);
  const [selected, setSelected] = React.useState([]);
 
  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "currentGardener", headerName: "Existing Application", width: 160 },
    { field: "submitDate", headerName: "Submission Date", width: 140},
    { field: "submitTime", headerName: "Submission Time", width: 140},
    {
      field: "preferredPlotSize",
      headerName: "Plot Size",
      width: 120,
    },
    {
      field: "view",
      headerName: "View",
      width: 130,
      renderCell: ViewAppBtn,
    },
    {
      field: "checkRecieved",
      headerName: "Check Recieved",
      width: 190,
      renderCell: PaymentRecievedAppBtn,
    },
    {
      field: "waitlist",
      headerName: "Waitlist",
      width: 130,
      renderCell: WaitlistAppBtn,
    },
    {
      field: "delete",
      headerName: "Delete",
      width: 130,
      renderCell: DeleteAppBtn,
    }
  ];

  //get all applications and set state
  useEffect(() => {
    apiClient.get("/v1/applications/get/all")
      .then (res => {
        res.data.forEach((row) => {
          row.submitDate = new Date(row.submitDate).toLocaleDateString();
          row.submitTime = moment(row.submitTime).format("h:mm a");
  
        });
      setApplicant(res.data);
    })
  }, []);

  //only render rows that have a feePaid of null
  const rows = applicant.filter((row) => row.feePaid === 0);

  function PaymentRecievedAppBtn () {
    const [open, setOpen] = React.useState(false);
    const [amount, setAmount] = React.useState(null);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleAccept = () => {
      apiClient.put(`/v1/applications/update/feePaid/${selected}`, `${amount}`)
        const newRows = applicant.filter((row) => row.applicationId !== selected);
        setApplicant(newRows);  
        setOpen(false);
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Check Recieved
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            What is the amount recieved?
          </DialogTitle>
          <DialogContent>
          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-amount">Amount Recieved</InputLabel>
            <OutlinedInput id="amount" label="Amount Recieved" onChange={(event) => setAmount(event.target.value)} />
          </FormControl> 
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAccept}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function WaitlistAppBtn() {
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
          Waitlist
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Are you sure you want to put this application on waitlist?
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleClose}>Waitlist</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  function DeleteAppBtn() {
      const [open, setOpen] = React.useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleDelete = () => {
        apiClient.delete(`/v1/applications/delete/${selected}`)
        const newRows = applicant.filter((row) => row.applicationId !== selected);
        setApplicant(newRows);
        setOpen(false);
      };
    
      return (
        <div>
          <Button variant="outlined" onClick={handleClickOpen}>
            Delete
          </Button>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>
              Are you sure you want to delete this applicant?
            </DialogTitle>
            <DialogContent></DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleDelete}>Delete</Button>
            </DialogActions>
          </Dialog>
        </div>
      );
    };
    

  return (
    <div>
    <div style={{ height: 400, width: "100%" , marginTop: 30}}>
      <DataGrid
        getRowId={(row) => row.applicationId}
        rows={rows} onCellClick={(e) => setSelected(e.row.applicationId)}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
    </div>
  );
}