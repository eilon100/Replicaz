import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

type CommunitySelectProps = {
  community: string;
  setCommunity: React.Dispatch<React.SetStateAction<string>>;
};
function CommunitySelect({ community, setCommunity }: CommunitySelectProps) {
  return (
    <FormControl variant="standard" sx={{ mx: 1.5, maxWidth: 120 }}>
      <InputLabel id="demo-simple-select-label">community</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        required
        value={community}
        label="Community"
        onChange={(event) => {
          setCommunity(event.target.value);
        }}
      >
        <MenuItem value={"Shoes"}>Shoes</MenuItem>
        <MenuItem value={"Bags"}>Bags</MenuItem>
        <MenuItem value={"Clothes"}>Clothes</MenuItem>
      </Select>
    </FormControl>
  );
}

export default CommunitySelect;
