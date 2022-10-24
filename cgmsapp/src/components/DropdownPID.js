import * as React from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {GridTestData} from "../data/GridTestData";


export default function DropdownPID() {
    const [PlotID, setPlotID] = React.useState('');

    const handleChange = (event) => {
      setPlotID(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="demo-select-small">Age</InputLabel>
      <Select
        labelId="demo-select-small"
        id="demo-select-small"
        value={PlotID}
        label="PlotID"
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {GridTestData.map((plot) => (
              <MenuItem value={plot.id}>
                  {plot.id}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
    </div>
  );
}