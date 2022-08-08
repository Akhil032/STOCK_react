import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import { ExcelRenderer } from "react-excel-renderer";
import Table from "../../Components/Table/index";
import TextField from "@mui/material/TextField";
import InputAdornment from '@mui/material/InputAdornment';
import { isHeadersEqual, stageHeaders } from "../../Constants/headers";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import { formattedExcelData } from "../../Utils/format";
import { resetStageProcessing, getStageProcessingRequest } from "../../Redux/Action/staginProcessing";
import CircularProgress from "@mui/material/CircularProgress";
import UploadFileIcon from  '@mui/icons-material/Upload';
import SendIcon from '@mui/icons-material/Send';
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import {headCells} from './tableHead';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import "./index.css";


const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles({
  stagemaindiv: {
    position: "relative",
    width: "calc(95vw - 64px)",
    '& table':{
        '& tr':{
              '& td:nth-child(14)':{
                    display: 'none'
              },
              '& td:nth-child(15)':{
                display: 'none'
          }
        }
    }
  },
  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "1400px",
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "50px",
    textAlign: "start",
    gap: 20,
  },
  GobackDiv: {
    cursor: "pointer",
  },
  resetBtn: {
    marginTop: "40px !important",
  }
});
const StageProcessing = () => {
  const [tabledata, setTabledata] = useState("");
  const [filterData, setFilterData] = useState("");
  const [isValidExcel, setIsValidExcel] = useState(true);
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [searched, setSearched] = useState();
  const [errmsg, setErrormsg] = useState("");
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const StageProceesClasses = useStyles();
  const StagingProcessing = useSelector(
    (state) => state.StagingProcessingReducers
  );

  const dispatch = useDispatch();
    // Column Filter of table
  useEffect(() => {
    if (inputValue) {
      console.log(inputValue);
      // const filteredTable = tabledata.filter((val) => Object.keys().map((item) => {
      //     if(val[item] !== undefined && inputValue[item] !== undefined){
      //         return val[item]?.toString().toLowerCase().includes(inputValue[item]?.toString().toLowerCase())   
      //      }
      //     })
      // );
      const filteredTable = tabledata.filter(props => 
        Object
          .entries(inputValue)
          .every(([key,val]) => 
            !val.length ||
            props[key]?.toString().toLowerCase().includes(val?.toString().toLowerCase()))
      )

      setTabledata(filteredTable);
      setFilterData(filteredTable);
    }
  }, [inputValue]);

  // Error handle by input from web-service
  useEffect(() => {
    if (StagingProcessing.isError) {
      setIsError(true)
    }else if(StagingProcessing.isSuccess){
      setIsSuccess(true)
      setTabledata("");
     } else{
      setIsError(false)
      setIsSuccess(false)
    }
  }, [StagingProcessing])

  // Handle input of Column filter
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
    }));
      setTabledata(allData);
    } else {
      setInputValue(prevState => ({
        ...prevState,
        [name]: value
    }));
    }
  };
  // Get Current User name
  const getcurrentUser = () => {
    if(localStorage.getItem("userData")){
      return JSON.parse(localStorage.getItem("userData"))?.username;
    } else{
       return "default";
    }
  }
  // Handle Excel Template on Upload
  const handleCapture = ({ target }) => {
    dispatch(resetStageProcessing());
    setIsValidExcel(true);
    let fileObj = target.files[0];
      
    ExcelRenderer(fileObj, (err, resp) => {
      if (isHeadersEqual(resp.rows[0], stageHeaders)) {
        let count = 1;
        const formatData = formattedExcelData(resp.rows);
        formatData.map(item => {
            item['SR_NO']= count;
            item['UNIT_COST'] = item.UNIT_COST?.toFixed(4);
            item['UNIT_RETAIL'] = item.UNIT_RETAIL?.toFixed(4);
            count++;
        })
        setTabledata(formatData);
        setAllData(formatData);
      } else {
        setIsValidExcel(false);
      }
    });
  };

  const handleClose = () => {
    setIsValidExcel(true);
    setOpen(false);
  };

  // Validate Field of Excel template 
  const SubmitList = () => {
    
    const validate = tabledata.map((item)=> {
      if(item['LOC_TYPE'] !== 'S' && item['LOC_TYPE'] !== 'W' ){
        setIsError(true);
        setErrormsg("LOC_TYPE data is not correct.Valid Values are : S = Store , W = Warehouse");
        return false;
      }
       if(item['LOC']?.length > 10){
        setIsError(true);
        setErrormsg("LOC data length should numeriac and not more then 10 digit");
        return false;
      } if(item['QTY']?.toString().length > 12){
        setIsError(true);
        setErrormsg("QTY data length should not more then 12");
        return false;
      } if(item['UNIT_COST']?.length > 20){
        setIsError(true);
        setErrormsg("UNIT_COST data length should not more then 20");
        return false;
      } if(item['UNIT_RETAIL']?.length > 20){
        setIsError(true);
        setErrormsg("UNIT_RETAIL data length should not more then 20");
        return false;
      } if(item['REF_NO1']?.length > 10){
        setIsError(true);
        setErrormsg("REF_NO1 data length should not more then 10");
        return false;
      } if(item['REF_NO2']?.toString().length > 10){
        setIsError(true);
        setErrormsg("REF_NO2 data length should not more then 10");
        return false;
      } if(item['REF_NO3']?.length > 10){
        setIsError(true);
        setErrormsg("REF_NO3 data length should not more then 10");
        return false;
      } if(item['REF_NO4']?.length > 10){
        setIsError(true);
        setErrormsg("REF_NO4 data length should not more then 10");
        return false;
      }
    })
    if(!validate?.includes(false)){
      setOpen(true);
    }
  };
  // Final Submit data handler 
  const finalSubmit = () => {
    tabledata.map( item => {
      delete item?.SR_NO;
      item['CREATE_DATETIME'] = new Date().toLocaleString();
      item['CREATE_ID'] = getcurrentUser();
            
    });
    dispatch(getStageProcessingRequest(JSON.stringify(tabledata)));
    setOpen(false)
  }

  const handleCancel = () => {
    setOpen(false)
  }
  const handleMsgClose = () => {
    setIsError(false);
    setIsSuccess(false);
    setTabledata(allData);
  }

  const tableSearch = (event) => {
      setSearched(event.target.value);
  }

  // Global Search filter
  useEffect(() => {
    if (searched) {
      const reqData = tabledata.map((data, index) => {
        if (Object.values(data)?.toString()?.toLowerCase().indexOf(searched?.toString()?.toLowerCase()) >= 0)
          return tabledata[index];
      });
      const filterData = reqData.filter(data => {
        return data !== undefined;
      })
      setTabledata(filterData);
    } else setTabledata(allData);
  }, [searched]);

  const resetFilter = () => {
    setSearched("");
    setInputValue("");
    setTabledata(allData);
  }

  return (
    <Box className={StageProceesClasses.stagemaindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={4}>
          <Box className={StageProceesClasses.boxDiv}>
            <div className={StageProceesClasses.uploaddiv}>
              <h4>Stage Processing Data</h4>
              <Button variant="contained" component="label" startIcon={<UploadFileIcon />}>
                Upload File
                <input onChange={handleCapture} type="file" hidden />
              </Button>
            </div>
          </Box>
        </Grid>
        {tabledata &&
        <Grid item xs={4} style={{ marginTop: '70px', textAlign: 'center' }}>
          <Box>
          <TextField
              size="small"
              margin="none"
              name="searchtext"
              sx={{
                background:'#fff', 
              }}
              onChange={(e) => tableSearch(e)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Grid>
          }
        {
          tabledata.length > 0 && <Grid item xs={4} style={{ marginTop: '60px' }}>
            <Box
              m={1}
              display="flex"
              justifyContent="flex-end"
              alignItems="flex-end"
            >
              <Button variant="contained" onClick={SubmitList} startIcon={<SendIcon />}>
                {StagingProcessing?.isLoading ? (
                  <CircularProgress color="inherit" />
                ) : (
                  "Submit"
                )}
              </Button>
            </Box>
          </Grid>
        }
      </Grid>
      {tabledata && (
         <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
           <Grid item xs={11} style={{ paddingLeft:"40px"}}>
        <Table
          tableData={tabledata}
          setTabledata={setTabledata}
          handleSearch={handleChange}
          searchText={inputValue}
          headCells={headCells}
          pageName = "stage"
        />
        </Grid>
        <Grid item xs={1} style={{ paddingLeft:"0px"}}>
        <IconButton className={StageProceesClasses.resetBtn} onClick={resetFilter}>
        <RestartAltIcon />
</IconButton>
        </Grid>
        </Grid>
      )}
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isSuccess} autoHideDuration={6000} onClose={handleMsgClose}>
          <Alert
            onClose={handleMsgClose}
            severity={StagingProcessing?.isSuccess ? "success": " "}
            sx={{ width: "100%" }}
          >
            {StagingProcessing?.messgae}
          </Alert>
        </Snackbar>
      </Stack>

          <div>
        <Dialog
          fullScreen={fullScreen}
          open={isError}
          onClose={handleMsgClose}
          aria-labelledby="responsive-dialog-title"
          className={StageProceesClasses.popUp}
          PaperProps={{
            style: {
              backgroundColor: '#D3D3D3',
              borderRadius: '10px',
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Error Message"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {errmsg?errmsg:StagingProcessing?.messgae}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleMsgClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      {/* <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={!isValidExcel}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
            PLEASE UPLOAD A VALID FILE !
          </Alert>
        </Snackbar>
      </Stack> */}
  
    <div>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className={StageProceesClasses.popUp}
      PaperProps={{
        style: {
          backgroundColor: '#D3D3D3',
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        {"Are you want to submit data?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please click to continue for submit data. 
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={finalSubmit} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  </div>

  <div>
    <Dialog
      fullScreen={fullScreen}
      open={!isValidExcel}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className={StageProceesClasses.popUp}
      PaperProps={{
        style: {
          backgroundColor: '#D3D3D3',
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        {"Template is Invalid"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
           Your excel template is incorrect, Please Upload valid template.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  </div>


    </Box>
  );
};

export default StageProcessing;
