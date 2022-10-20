import IconButton from "@mui/material/Button";
import DeleteIcon from "@mui/material/Button";

const DeleteAppBtn = () => {
  return (
    <div>
      <IconButton aria-label="delete">
        <DeleteIcon />
      </IconButton>
    </div>
  );
};

export default DeleteAppBtn;
