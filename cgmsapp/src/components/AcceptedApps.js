import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import ViewAppBtn from "./ViewAppBtn";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ListSubheader } from "@mui/material";
import moment from "moment";
import apiClient from "../api/apiClient";
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

export default function PendingApps() {
  const [applicant, setApplicant] = useState([]);
  const [plots, setPlots] = useState([]);
  const [selected, setSelected] = React.useState([]);
  const [memberSelected, setMemberSelected] = React.useState([]);
  const [plotSizeSelected, setPlotSizeSelected] = React.useState([]);
 
  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "feePaid", headerName: "Fee Paid", width: 130},
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
      field: "AssignPlot",
      headerName: "Assign Plot",
      width: 160,
      renderCell: PlotAppBtn,
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

    apiClient.get("/v1/plots/get/all")
    .then (res => {
      //if memberId = 0 then add the plotId to the array
      const plotId = res.data.filter((row) => row.memberId === 0);
      setPlots(plotId);
    });
  }, []);

  //only render rows that have a feePaid of null
  const rows = applicant.filter((row) => row.status === 'accepted');

  function PlotAppBtn() {
    const [open, setOpen] = React.useState(false);
    const [plot, setPlot] = React.useState('');

    const handleClickOpen = () => {
      setOpen(true);
    }
    const handleClose = () => {
      setOpen(false);
    }
    const handleChange = (event) => {
      setPlot(event.target.value);
    }
    const handleSubmit = () => {
      apiClient.post(`/v1/members/update/isCurrentGardener/${memberSelected}`, null, {params: {isCurrentGardener: true}})
      apiClient.put(`/v1/plots/update/${plot}`, memberSelected)
      //if api call is successful then delete the application
      .then (res => {
        if (res.status === 200) {
          apiClient.delete(`/v1/applications/delete/${selected}`)
          const newRows = applicant.filter((row) => row.applicationId !== selected);
          setApplicant(newRows);
          const newPlots= plots.filter((row) => row.plotId !== plot);
          setPlots(newPlots);
          setOpen(false);
        } else {
          alert("Error assigning plot. Please try again.")
        }
      })}

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>Assign Plot</Button >
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Assign Plot</DialogTitle>
        <DialogContent>
        <DialogContentText>
          Please select a plot ID to assign to this member.
        </DialogContentText>
        <DialogContentText sx={{mt:1, mb: 1}}>
        Applicants preferred plot size: {plotSizeSelected}.
        </DialogContentText>
        <Select
          id="demo-simple-select-helper"
          variant="outlined"
          value={plot}
          onChange={handleChange}
          sx={{ width: 300, height: 40, marginTop: 1, marginBottom: 1 }}
        >
          <ListSubheader>20x20 Plots</ListSubheader>
          {plots.map((plot) => (
            //if plot size is 20x20 then add to the list
            plot.size === '20x20' && <MenuItem value={plot.plotId}>{plot.plotId}</MenuItem>
          ))}
          <ListSubheader>10x10 Plots</ListSubheader>
          {plots.map((plot) => (
            //if plot size is 10x10 then add to the list
            plot.size === '10x10' && <MenuItem value={plot.plotId}>{plot.plotId}</MenuItem>
          ))}
        </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
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

    const handleWaitlist = () => {
      apiClient.put(`/v1/applications/update/status/${selected}`, 'waitlist')
        const newRows = applicant.filter((row) => row.applicationId !== selected);
        setApplicant(newRows);  
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
            <Button onClick={handleWaitlist}>Waitlist</Button>
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
        rows={rows} 
        onCellClick={(cell) => {
          setSelected(cell.row.applicationId);
          setMemberSelected(cell.row.memberId);
          setPlotSizeSelected(cell.row.preferredPlotSize);
        }
        }
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
    </div>
  );
}