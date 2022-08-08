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
import { getErrorProcessingRequest, postErrorProcessingRequest, getClassDataRequest, getLocationDataRequest } from "../../Redux/Action/errorProcessing";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import { trnType } from "../../Components/ErrorProcessing/transType.js";
import { errorList } from "../../Components/ErrorProcessing/errorType.js"; 
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
            '& td:nth-child(28)':{
                  display: 'none'
            },
            '& td:nth-child(29)':{
              display: 'none'
           },
           '& td:nth-child(30)':{
             display: 'none'
          }
      }
  }
},  boxDiv: {
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
  textField: {
    marginRight: "10px !important",
  },
  dateField:{
      '& .MuiInput-input': {
        color:  "rgba(102,102,102,1)",
      }
  },
  popUp: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    backgroundColor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    padding: '20px 20px 20px 20px',
  },
});

const initialsearch = {
  DEPT: [],
  CLASS: [],
  SUBCLASS: [],
  ITEM: [],
  LOCATION: [],
  TRN_TYPE: [],
  AREF: [],
  ERR_MSG: [],
  CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
  TRN_DATE: "",
}

const initialItemData = {
  DEPT: "",
  CLASS: "",
  SUBCLASS: "",
  ITEM: ""
}


const SystemConfig = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [itemData, setItemData] = useState(initialItemData);
  const [origItemData, setOrigItemData ] = useState({});
  const [filterClass, setFilterClass] = useState([]);
  const [subfilterClass, setsubFilterClass] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const [locationData, setLocationData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const ErrorProceesClasses = useStyles();
  const ErrorProcessingData = useSelector(
    (state) => state.ErrorProcessingReducers
  );
  console.log(ErrorProcessingData);
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const serializedata = (datatable) => {
    let newTabledata = [];
    if(datatable.length > 0){
      datatable.map( item => {
          const reorder = {
            'ITEM' : null,
            'ERR_MSG': null,
            'ITEM_DESC': null,
            'DEPT': null,
            'DEPT_DESC': null,
            'CLASS': null,
            'CLASS_DESC': null,
            'SUBCLASS':null,
            'SUBCLASS_DESC': null,
            'LOCATION_TYPE': null,
            'LOCATION': null,
            'LOCATION_NAME': "",
            'TRN_DATE': "",
            'TRN_NAME': "",
            'QTY': "",
            'UNIT_COST': "",
            'UNIT_RETAIL': "",
            'TOTAL_COST': "",
            'TOTAL_RETAIL': "",
            'REF_NO1': "",
            'REF_NO2': "",
            'REF_NO3': "",
            'REF_NO4': "",
            'CURRENCY': "",
            'ERR_SEQ_NO': null,
            'TRAN_SEQ_NO': null,
            'TRN_TYPE': "",
            'AREF': null,
          }
          parseFloat(item.LOCATION?.toFixed(1));
          delete item?.PROCESS_IND;
          delete item?.SELLING_UOM;
          delete item?.TRN_POST_DATE;
          delete item?.REF_ITEM;
          delete item?.REF_ITEM_TYPE;
          delete item?.PACK_QTY;
          delete item?.PACK_COST;
          delete item?.PACK_RETAIL;
          delete item?.CREATE_ID;
          delete item?.CREATE_DATETIME;
          delete item?.REV_NO;
          delete item?.REV_TRN_NO;
            let test = Object.assign(reorder,item);
            newTabledata.push(test); 
    })
    return newTabledata;
  } 
  }

  useEffect(() => {
    if (inputValue) {
      // const filteredTable = tabledata.filter((val) =>
      //   val[Object.keys(inputValue)[0]]
      //     ?.toString()
      //     .toLowerCase()
      //     .includes(Object.values(inputValue)[0]?.toString().toLowerCase())
      // );
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

  useEffect(() => {
    if (ErrorProcessingData.isError) {
      setIsError(true)
    }else if(ErrorProcessingData.isSuccess){
      setIsSuccess(true);
    }else {
      setIsError(false)
      setTabledata("")
    }
  }, [ErrorProcessingData])

  useEffect(() => { 
    if(isSubmit){
      setTimeout(() => {
        dispatch(getErrorProcessingRequest([searchData])) 
      },3000)
    }
},[isSubmit]);

useEffect(() => {
  if(isSearch){
    dispatch(getErrorProcessingRequest([searchData])) 
  }
},[isSearch])

useEffect(()=> {
  setLoading(true);
  dispatch(getClassDataRequest([{}]));
  dispatch(getLocationDataRequest([{}]));
},[''])

  useEffect(() => {
        if(ErrorProcessingData?.data?.Data && Array.isArray(ErrorProcessingData?.data?.Data)){
          setTabledata(serializedata(ErrorProcessingData?.data?.Data));
          setAllData(serializedata(ErrorProcessingData?.data?.Data));
          setLoading(false);
          setSubmit(false);
          setSearch(false);
        }else if(ErrorProcessingData?.data?.itemData && Array.isArray(ErrorProcessingData?.data?.itemData)){
          setItemData(ErrorProcessingData?.data?.itemData);
          setOrigItemData(ErrorProcessingData?.data?.itemData);
          setLoading(false);
        }else if(ErrorProcessingData?.data?.locationData && Array.isArray(ErrorProcessingData?.data?.locationData)){
          setLocationData(ErrorProcessingData?.data?.locationData);
          setLoading(false);
        }else {
          setSearch(false)
        }
        
  },[ErrorProcessingData?.data])



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

  const SubmitList = () => {
    console.log(updateRow);
    if(Object.keys(updateRow).length > 0){
      let sendRow = Object.values(updateRow);
      sendRow.map((item)=> {
          delete item?.ITEM_DESC;
          delete item?.DEPT_DESC;
          delete item?.CLASS_DESC;
          delete item?.SUBCLASS_DESC;
          delete item?.TRN_NAME;
          delete item?.LOCATION_NAME;
          delete item?.undefined;
      })
      console.log(sendRow);
    setLoading(true);
    dispatch(postErrorProcessingRequest(sendRow));
    initialsearch.DEPT = [];
    initialsearch.CLASS = [];
    initialsearch.SUBCLASS = [];
    initialsearch.ITEM = [];
    initialsearch.LOCATION = [];
    initialsearch.TRN_TYPE= [];
    initialsearch.TRN_DATE= [];
    initialsearch.AREF = [];
    initialsearch.ERR_MSG= [];
    initialsearch.CREATE_ID= [];
    setSearchData(initialsearch);
    setFilterClass([]);
    setsubFilterClass([]);
    setFilterItem([]);
    setSubmit(true);
    seteditRows([]);
    }else{
      setOpen(true)
    }
    
  };
const handleSubmit = (event) => {
  event.preventDefault();
    setSearch(true);
    setState({ ...state, 'right': open });
}

const onChange = (e) => {
  setSearchData((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value,
    };
  });
}

const handleMsgClose = () => {
  setIsError(false)
  setIsSuccess(false)
}

const onReset = (event) => {

    initialsearch.DEPT = [];
    initialsearch.CLASS = [];
    initialsearch.SUBCLASS = [];
    initialsearch.ITEM = [];
    initialsearch.LOCATION = [];
    initialsearch.TRN_TYPE= [];
    initialsearch.TRN_DATE= [];
    initialsearch.AREF = [];
    initialsearch.ERR_MSG= [];
    initialsearch.CREATE_ID= [];
    console.log('datainitial',initialsearch);
      setSearchData(initialsearch)
      setFilterClass([]);
      setsubFilterClass([]);
      setFilterItem([]);

      
      console.log('data',searchData);
      setSearch(false);
      setTabledata("");

}

const selectDept = (event, value) => {
  let selectedDept = [];
  if(value.length > 0){
    console.log(itemData);
  const filterClass = itemData.filter((item) => { return value.some((val) => { return item.DEPT === val.DEPT})});
    console.log(filterClass);
    //const classFilter = (filterClass.length > 0 )?[...new Set(filterClass.map(item => item.CLASS))]:[];
    setFilterClass(filterClass);

    value.map(
      (item) => {
        selectedDept.push(item.DEPT);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        DEPT : selectedDept
      };
    });

  }else{
   setFilterClass([])
    setSearchData((prev) => {
      return {
        ...prev,
        DEPT : []
      };
    });
  }
}
console.log(searchData);

const selectClass = (event,value) => {
  console.log(value);
 let selectedClass = [];
  if(value.length > 0){
    //const subclassFilter = (filterSubClass.length > 0 )?[...new Set(filterSubClass.map(item => item.SUBCLASS))]:[];
    const filterSubClass = itemData.filter((item) => { return value.some((val) => { return item.CLASS === val.CLASS})});  
    console.log(filterSubClass);
   setsubFilterClass(filterSubClass)
   value.map(
    (item) => {
      selectedClass.push(item.CLASS);
    }
  )
    setSearchData((prev) => {
      return {
        ...prev,
        CLASS : selectedClass
      };
    });

  }else{
    setsubFilterClass([])
    setSearchData((prev) => {
      return {
        ...prev,
        CLASS : []
      };
    });
  }
}
const selectSubClass = (event,value) => {
  let selectedSubclass = [];
  if(value.length > 0){
    //const itemFilter = (filterItem.length > 0 )?[...new Set(filterItem.map(item => item.ITEM))]:[];
   // console.log(itemFilter);
   const filterItem = itemData.filter((item) => { return value.some((val) => { return item.SUBCLASS === val.SUBCLASS})});  
    setFilterItem(filterItem)
    value.map(
      (item) => {
        selectedSubclass.push(item.SUBCLASS);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        SUBCLASS : selectedSubclass
      };
    });

  }else{
    setFilterItem([])
    setSearchData((prev) => {
      return {
        ...prev,
        SUBCLASS : []
      };
    });
  }
}

const selectItem = (event, value) => {
  let selectedItem = [];
  if(value.length > 0){
    value.map(
      (item) => {
          selectedItem.push(item.ITEM);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        ITEM : selectedItem
      };
    });
  }else{
    setSearchData((prev) => {
      return {
        ...prev,
        ITEM : selectedItem
      };
    });
  }
}

