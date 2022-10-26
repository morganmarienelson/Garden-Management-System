import EditPlotsBtn from '../components/EditPlotsBtn';
import DeletePlotsBtn from '../components/DeletePlotsBtn';

const PlotDataColumns = [
    { field: 'id', headerName: 'ID', width: 100, editable: false},
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
      width: 100,
      editable: true,
    },
    {
      field: 'owner firstName',
      headerName: 'First Name',
      width: 100,
      editable: true,
    },
    {
      field: 'owner lastName',
      headerName: 'Last Name',
      width: 100,
      editable: true,
    },
    {
      field: 'owner email',
      headerName: 'Email',
      width: 100,
      editable: true,
    },
    {
      field: 'owner phone',
      headerName: 'Phone',
      width: 100,
      editable: true,
    },
    {
      field: 'other',
      headerName: 'Other Notes',
      width: 400,
      editable: false,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: EditPlotsBtn,
    },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: DeletePlotsBtn,
    }
  ];

export default PlotDataColumns;