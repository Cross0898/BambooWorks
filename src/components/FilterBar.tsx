import React from "react";

import { Box, TextField, MenuItem, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";

interface FilterBarProps {
  search: string;
  setSearch: (value: string) => void;
  status: string;
  setStatus: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  search,
  setSearch,
  status,
  setStatus,
}) => {
  return (
    <Box display="flex" gap={2} mb={2} alignItems="center">
      <TextField
        label="Search Tasks"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Filter by Status"
        select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        variant="outlined"
        size="small"
        fullWidth
      >
        <MenuItem value="All">All</MenuItem>
        <MenuItem value="Pending">Pending</MenuItem>
        <MenuItem value="In Progress">In Progress</MenuItem>
        <MenuItem value="Completed">Completed</MenuItem>
      </TextField>
    </Box>
  );
};

export default FilterBar;
