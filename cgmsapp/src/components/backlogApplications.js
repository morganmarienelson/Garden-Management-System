import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ViewAppBtn from "./ViewAppBtn";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiClient from "../api/apiClient";
import moment from "moment";

export default function PendingApps() {
  const [applicant, setApplicant] = useState([]);
  const [selected, setSelected] = React.useState([]);
 
  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
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
      field: "Reopen",
      headerName: "Reopen",
      width: 130,
      renderCell: ReopenAppBtn,
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
  const rows = applicant.filter((row) => row.status === "\"waitlist\"");

  function ReopenAppBtn() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleReopen = () => {
      apiClient.put(`/v1/applications/update/status/${selected}`, 'pending')
        const newRows = applicant.filter((row) => row.applicationId !== selected);
        setApplicant(newRows);
        setOpen(false);
    };

    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Reopen
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Are you sure you want to reopen this application?
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleReopen}>Reopen</Button>
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