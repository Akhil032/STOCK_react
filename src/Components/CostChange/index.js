import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/indexCC";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from '@mui/material/Modal';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from '@mui/material/Typography';
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { getCostChangeRequest, postCostChangeRequest, getClassDataRequest, getLocationDataRequest } from "../../Redux/Action/costChange";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from '@mui/icons-material/Search';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import SendIcon from '@mui/icons-material/Send';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

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
  // popUp: {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(70%, 10%)',
  //   width: 500,
  //   backgroundColor: 'white',
  //   border: '2px solid #000',
  //   boxShadow: 5,
  //   padding: '20px 20px 20px 20px',
  // },
});

const initialsearch = {
  HIER1: [],
  HIER2: [],
  HIER3: [],
  ITEM: [],
  LOCATION: [],
}

const initialItemData = {
  HIER1: "",
  HIER2: "",
  HIER3: "",
  ITEM: ""
}


const CostChange = () => {
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
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const CostChangeClasses = useStyles();
  const CostChangeData = useSelector(
    (state) => state.CostChangeReducers
  );
  // console.log("128",CostChangeData);
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const serializedata = (datatable) => {
     console.log("dt",datatable)
     //console.log("ad",allData)
    
     let newTabledata = [];
     if(datatable.length > 0){
       datatable.map( item => {
           const reorder = {
             'ITEM' : null,
             'ITEM_DESC': null,
             'LOCATION': null,
             'LOCATION_NAME': "",
             'ITEM_SOH': "",
             'UNIT_COST': "",
            
           }
          //console.log("158 reorder:",reorder)
                  
             let test = Object.assign(reorder,item);
             newTabledata.push(test); 
             initialsearch.HIER1 = [];
              initialsearch.HIER2 = [];
              initialsearch.HIER3 = [];
              initialsearch.ITEM = [];
              initialsearch.LOCATION = [];
              setSearchData(initialsearch)
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

  useEffect(() => {
    if (CostChangeData.isError) {
      //console.log("hello",CostChangeData["messgae"])

      setIsError(true)
    }else if(CostChangeData.isSuccess){
     
      setIsSuccess(true);
    }else {
      console.log("hello1",CostChangeData)
      setIsError(false)
      setTabledata("")
    }
  }, [CostChangeData])

  useEffect(() => { 
    if(isSubmit){
      setTimeout(() => {
       // console.log("194 SD", searchData)
        dispatch(getCostChangeRequest([searchData])) 
      },1000)
    }
},[isSubmit]);

useEffect(() => {
  if(isSearch){
    dispatch(getCostChangeRequest([searchData])) 
  }
},[isSearch])

useEffect(()=> {
  setLoading(true);
  dispatch(getClassDataRequest([{}]));
  dispatch(getLocationDataRequest([{}]));
  
},[''])

  useEffect(() => {
        if(CostChangeData?.data?.Data && Array.isArray(CostChangeData?.data?.Data)){
          setTabledata(serializedata(CostChangeData?.data?.Data));
          setAllData(serializedata(CostChangeData?.data?.Data));
          setLoading(false);
          setSubmit(false);
          setSearch(false);
        }else if(CostChangeData?.data?.itemData && Array.isArray(CostChangeData?.data?.itemData)){
          setItemData(CostChangeData?.data?.itemData);
          setOrigItemData(CostChangeData?.data?.itemData);
          setLoading(false);
        }else if(CostChangeData?.data?.locationData && Array.isArray(CostChangeData?.data?.locationData)){
          setLocationData(CostChangeData?.data?.locationData);
          setLoading(false);
        }else {
          setSearch(false)
        }
        
  },[CostChangeData?.data])



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
    
    for (let i = 0; i < Object.values(updateRow).length; i++){
      Object.values(updateRow)[i]["CREATE_ID"]=JSON.parse(localStorage.getItem("userData"))?.username;
    }
    console.log("251 cc",Object.values(updateRow));
    if(Object.keys(updateRow).length > 0){
      let sendRow = Object.values(updateRow);
      sendRow.map((item)=> {
          delete item?.ITEM_DESC;
          delete item?.ITEM_SOH;
          delete item?.LOCATION_NAME;
          delete item?.undefined;
      })
      
      console.log("post:",sendRow);
    

    dispatch(postCostChangeRequest(sendRow));
    setLoading(true);
    initialsearch.HIER1 = [];
    initialsearch.HIER2 = [];
    initialsearch.HIER3 = [];
    initialsearch.ITEM = [];
    initialsearch.LOCATION = [];
   
    // initialsearch.AREF = [];
    // initialsearch.ERR_MSG= [];
    // initialsearch.CREATE_ID= [];
    setSearchData(initialsearch);
    setFilterClass([]);
    setsubFilterClass([]);
    setFilterItem([]);
    setSubmit(true);
    seteditRows([]);
    setOpen(false)
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

    initialsearch.HIER1 = [];
    initialsearch.HIER2 = [];
    initialsearch.HIER3 = [];
    initialsearch.ITEM = [];
    initialsearch.LOCATION = [];
    
    
    
      setSearchData(initialsearch)
      setFilterClass([]);
      setsubFilterClass([]);
      setFilterItem([]);

      
      //console.log('data',searchData);
      setSearch(false);
      setTabledata("");

}

const selectHier1 = (event, value) => {
  let selectedHier1 = [];
  if(value.length > 0){
    //console.log(itemData);
  const filterClass = itemData.filter((item) => { return value.some((val) => { return item.HIER1 === val.HIER1})});
    //console.log(filterClass);
    //const classFilter = (filterClass.length > 0 )?[...new Set(filterClass.map(item => item.CLASS))]:[];
    setFilterClass(filterClass);

    value.map(
      (item) => {
        selectedHier1.push(item.HIER1);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        HIER1 : selectedHier1
      };
    });

  }else{
   setFilterClass([])
    setSearchData((prev) => {
      return {
        ...prev,
        HIER1 : []
      };
    });
  }
}
//console.log(searchData);

const selectHier2 = (event,value) => {
  //console.log(value);
 let selectedHier2 = [];
  if(value.length > 0){
    //const subclassFilter = (filterSubClass.length > 0 )?[...new Set(filterSubClass.map(item => item.SUBCLASS))]:[];
    const filterSubClass = itemData.filter((item) => { return value.some((val) => { return item.HIER2 === val.HIER2})});  
    //console.log(filterSubClass);
   setsubFilterClass(filterSubClass)
   value.map(
    (item) => {
      selectedHier2.push(item.HIER2);
    }
  )
    setSearchData((prev) => {
      return {
        ...prev,
        HIER2 : selectedHier2
      };
    });

  }else{
    setsubFilterClass([])
    setSearchData((prev) => {
      return {
        ...prev,
        HIER2 : []
      };
    });
  }
}
const selectHier3 = (event,value) => {
  let selectedHier3 = [];
  if(value.length > 0){
    //const itemFilter = (filterItem.length > 0 )?[...new Set(filterItem.map(item => item.ITEM))]:[];
   // console.log(itemFilter);
   const filterItem = itemData.filter((item) => { return value.some((val) => { return item.HIER3 === val.HIER3})});  
    setFilterItem(filterItem)
    value.map(
      (item) => {
        selectedHier3.push(item.HIER3);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        HIER3 : selectedHier3
      };
    });

  }else{
    setFilterItem([])
    setSearchData((prev) => {
      return {
        ...prev,
        HIER3 : []
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
  //console.log(value);
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
//console.log("495 searchdata",searchData);
const searchPanel = () => (
  <Box
    sx={{ width: 350, marginTop: '80px'}}
    role="presentation"
    component="form"
    onSubmit={handleSubmit}
  > <Grid item xs={12} sx={{display:'flex', justifyContent:'center', marginTop: '15px'}}>
         <Stack spacing={2} sx={{ width: 250 }}>
         
                 <Autocomplete
              multiple
              size="small"
              id="combo-box-item"
              sx={{ width: 250 }}
              options={(itemData.length > 0)?itemData:[]}
              //value={searchData?.HIER1}
              isOptionEqualToValue={(option, value) => option.HIER1 === value.HIER1}
              autoHighlight
              onChange={selectHier1}
              getOptionLabel={(option) => `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.HIER1}-{option.HIER1_DESC}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  value={searchData?.ITEM}
                  variant="standard" 
                  label="Choose a HIER1"
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
              isOptionEqualToValue={(option, value) => option.HIER2 === value.HIER2}
              autoHighlight
              onChange={selectHier2}
              getOptionLabel={(option) => `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.HIER2} {option.HIER2_DESC}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard" 
                  label="Choose a HIER2"
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
              isOptionEqualToValue={(option, value) => option.HIER3 === value.HIER3}
              autoHighlight
              onChange={selectHier3}
              getOptionLabel={(option) => `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.HIER3} {option.HIER3_DESC}
                </Box>
              )}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="standard" 
                  label="Choose a HIER3"
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
       
           
            <div>
            <Button
              className={CostChangeClasses.textField}
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
const handleCancel = () => {
  setOpen(false)
}
const handleClose = () => {
  //setIsValidExcel(true);
  setOpen(false);
};
const handleClickOpen = () => setOpen(true);


  return (
    <Box className={CostChangeClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={CostChangeClasses.boxDiv}>
            <div className={CostChangeClasses.uploaddiv}>
              <h4>Cost Maintenance</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
        <Box display="flex"
              justifyContent="flex-end"
              alignItems="flex-end" className={CostChangeClasses.boxDiv}>
            <div className={CostChangeClasses.uploaddiv}>
              {(Object.keys(updateRow).length > 0) && 
            <Button variant="contained" sx={{marginTop: '15px'}}  onClick={handleClickOpen} startIcon={<SendIcon />}>
                  Submit
              </Button> 
              
                  }
              <div>
                  <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    className={CostChangeClasses.popUp}
                      PaperProps={{
                      style: {
                      backgroundColor: '#D3D3D3',
                      borderRadius: '20px',
                      },
                      }}
                    >
                      <DialogTitle id="responsive-dialog-title">
                      {"This will permanently update the data!"}
                  </DialogTitle>
                    <DialogContent>
                    <DialogContentText>
                      Please click continue to update. 
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
        <Snackbar open={isError || isSuccess} autoHideDuration={3000} onClose={handleMsgClose} sx={{height: "100%"
            }} anchorOrigin={{
          vertical: "top",
          horizontal: "center"          
        }}>
      
          <Alert
            onClose={handleMsgClose}
            severity={CostChangeData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          { CostChangeData?.message}
          </Alert>
          </Snackbar>
      </Stack>

      {/* <Modal
        open={open}
        onClose={() => {setOpen(false)}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={CostChangeClasses.popUp}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Note:-
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please update record before click submit button.
          </Typography>
        </Box>
      </Modal> */}

    </Box>
  );
};

export default CostChange;
