import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/index";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { getSystemConfigRequest, postSystemConfigRequest,resetSystemConfig } from "../../Redux/Action/systemConfig";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import { trnType } from "../../Components/ErrorProcessing/transType.js";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle'; 
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles'; 
import Chip from '@mui/material/Chip';
import swal from '@sweetalert/with-react';

//import "./index.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 0px)",
    '& table':{
      '& tr':{
            '& td:nth-child(2)':{
                  display: 'none'
            },
            '& td:nth-child(4)':{
              display: 'none'
           },
           '& td:nth-child(14)':{
             display: 'none'
          }
      }
  }
},  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "100%",
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
  textField: {
    marginRight: "10px !important",
  },
  dateField:{
      '& .MuiInput-input': {
        color:  "rgba(102,102,102,1)",
      }
  },
});

const initialsearch = {
  TRN_TYPE: [] ,
  AREF: [],
}

const SystemConfig = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const ErrorProceesClasses = useStyles();
  let ConfigData = useSelector(
    (state) => state.SystemConfigReducers
  );
  console.log("tes",ConfigData);
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const serializedata = (datatable) => {
    let newTabledata = [];
    let count = 1;
    if(datatable.length > 0){
      datatable.map( item => {
        item['SR_NO']= count;
          const reorder = {
            'TRN_TYPE':"",
            'TRN_NAME': "",
            'AREF': "",
            'STCK_LDGR_APPL': "",
            'SOH_IMPACT': "",
            "COST_USED": "",
            'PERIOD_INVT_TRAN':"",
            'INJECT_PERIOD': "",
            'OVERRIDE_ACCUMULATE': "",
            'HIER_LEVEL':"",
            'FIN_APPL': "",
            'ACCT_REFERENCE': ""
          }
          count++;

            let test = Object.assign(reorder,item);
            newTabledata.push(test); 
    })
    return newTabledata;
  } 
  }

  useEffect(() => {
    if (inputValue) {
      const filteredTable = tabledata.filter(props => 
        Object
          .entries(inputValue)
          .every(([key,val]) => 
            !val.length ||
            props[key]?.toString().toLowerCase().includes(val?.toString().toLowerCase()))
      )
      setTabledata(filteredTable);
    }
  }, [inputValue]);

  // useEffect(() => {
  //   if (ConfigData.isError) {
  //     setIsError(true)
  //   }else if(ConfigData.isSuccess){
  //     setIsSuccess(true);
  //   }else {
  //     setIsError(false)
  //     setTabledata("")
  //   }
  // }, [ConfigData])


  useEffect(() => {
    if (ConfigData.isError) {
        setIsError(true)
        swal(
          <div>     
            <p>{ConfigData["messgae"]}</p>
          </div>
        )  
        setSearch(false);
    }else if(ConfigData.isSuccess ){
      setIsSuccess(true);
      swal(
        <div>     
           <p>{ConfigData["messgae"]}</p>
        </div>
      )
      setLoading(true);
    }else {
      setIsError(false)
      setTabledata("")
    }
  }, [ConfigData])

  useEffect(() => { 
    if(isSubmit){
      setTimeout(() => {
        dispatch(getSystemConfigRequest([searchData])) 
      },1000)
    }
      return () => {
        dispatch(resetSystemConfig());
      }

},[isSubmit]);

useEffect(() => {
  if(isSearch){
    dispatch(getSystemConfigRequest([searchData])) 
  }
},[isSearch])

  useEffect(() => {
        if(ConfigData?.data?.Data && Array.isArray(ConfigData?.data?.Data)){
          setTabledata(serializedata(ConfigData?.data?.Data));
          setAllData(serializedata(ConfigData?.data?.Data));
          setLoading(false);
          setSubmit(false);
          setSearch(false);
        }else {
          setSearch(false)
        }
        
  },[ConfigData?.data])


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

  const handleCancel = () => {
    setOpen(false)
  }
const handleClose = () => {
  setOpen(false);
}

const confirmSubmit = () => {
  setOpen(true);
}
  
  const SubmitList = () => {
    console.log(updateRow);
    if(Object.keys(updateRow).length > 0){
      let sendRow = Object.values(updateRow);
      sendRow.map((item)=> {
          delete item?.TRN_NAME;
          delete item?.undefined;
          delete item?.SR_NO;
          if(item?.ACCT_REFERENCE == null){
            item['ACCT_REFERENCE']= "";
          }
      })
      console.log("updateRow",sendRow);
    setLoading(true);
    dispatch(postSystemConfigRequest(sendRow));
    // initialsearch.TRN_TYPE= [] || "";
    // initialsearch.AREF = [] || "";
    //setSearchData(initialsearch);
    setSubmit(true);
    seteditRows([]);
    setOpen(false);
    }
    
  };
const handleSubmit = (event) => {
  event.preventDefault();
    setSearch(true);
    setState({ ...state, 'right': open });
}


// const handleMsgClose = () => {
//   setIsError(false)
//   setIsSuccess(false)
// }

