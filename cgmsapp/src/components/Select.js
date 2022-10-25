import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Applicants from "./ApplicantsState";

export default function BasicSelect() {
  const [plot, setPlot] = React.useState("");
  const [Applicant, setApplicant] = useState(Applicants);

  const handleChange = (event) => {
    setPlot(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 100 }} size="small">
      <InputLabel id="demo-select-small">plot</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={plot}
        label="plot"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value={10}>1</MenuItem>
        <MenuItem value={20}>2</MenuItem>
        <MenuItem value={30}>3</MenuItem>
      </Select>
    </FormControl>
  );
}