const selectLocation = (event, value) => {
  console.log(value);
      let selectedLocation = [];
      if(value.length > 0){
        value.map(
          (item) => {
            selectedLocation.push(item.LOCATION);
          }
        )
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION : selectedLocation
        };
      });
      }else{
        initialsearch.LOCATION = '';
        setSearchData((prev) => {
          return {
            ...prev,
            LOCATION : []
          };
        });
      }
}

const selectError = (event, value) => {
  let selectedError = [];
  if(value.length > 0){
    value.map(
      (item) => {
          selectedError.push(item);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        ERR_MSG : selectedError
      };
    });
  }else{
    setSearchData((prev) => {
      return {
        ...prev,
        ERR_MSG : []
      };
    });
  }
}
 const selectTrantype = (event, value) => {
   console.log(value);
  let selectedTrantype = [];
  let selectedAref = [];
  if(value.length > 0){
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
  }else{
    setSearchData((prev) => {
      return {
        ...prev,
        TRN_TYPE : [],
        AREF: []
      };
    });
  }

 }
console.log(searchData);
const searchPanel = () => (
  <Box
    sx={{ width: 350, marginTop: '80px'}}
    role="presentation"
    component="form"
    onSubmit={handleSubmit}
  > <Grid item xs={12} sx={{display:'flex', justifyContent:'center', marginTop: '15px'}}>
         <Stack spacing={2} sx={{ width: 250 }}>
          {/* <Autocomplete
              multiple
              size="small"
              id="combo-box-dept"
              options={itemData}
              //value={(searchData?.DEPT.length > 0)?searchData?.DEPT:[]}
              sx={{ width: 250 }}
              onChange={selectDept} 
              renderInput={(params) => <TextField {...params} label="DEPT" variant="standard" />}
            />
           
            <Autocomplete
              multiple
              size="small"
              id="combo-box-class"
              options={(filterClass.length > 0)?filterClass:[]}
             // value={(searchData?.CLASS.length > 0)?searchData?.CLASS:[]}
              sx={{ width: 250 }}
              onChange={selectClass} 
              renderInput={(params) => <TextField {...params} label="CLASS" variant="standard" />}
            />
         
            <Autocomplete
              multiple
              size="small"
              id="combo-box-subclass"
              options={(subfilterClass.length > 0)?subfilterClass:[]}
             // value={(searchData?.SUBCLASS.length > 0)?searchData?.SUBCLASS:[]}
              sx={{ width: 250 }}
              onChange={selectSubClass} 
              renderInput={(params) => <TextField {...params} label="SUBCLASS" variant="standard" />}
            /> */}
                 <Autocomplete
              multiple
              size="small"
              id="combo-box-item"
              sx={{ width: 250 }}
              options={(itemData.length > 0)?itemData:[]}
              //value={searchData?.DEPT}
              isOptionEqualToValue={(option, value) => option.DEPT === value.DEPT}
              autoHighlight
              onChange={selectDept}
              getOptionLabel={(option) => `${option.DEPT.toString()}-${option.DEPT_DESC.toString()}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.DEPT}-{option.DEPT_DESC}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={searchData?.ITEM}
                  variant="standard" 
                  label="Choose a DEPT"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />

            <Autocomplete
              multiple
              size="small"
              id="combo-box-class"
              sx={{ width: 250 }}
              options={(filterClass.length > 0)?filterClass:[]}
              //value={(searchData?.ITEM.length > 0)?searchData?.ITEM:[]}
              isOptionEqualToValue={(option, value) => option.CLASS === value.CLASS}
              autoHighlight
              onChange={selectClass}
              getOptionLabel={(option) => `${option.CLASS.toString()}-${option.CLASS_DESC.toString()}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.CLASS} {option.CLASS_DESC}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard" 
                  label="Choose a CLASS"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
            

<Autocomplete
              multiple
              size="small"
              id="combo-box-subclass"
              sx={{ width: 250 }}
              options={(subfilterClass.length > 0)?subfilterClass:[]}
              //value={(searchData?.ITEM.length > 0)?searchData?.ITEM:[]}
              isOptionEqualToValue={(option, value) => option.SUBCLASS === value.SUBCLASS}
              autoHighlight
              onChange={selectSubClass}
              getOptionLabel={(option) => `${option.SUBCLASS.toString()}-${option.SUBCLASS_DESC.toString()}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.SUBCLASS} {option.SUBCLASS_DESC}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard" 
                  label="Choose a SUBCLASS"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
   
  
            <Autocomplete
              multiple
              size="small"
              id="combo-box-item"
              sx={{ width: 250 }}
              options={(filterItem.length > 0)?filterItem:[]}
              //value={(searchData?.ITEM.length > 0)?searchData?.ITEM:[]}
              isOptionEqualToValue={(option, value) => option.ITEM === value.ITEM}
              autoHighlight
              onChange={selectItem}
              getOptionLabel={(option) => `${option.ITEM.toString()}-${option.ITEM.toString()}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.ITEM} {option.ITEM_DESC}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard" 
                  label="Choose a ITEM"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
    
            <Autocomplete
              multiple
              size="small"
              id="combo-box-location"
              sx={{ width: 250 }}
              options={(locationData.length > 0)?locationData:[]}
             // value={searchData.LOCATION}
              autoHighlight
              isOptionEqualToValue={(option, value) => option.LOCATION === value.LOCATION}
              onChange={selectLocation}
              getOptionLabel={(option) => `${option.LOCATION.toString()}-(${option.LOCATION_NAME.toString()})`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.LOCATION} ({option.LOCATION_NAME})
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard" 
                  label="Choose a Location"
                  inputProps={{
                    ...params.inputProps,
                    autoComplete: 'new-password', // disable autocomplete and autofill
                  }}
                />
              )}
            />
       
            <Autocomplete
              multiple
              disablePortal
              size="small"
              id="combo-box-trn-type"
             // value={(searchData?.TRN_TYPE.length > 0)?searchData?.TRN_TYPE:[]}
              onChange={selectTrantype}
              options={trnType}
              getOptionLabel={(option) => option.TRN_NAME}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField {...params} label="TRN TYPE" variant="standard" />}
            />

            <Autocomplete
              multiple
              disablePortal
              size="small"
              id="combo-box-err-type"
            //  value={(searchData?.ERR_MSG.length > 0)?searchData?.ERR_MSG:[]}
              options={(errorList.length > 0)?errorList:[]}
              sx={{ width: 250 }}
              onChange={selectError}
              renderInput={(params) => <TextField {...params} label="ERR MESSAGE" variant="standard" />}
            />
            <TextField
              className={ErrorProceesClasses.textField}
              disabled
              margin="normal"
              size="small"
              variant="standard" 
              name="CREATE_ID"
              label="CREATE ID"
              type="text"
              sx={{ width: 250 }}
              value={JSON.parse(localStorage.getItem("userData"))?.username}
            />
             <TextField
              className={ErrorProceesClasses.dateField}
              margin="normal"
              size="small"
              variant="standard" 
              name="TRN_DATE"
              label="TRN DATE"
              type="date"
              inputProps={{ max:"2022-07-27"}}
              value={searchData.TRN_DATE}
              onChange={onChange}
              sx={{ width: 250 }}
              style={{
                color: "#D3D3D3",
              }}
              InputLabelProps={{
                shrink: true,
              }}
            />
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
            <Button variant="contained" sx={{marginTop: '15px'}} onClick={SubmitList} startIcon={<SendIcon />}>
                  Submit
              </Button> 
                  }
       
          <Button variant="contained" sx={{ marginTop: '15px', textAlign:'right' }} onClick={toggleDrawer('right', true)} startIcon={<SearchIcon />}>Search</Button>
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
        />
      )}

      <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError || isSuccess} autoHideDuration={3000} onClose={handleMsgClose}>
          <Alert
            onClose={handleMsgClose}
            severity={ErrorProcessingData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          {ErrorProcessingData?.messgae?ErrorProcessingData?.messgae:'Data Successfully Fetched'}
          </Alert>
          </Snackbar>
      </Stack>
      <Modal
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
      </Modal>

    </Box>
  );
};

export default SystemConfig;