const onReset = (event) => {

    initialsearch.TRN_TYPE= [];
    initialsearch.AREF = [];
    console.log('datainitial',initialsearch);
      setSearchData(initialsearch)
      console.log('data',searchData);
      setSearch(false);
      setTabledata("");
      setInputValue("");

      dispatch(resetSystemConfig());
}
 const selectTrantype = (event, value) => {
   console.log("t",value);


  let selectedTrantype = [];
  let selectedAref = [];
  if(value.length > 0 && typeof value[0]['TRN_TYPE'] !== "undefined"){
    value.map(
      (item) => {
        selectedTrantype.push(item.TRN_TYPE);
        selectedAref.push(item.AREF)
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        TRN_TYPE : selectedTrantype,
        AREF: selectedAref
      };
    });
  }else if(value.length > 0){
        console.log(value);
        swal(
          <div>     
            <p>{"Please Choose valid TRN TYPE"}</p>
          </div>
        )  
  }else {
    setSearchData((prev) => {
      return {
        ...prev,
        TRN_TYPE : [],
        AREF: []
      };
    });
  }
 }

const searchPanel = () => (
  <Box
    sx={{ width: 350, marginTop: '80px'}}
    role="presentation"
    component="form"
    onSubmit={handleSubmit}
  > <Grid item xs={12} sx={{display:'flex', justifyContent:'center', marginTop: '15px'}}>
         <Stack spacing={2} sx={{ width: 250 }}>     
            <Autocomplete
              noOptionsText={'Please Choose valid TRN TYPE'}
              multiple
              disablePortal
              size="small"
              id="combo-box-trn-type"
              onChange={selectTrantype}
              options={trnType}
              getOptionLabel={(option) => option.TRN_NAME}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="TRN TYPE" variant="standard" />}
            />
{/* 
<Autocomplete
        value={value}
        onChange={(event, newValue) => {
          console.log(newValue);
          setValue(newValue);
        }}
        multiple
        id="tags-filled"
        options={trnType.map((option) => option.TRN_NAME)}
        renderTags={(value, getTagProps) =>
          value.map((option,index) => (
            <Chip
              variant="filled"
              label={option}
              {...getTagProps({ index })}
            />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label="TRN_TYPE"
          />
        )}
      /> */}
            <div>
            <Button
              className={ErrorProceesClasses.textField}
              type="submit"
              variant="contained"
              sx={{ width:'120px'}}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            <Button
              variant="contained"
              sx={{ width:'120px'}}
              onClick={onReset}
              startIcon={<RestartAltIcon />}
            >
              Reset
            </Button>
            </div>
            </Stack>
            </Grid>
  </Box>
);

  return (
    <Box className={ErrorProceesClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={ErrorProceesClasses.boxDiv}>
            <div className={ErrorProceesClasses.uploaddiv}>
              <h4>System Config</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
        <Box display="flex"
              justifyContent="flex-end"
              alignItems="flex-end" className={ErrorProceesClasses.boxDiv}>
            <div className={ErrorProceesClasses.uploaddiv}>
              {(Object.keys(updateRow).length > 0) && 
            <Button variant="contained" sx={{marginTop: '15px'}} onClick={() => {confirmSubmit()}} startIcon={<SendIcon />}>
                  Submit
              </Button> 
                  }
       
          <Button disableRipple variant="contained" sx={{ marginTop: '15px', textAlign:'right' }} onClick={toggleDrawer('right', true)} startIcon={<SearchIcon />}>Search</Button>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            transitionDuration={700}
          >
            {searchPanel('right')}
          </Drawer>
       </div>
          </Box>
        </Grid>
      </Grid>

      {loading ? (
                  <CircularProgress color="inherit" />
                ) : (
        tabledata &&
        <Table
          tableData={tabledata}
          //handleDelete={handleDelete}
          handleSearch={handleChange}
          searchText={inputValue}
          handleEdit={true}
          editRows={editRows}
          seteditRows={seteditRows}
          setUpdateRow={setUpdateRow}
          headCells={headCells}
          setTabledata={setTabledata}
          allData={allData}
          pageName="config"
        />
      )}

      {/* <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError || isSuccess} autoHideDuration={3000} onClose={handleMsgClose}>
          <Alert
            onClose={handleMsgClose}
            severity={ConfigData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          {ConfigData?.messgae?ConfigData?.messgae:'Data Successfully Fetched'}
          </Alert>
          </Snackbar>
      </Stack> */}
      {/* <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={ErrorProceesClasses.popUp}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Note:-
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please update record before click submit button.
          </Typography>
        </Box>
      </Modal> */}

       {/* <div>
        <Dialog
          fullScreen={fullScreen}
          open={ConfigData?.messgae?true:false}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          className={ErrorProceesClasses.popUp}
          PaperProps={{
            style: {
              backgroundColor: '#D3D3D3',
              borderRadius: '10px',
            },
          }}
        >
          <DialogTitle id="responsive-dialog-title">
            {"Message"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText>
              {ConfigData?.messgae}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} autoFocus>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </div>                 */}

      <div>
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      className={ErrorProceesClasses.popUp}
      PaperProps={{
        style: {
          backgroundColor: '#D3D3D3',
          borderRadius: '10px',
        },
      }}
    >
      <DialogTitle id="responsive-dialog-title">
        {"Do you want to submit data?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
           
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleCancel}>
          Cancel
        </Button>
        <Button onClick={SubmitList} autoFocus>
          Continue
        </Button>
      </DialogActions>
    </Dialog>
  </div>
    </Box>
  );
};

export default SystemConfig;
