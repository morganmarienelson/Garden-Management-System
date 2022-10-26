import EditPlotsBtn from '../components/EditPlotsBtn';
import DeletePlotsBtn from '../components/DeletePlotsBtn';

const PlotDataColumns = [
    { field: 'id', headerName: 'ID', width: 50, editable: false},
    {
      field: 'dimensions',
      headerName: 'Dimensions',
      width: 100,
      editable: false,
    },
    {
      field: 'feeAmount',
      headerName: 'Yearly Fee',
      width: 100,
      editable: true,
    },
    {
      field: 'vacant',
      headerName: 'Vacant',
      width: 80,
      editable: true,
    },
    {
      field: 'ownerfirstName',
      headerName: 'First Name',
      width: 100,
      editable: true,
    },
    {
      field: 'ownerlastName',
      headerName: 'Last Name',
      width: 100,
      editable: true,
    },
    {
      field: 'other',
      headerName: 'Other Notes',
      width: 250,
      editable: false,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 130,
      renderCell: EditPlotsBtn,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 130,
      renderCell: DeletePlotsBtn,
    }
  ];

export default PlotDataColumns;