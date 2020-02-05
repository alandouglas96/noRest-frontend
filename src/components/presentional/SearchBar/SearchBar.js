import React from "react";
import { TextField } from '@material-ui/core';

import "./style.css";

const SearchBar = ({ handleSearch, searchValue }) => {
  return (
    <div className="search-bar">
      <TextField
        autoComplete='off'
        id="inputSearch"
        label="Search"
        onChange={handleSearch}
        size="small"
        value={searchValue}
        variant="outlined"
      />
      <div style={{ width: '10px' }}></div>
    </div>
  );
};

export default SearchBar;
