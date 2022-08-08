import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CommonTable from "./commonTable/indexCC";
import TableToolbar from "./Toolbar/index";
import DeleteIcon from '@mui/icons-material/Delete';
import Button from "@mui/material/Button";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}
console.log("cost",CommonTable)
export default function EnhancedTable({
  tableData,
  handleSearch,
  searchText,
  handleEdit,
  seteditRows,
  editRows,
  setUpdateRow,
  headCells,
  setTabledata,
  pageName,
}) {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("");
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(30);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    let stageData = [...tableData];
    if (event.target.checked) {
      const newSelecteds = stageData?.map((value) => {
        return value['UNIT COST']?value['LOCATION']:value['ITEM'];
      });
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name,mode= 'delete') => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    // console.log(editRows);
    // console.log(newSelected);
    if(mode == 'delete'){
    setSelected(newSelected);
    }else{
      seteditRows(newSelected);     
    }
  };

  const handleDelete = () => {
    const id = selected;
    const data = [...tableData];
    console.log("data",data);
    const updatedTable = data.filter((val) => {
      return !id.includes(val.SR_NO);
    });
    setTabledata(updatedTable);
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;
  
  return (
    <>
    {(selected.length > 0 && pageName == "stage") && 
    <Button variant="contained" onClick={handleDelete} startIcon={<DeleteIcon />} sx={{position:"fixed",top:"75px", zIndex:"99",right:"215px"}} >
    Delete</Button>
    }
     <Box sx={{ width: "100%", marginTop: "8px" }}>
        <CommonTable
          handleClick={handleClick}
          handleSelectAllClick={handleSelectAllClick}
          handleRequestSort={handleRequestSort}
          handleChangePage={handleChangePage}
          isSelected={isSelected}
          handleSearch={handleSearch}
          searchText={searchText}
          handleEdit={handleEdit}
          rows={tableData}
          selected={selected}
          setSelected ={setSelected}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          order={order}
          orderBy={orderBy}
          stableSort={stableSort}
          getComparator={getComparator}
          page={page}
          headCells={headCells}
          rowsPerPage={rowsPerPage}
          emptyRows={emptyRows}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          pageName={pageName}
        />
      </Box>
    </>
  );
}
