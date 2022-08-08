import React, { useEffect, useState } from "react";
import Header from "../Header";
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
},
  input: {
    '& .MuiInput-root': {
    fontSize: '12px !important',
      '& .MuiInput-input':{
        padding:'4px 0 1px',
      }
    },
  },
  '& .Mui-disabled': {
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

  // const onBlur = (event, value , row) => {
  //   console.log("test", event.target.value, value, row);
  //   row[event.target.name] = event.target.value;
    
  //   if(event.target.name == 'QTY') {
  //     row['TOTAL_COST'] = parseInt(event.target.value) * parseInt(row['UNIT_COST']);
  //   }
    
  //   var finalData = updateData;
  //   if(updateData.length === 0) {
  //     finalData.push(row);
  //   }
  //   else {
  //     var t = finalData.findIndex(x => x.TRAN_SEQ_NO === row['TRAN_SEQ_NO']);
  //     if(t === -1) {
  //       finalData.push(row);
  //     }
  //     else {
  //       finalData[t] = row;
  //     }
  //   }
  //   setupdateData(finalData);
  //   setUpdateRow(finalData);
  //   console.log("testafter", row, updateData);
  //     sessionStorage.setItem('updateColume',JSON.stringify(finalData));
  //   // return;
  //   // let temp = JSON.stringify(updateData);
  //   // temp = JSON.parse(temp);
  //   // console.log(temp);
  //   //   //let oldrow = rows.filter((item) => item?.TRAN_SEQ_NO.includes(editRows) );
  //   // if(temp.findIndex(x => x.TRAN_SEQ_NO === row['TRAN_SEQ_NO']) == -1 ){
  //   // temp[row?.TRAN_SEQ_NO] = row;
  //   // temp[row?.TRAN_SEQ_NO][event.target.name] = event.target.value; 
  //   // if(event.target.name == 'QTY'){
  //   //   temp[row?.TRAN_SEQ_NO]['TOTAL_COST'] = event.target.value * row['UNIT_COST']; 
  //   // }
  //   // //let updaterow = Object.values(temp);
    
  //   // console.log(temp);
  //   // setupdateData(temp)
  //   // }
  // }



  // useEffect(() => {
  //   console.log("testafter1", updateData);
    
  //   setUpdateRow(updateData);
    
  // },[updateData])


  const onBlur = (event, value , row) => {
    let temp = {...updateData};
    console.log(temp);
    temp[row?.TRAN_SEQ_NO] = row;
    temp[row?.TRAN_SEQ_NO][event.target.name] = event.target.value; 
    if(event.target.name == 'QTY') {
           temp[row?.TRAN_SEQ_NO]['TOTAL_COST'] = parseInt(event.target.value) * parseInt(row['UNIT_COST']); 
         }
      if(value){
        temp[row?.TRAN_SEQ_NO]['TRN_TYPE'] = value['TRN_TYPE']; 
      }   
      console.log(temp);
    setupdateData(temp)
  }

  useEffect(() => {
    if(setUpdateRow){
    setUpdateRow(updateData);
    }
  },[updateData])

  return (
    <>
      <Paper sx={{ maxWidth: "fit-content", maxHeight: "fit-content", mb: 2 }}>
      {(pageName != "stage") &&
        <TableToolbar selected={selected} handledelete={handleDelete} edithandle={handleEdit} seteditRows={seteditRows} setUpdateRow={setUpdateRow} setSelected={setSelected} editRows={editRows} setupdateData={setupdateData} setTabledata={setTabledata} allData={allData}/>
        } 
        <TableContainer sx={{ overflowX: "scroll", overflowY: "scroll",height: "fit-content", maxHeight: "70vh" }}>
          <Table
            sx={{ minWidth: 750, maxWidth: "fit-content" }}
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
                  const isItemSelected = isSelected(row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO);
                  const labelId = `enhanced-table-checkbox-${index}`;
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          onClick={(event) => handleClick(event, row?.SR_NO?row?.SR_NO:row?.TRAN_SEQ_NO)}
                          checked={isItemSelected}
                          inputProps={{
                            "aria-labelledby": labelId,
                          }}
                          style={{
                            color: "#635b5bb8",
                          }}
                         // disabled={editRows && editRows.length > 0}
                        />
                      </TableCell>
                      { editRows?.includes(row?.TRAN_SEQ_NO) ? <>
                        {Object.entries(row).map(([key, value]) => {
                          
                            let editable = false;
                            if(key == "ITEM"){
                                editable = row["ERR_MSG"] === "ITEM IS NULL" || row["ERR_MSG"] == "INVALID ITEM";
                            }if(key == "LOCATION"){
                              editable = row["ERR_MSG"] == "LOCATION is null" || row["ERR_MSG"] == "Invalid Location" || row['ERR_MSG'] === "invalid location currency combination";
                            }if(key == "TRN_NAME"){
                              editable = row["ERR_MSG"] === "invalid trn_type" || row["ERR_MSG"] === "TRN_TYPE AREF COMBINATION invalid";
                            }if(key == "QTY"){
                              editable = row["ERR_MSG"] === "QTY is null";
                            }if(key == "CURRENCY"){
                              editable = row["ERR_MSG"] === "invalid currency" || row['ERR_MSG'] === "invalid location currency combination";
                            }if(key == 'TRAN_DATE'){
                              editable = row['ERR_MSG'] === "trn_date cannot be in future";
                            }



                            return <TableCell padding="none" align="left" key={key} className={rowClasses.tabCell}>
                              {(key == 'TRN_NAME') ? (
                                    <Autocomplete
                                    disabled={!editable}
                                    disablePortal
                                    size="small"
                                    id="combo-box-trn-type"
                                    onChange={ (event, value) => onBlur(event, value, row)}
                                    options={trnType}
                                    getOptionLabel={(option) => option.TRN_NAME}
                                    sx={{ width: 200 }}
                                    renderInput={(params) => <TextField {...params} variant="standard" />}
                                  />
                              ) : (
                                <TextField 
                            disabled={!editable}
                            size="small"
                            variant="standard"
                            className={rowClasses.input}
                            defaultValue={value} name={key} onChange={ (event, value) => onBlur(event,value,row)} />
                              )
                              
                              }
                            
                           </TableCell>
                              }
                      )}
                      </> :           
                      <>
                      {Object.entries(row).map(([key, value])=> 
                          <TableCell align="left" key={key} className={rowClasses.tabCell} sx={((key == 'SR_NO')?'display:none':'')}>
                              {value || "" }
                          </TableCell>
                      )}
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
