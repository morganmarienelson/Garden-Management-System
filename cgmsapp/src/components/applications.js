import React, { useState } from "react";
import { Card } from "antd";
import { DataGrid } from "@mui/x-data-grid";
import DeclinedTable from "./backlogApplications";
import OpenAppBtn from "./openAppBtn";
import Applicants from "./ApplicantsState";
import DeleteAppBtn from "./DeleteAppBtn";
import ViewAppBtn from "./ViewAppBtn";
import SaveChangesAppBtn from "./saveChangesBtn";

const columns = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "firstName", headerName: "First name", width: 130 },
  { field: "lastName", headerName: "Last name", width: 130 },
  { field: "isExisting", headerName: " Existing App", width: 130 },
  { field: "st", headerName: "Submission", width: 90, type: "number" },
  {
    field: "plotSize",
    headerName: "PlotSize",
    type: "number",
    width: 90,
  },
  { field: "PID", headerName: "PID", width: 100 },
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

export function DataTable() {
  const [applicant, setAppliant] = useState(Applicants);

  const rows = [
    {
      id: 1,
      lastName: applicant[0].last,
      firstName: applicant[0].first,
      isExisting: applicant[0].isExisting,
      st: applicant[0].submission,
      plotSize: applicant[0].plotSize,
    },
    {
      id: 2,
      lastName: applicant[1].last,
      firstName: applicant[1].first,
      isExisting: applicant[1].isExisting,
      st: applicant[1].submission,
      plotSize: applicant[1].plotSize,
    },
  ];

  return (
    <div>
      <SaveChangesAppBtn />
    <div style={{ height: 400, width: "100%" , marginTop: 30}}>
      <DataGrid
        rows={rows}
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
