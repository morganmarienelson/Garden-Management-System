import React, { useState } from "react";
import { Card } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import DeclinedTable from "./backlogApplications";
import OpenAppBtn from "./openAppBtn";
import Applicants from "./ApplicantsState";
import ViewAppBtn from "./ViewAppBtn";
import SaveChangesAppBtn from "./saveChangesBtn";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import SelectPID from "./SelectPID";

export function DataTable() {
  const [applicant, setApplicant] = useState(Applicants);
  const [selected, setSelected] = React.useState([]);
  const isSelected = (firstName) => selected.indexOf(firstName) !== -1;
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "isExisting", headerName: " Existing App", width: 130 },
    { field: "submission", headerName: "Submission", width: 90, type: "number" },
    {
      field: "plotSize",
      headerName: "PlotSize",
      type: "number",
      width: 90,
    },
    {
    field: "PID",
    headerName: "PID",
    width: 150,
    renderCell: SelectPID,
  },

    {
      field: "view",
      headerName: "View",
      width: 130,
      renderCell: ViewAppBtn,
    },
    {
      field: "reject",
      headerName: "Reject",
      width: 130,
      renderCell: DeleteAppBtn,
    },
  ];
  //delete row function
  const handleDelete = (id) => {
    const newRows = applicant.filter((row) => row.id !== id);
    setApplicant(newRows);
  };

  function DeleteAppBtn() {
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    const handleReject = () => {
      const id = selected;
      handleDelete(id);
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
            <Button onClick={handleReject}>Reject</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

  return (
    <div>
      <SaveChangesAppBtn />
    <div style={{ height: 400, width: "100%" , marginTop: 30}}>
      <DataGrid
        rows={applicant} onCellClick={(e) => setSelected(e.row.id)}
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
  const [showWindow, setShowWindow] = useState(false);

  const tabList = [
    {
      key: "applications",
      tab: "New Applications",
    },
    {
      key: "backlog",
      tab: "Declined Applications",
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
          } else if (key === "applications") {
            setShowBacklog(false);
            setShowWindow(false);
          } else if (key === "window") {
            setShowWindow(true);
            setShowBacklog(false);
          } else {
            setShowWindow(false);
            setShowBacklog(false);
          }

          onTabChange(key);
        }}
      >
        {showBacklog && <DeclinedTable />}
        {showWindow && <OpenAppBtn />}
        {!showBacklog && !showWindow && <DataTable />}
      </Card>
    </div>
  );
}
