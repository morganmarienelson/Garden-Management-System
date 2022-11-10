import React, { useEffect, useState } from "react";
import { Card } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import DeclinedTable from "./backlogApplications";
import OpenAppBtn from "./openAppBtn";
import ViewAppBtn from "./ViewAppBtn";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiClient from "../api/apiClient";
import PendingApps from "./pendingApps";
import AcceptedApps from "./AcceptedApps";
import moment from "moment";

export function DataTable() {
  const [applicant, setApplicant] = useState([]);
  const [selected, setSelected] = React.useState([]);
 
  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "feePaid", headerName: "Fee Paid", width: 130},
    { field: "currentMember", headerName: "Existing Application", width: 160 },
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
    },
    {
      field: "accept",
      headerName: "Accept",
      width: 130,
      renderCell: AcceptAppBtn,
    },
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

  //do not render rows that have a feePaid of null
  const rows = applicant.filter((row) => row.feePaid !== null);

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

  function AcceptAppBtn() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    const handleAccept = () => {
      apiClient.delete(`/v1/applications/delete/${selected}`)
      const newRows = applicant.filter((row) => row.applicationId !== selected);
      setApplicant(newRows);
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Accept
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Are you sure you want to accept this applicant?
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAccept}>Delete</Button>
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

export default function Applications() {
  const [activeTabKey, setActiveTabKey] = useState("applications");
  const [showBacklog, setShowBacklog] = useState(false);
  const [showAccepted, setShowAccepted] = useState(false);
  const [showWindow, setShowWindow] = useState(false);
  const [showPending, setShowPending] = useState(false);

  const tabList = [
    {
      key: "Pendingapps",
      tab: "Pending Applications",
    },
    {
      key: "applications",
      tab: "Current Applications",
    },
    {
      key: "accepted",
      tab: "Accepted Applications",
    },
    {
      key: "backlog",
      tab: "Waitlist Applications",
    },
    {
      key: "window",
      tab: "Set Application Window",
    },
  ];
  return (
    <div>
      <div id="content-wrapper">
        <div id="page-label-box" style={{ margin: 10 }}></div>
      </div>
      <Card
        className="card"
        style={{ width: "100%" }}
        clas
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={(key) => {
          function onTabChange(key) {
            setActiveTabKey(key);
          }
          if (key === "backlog") {
            setShowBacklog(true);
            setShowWindow(false);
            setShowPending (false);
            setShowAccepted(false);
          } else if (key === "accepted") {
            setShowBacklog(false);
            setShowWindow(false);
            setShowPending (false);
            setShowAccepted(true);
          } else if (key === "applications") {
            setShowBacklog(false);
            setShowWindow(false);
            setShowPending(false);
            setShowAccepted(false);
          } else if (key === "window") {
            setShowWindow(true);
            setShowBacklog(false);
            setShowPending(false);
            setShowAccepted(false);
          } else if (key === "Pendingapps") {
            setShowPending(true);
            setShowBacklog(false);
            setShowWindow(false);
            setShowAccepted(false);
          } else {
            setShowWindow(false);
            setShowBacklog(false);
            setShowPending(false);
            setShowAccepted(false);
          }

          onTabChange(key);
        }}
      >
        {showBacklog && <DeclinedTable />}
        {showWindow && <OpenAppBtn />}
        {showPending && <PendingApps />}
        {showAccepted && <AcceptedApps />}
        {!showBacklog && !showWindow && !showPending && !showAccepted && <DataTable />}
      </Card>
    </div>
  );
}
