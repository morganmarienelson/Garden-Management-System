import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Applicants from "./ApplicantsState";
import {GridTestData} from "../data/GridTestData";

export default function BasicSelect() {
  const [plot, setPlot] = React.useState("");

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
        {GridTestData.filter(plot => plot.vacantString.includes("true")).map(filteredPlots => (
              <MenuItem value={filteredPlots.id}>"
                  {filteredPlots.id}
              </MenuItem>
            ))}
      </Select>
    </FormControl>
  );
}

