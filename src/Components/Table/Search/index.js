import React, { useState } from "react";
import "./index.css";

const SearchTableData = ({
  placeholder,
  name,
  type,
  onChange,
  value,
  width,
  checkEditrows = false,
  editRows = [],
}) => {
  return (
    <div className="form-group">
      <input
        type={type}
        name={name}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        style={{ width: width, background: 'white'}}
        disabled={checkEditrows?editRows.length > 0:false}
      />
    </div>
  );
};

export default SearchTableData;
