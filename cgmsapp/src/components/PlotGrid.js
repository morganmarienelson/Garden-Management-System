import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import apiClient from "../api/apiClient";

export default function PlotGrid() {
  const [plots, setPlots] = useState([]);
  const [gardener, setGardener] = useState([]);
  const [selected, setSelected] = React.useState([]);
 
  const columns = [
    { field: "plotId", headerName: "Plot ID", width: 100 },
    { field: "size", headerName: "Plot Size", width: 130 },
    { field: "feeAmount", headerName: "Yearly Fee", width: 130 },
    { field: "vacant", headerName: "Vacant", width: 130 },
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    {
      field: "edit",
      headerName: "Edit",
      width: 130,
      renderCell: EditAppBtn,
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
    apiClient.get("/v1/plots/get/all")
      .then (res => {
      setPlots(res.data);
  })
  }, []);

  useEffect(() => {
    plots.map((plot) => {
      if (plot.memberId !== 0) {
        apiClient.get(`/v1/members/get-by-member/${plot.memberId}`)
          .then((res) => {
            console.log(res.data);
            setGardener((gardener) => [...gardener, {firstName: res.data.firstName, lastName: res.data.lastName, vacant: "false", memberId: plot.memberId, plotId: plot.plotId, size: plot.size, feeAmount: plot.feeAmount }]);
          })
      } else  if (plot.memberId === 0){
        setGardener((gardener) => [...gardener, {firstName: "-----", lastName: "-----", vacant: "true", memberId: plot.memberId, plotId: plot.plotId, size: plot.size, feeAmount: plot.feeAmount }]);
      }
    })
  }, [plots]);

  const rows = gardener;

  function EditAppBtn() {
    return (
      <div>
        <Button variant="outlined">
          Edit
        </Button>
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
      apiClient.delete(`/v1/plots/delete/${selected}`)
        .then((res) => {
          console.log(res);
          console.log(res.data);
        })
      setOpen(false);
    };

      return (
        <div>
        <Button variant="outlined" onClick={handleClickOpen}>
          Delete
        </Button>
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>
            Are you sure you want to delete this plot?
          </DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
    
  return (
    <div>
    <div style={{ height: 400, width: "100%" , marginTop: 30}}>
      <DataGrid
        getRowId={(row) => row.plotId}
        rows={rows} onCellClick={(e) => setSelected(e.row.plotId)}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
    </div>
    </div>
  );
}