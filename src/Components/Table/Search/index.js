import React, { useState } from "react";
import "./index.css";
import IconButton from '@mui/material/IconButton';
import CopyAllIcon from '@mui/icons-material/CopyAll';
import LockIcon from '@mui/icons-material/Lock';
import Tooltip from '@mui/material/Tooltip';

const SearchTableData = ({
  placeholder,
  name,
  type,
  onChange,
  value,
  width,
  onClick,
  freeze,
  onCopy,
  colEnabled,
  pageName,
}) => {

  return (
    <div className="form-group">
      <div style={{display:'flex'}}>
      <input
        type={type}
        name={name}
        value={value}
        className="form-control"
        placeholder={placeholder}
        onChange={onChange}
        style={{ width: width, background: 'white'}}
        //disabled={(value !== '' && freeze === true)?false:(value === '' && freeze === true)?true:false} 
        disabled={colEnabled && colEnabled.hasOwnProperty(name)?false:(value === '' && freeze === false)?false:true}
      />
      {(value !== '' && freeze === false && pageName === "config") &&
        <Tooltip title="Lock">
        <IconButton onClick={() => onClick(name)}>
        <LockIcon fontSize="small" sx={{height:'0.6em',width:'0.6em'}} />
        </IconButton> 
        </Tooltip>
      }
      {(value !== '' && freeze === true && pageName === "config") &&
        <Tooltip title="Copy Down">
        <IconButton onClick={() => onCopy(name, value)}>
        <CopyAllIcon fontSize="small" sx={{height:'0.6em',width:'0.6em'}} />
        </IconButton> 
        </Tooltip>
      }
      </div>
    </div>
  );
};

export default SearchTableData;
