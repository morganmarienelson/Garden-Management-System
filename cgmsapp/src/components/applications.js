import React, { useState } from "react";
import { Card} from "antd";
import { DataGrid } from '@mui/x-data-grid';
import DeclinedTable from "./backlogApplications";
import OpenAppBtn from "./openAppBtn";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export function DataTable() {
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />
    </div>
  );
}

export default function Applications(){
  const [activeTabKey, setActiveTabKey] = useState('applications');
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
]
return (
  <div>
            <div id="content-wrapper" >
                <div id="page-label-box" style={{margin: 10}}>
                </div>
            </div>
            <Card
                className="card"
                style={{ width: "100%" }}
                clas
                tabList={tabList}
                activeTabKey={activeTabKey}
                onTabChange={(key) => {
                    function onTabChange(key) {
                        setActiveTabKey(key)
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
                }}>
                {showBacklog && <DeclinedTable />}
                {showWindow && <OpenAppBtn />}
                {!showBacklog && !showWindow && <DataTable />}
              
            </Card>
        </div>
    );
        }
  
