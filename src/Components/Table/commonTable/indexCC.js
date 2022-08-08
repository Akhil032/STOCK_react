import React, { useEffect, useState } from "react";
import Header from "../Header/indexCH";
import Autocomplete from '@mui/material/Autocomplete';
import {Table, TableBody, TableCell, TableContainer, TablePagination, TableRow,Paper, Checkbox, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import TableToolbar from "../Toolbar/index";
import { trnType } from "../../ErrorProcessing/transType";
import "../index.css";

const useStyles = makeStyles({
  tabCell: {
    padding: "6px 4px !important",
    fontSize: "0.7rem !important",
    width: "110px"
},
  input: {
    '& .MuiInput-root': {
    fontSize: '12px !important',
      '& .MuiInput-input':{
        padding:'4px 0 1px',
       
      }
    },
  },
  '& Mui-disabled':{
      opacity: '0.3',
  }
});

const useStylesNew = makeStyles({
  tabCell: {
    padding: "6px 4px !important",
    fontSize: "0.7rem !important",
   // width: "110px"
},
  input: {
    '& .MuiInput-root': {
    fontSize: '12px !important',
    
      '& .MuiInput-input':{
        padding:'4px 0 1px',
        //width: "100px"
      }
    },
  },
  '& Mui-disabled':{
      opacity: '0.3',
  }
});

const CommonTable = ({
  handleClick,
  handleSelectAllClick,
  handleRequestSort,
  handleChangePage,
  isSelected,
  handleDelete,
  handleSearch,
  handleEdit,
  seteditRows,
  setSelected,
  editRows,
  setUpdateRow,
  searchText,
  rows,
  selected,
  order,
  orderBy,
  stableSort,
  getComparator,
  page,
  rowsPerPage,
  emptyRows,
  handleChangeRowsPerPage,
  headCells,
  pageName,
  setTabledata,
  allData,
}) => {


    const [updateData, setupdateData] = useState({});  
    const rowClasses = useStyles();  
    const rowClassesNew = useStylesNew();
  const onBlur = (event, value , row) => {
    let temp = {...updateData};
    temp[row?.ITEM] = row;
    temp[row?.ITEM][event.target.name] = event.target.value;
    //temp[row?.ITEM]["CREATE_ID"]=JSON.parse(localStorage.getItem("userData"))?.username;
 
   console.log("temp",)
    setupdateData(temp)
  }

  useEffect(() => {
    if(setUpdateRow){
       //updateData["CREATE_ID"]=JSON.parse(localStorage.getItem("userData"))?.username;

       console.log("up",updateData)
    setUpdateRow(updateData);
    }
  },[updateData])

  return (
    <>
      <Paper sx={{ maxWidth: "100%", maxHeight: "fit-content", mb: 2 }}>
      {(pageName != "stage") &&
        <TableToolbar selected={selected} handledelete={handleDelete} edithandle={handleEdit} seteditRows={seteditRows} setUpdateRow={setUpdateRow} setSelected={setSelected} editRows={editRows} setupdateData={setupdateData} setTabledata={setTabledata} allData={allData}/>
      } 
        <TableContainer sx={{ overflowX: "scroll", overflowY: "scroll",height: "fit-content", maxHeight: "70vh" }}>
          <Table
            sx={{  maxWidth: "100%" }}
            aria-labelledby="tableTitle"
            size="small"
            
          >
            <Header
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
              handleSearch={handleSearch}
              searchText={searchText}
              headCells={headCells}
              editRows={editRows}
              checkEditrows={true}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row?.ITEM);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  //console.log("check123:",selected)
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?.ITEM}
                      selected={isItemSelected}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event,  row?.ITEM)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          style={{
                            color: "#635b5bb8",
                          }}
                          //disabled={editRows && editRows.length > 0}
                        />
                      </TableCell> */}
                      
                     { (row?.ITEM) ? <>

                        {Object.entries(row).map(([key, value]) => {
                          
                            let editable = false;
                            if(key == "UNIT_COST"){
                                editable = true
                            }
                            
                           // console.log("check123:",row[5])

                            return <TableCell padding="none" align="left" key={key} className={rowClasses.tabCell}>
                              {
                                <TextField 
                            disabled={!editable}
                      
                            size="small"
                            variant="standard"
                            className={rowClasses.input}
                            defaultValue={value} name={key} onChange={ (event, value) => onBlur(event,value,row)} />
                              
                              
                              }
                            
                           </TableCell>
                        

                        // else {
                        //       // var wid=""
                        //       // if(key=="ITEM"){
                        //       //   wid= "100px",
                        //       // }

                        //   return <TableCell padding="none" align="left" key={key} className={rowClassesNew.tabCell}  >
                        //       {
                        //         <TextField 
                        //     disabled={!editable}
                      
                        //     size="small"
                        //     variant="standard"
                        //     className={rowClassesNew.input}
                        //     defaultValue={value} name={key} />//onChange={ (event, value) => onBlur(event,value,row)} />
                              
                              
                        //       }
                            
                        //    </TableCell>
                          
                        // }
                              }
                      )}
                      </> :           
                      <>
{/* 
                      {Object.entries(row).map(([key, value])=> 
                      
                          <TableCell align="left" key={key} className={rowClasses.tabCell} >
                              {value || "" }
                          </TableCell>
                      )} */}
                      </> }
                      
                    </TableRow>
                  );
                })}

              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 33 * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />        
        </Paper>
    </>
  );
};

export default CommonTable;
