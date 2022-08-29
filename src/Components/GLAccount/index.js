import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/indexGL";
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
import { getGlAccountRequest, postGlAccountRequest,getGlcurrencyRequest } from "../../Redux/Action/glaccount";
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
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

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
  // popUp: {
  //   position: 'absolute',
  //   top: '50%',
  //   left: '50%',
  //   transform: 'translate(-50%, -50%)',
  //   width: 400,
  //   backgroundColor: 'white',
  //   border: '2px solid #000',
  //   boxShadow: 24,
  //   padding: '20px 20px 20px 20px',
  // },
});
const animatedComponents = makeAnimated();
const styleSelect = {
  control: base => ({
    ...base,
    border: 0,
    //border: "5px solid black",
    // This line disable the blue border
    boxShadow: 'none',
    borderBottom: "1px solid black"
  })
};


 const initialsearch = {
  PRIMARY_ACCOUNT: "",
  CURRENCY:"",
}

const initialItemData = {
  PRIMARY_ACCOUNT: "",
  CURRENCY:"",
}


const GlAccount = () => {
  const [valCurr, setValCurr] = useState([]);
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [itemData, setItemData] = useState([{}]);
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
  const GlAccountClasses = useStyles();
  const GlAccountData = useSelector(
    (state) => state.glaccountReducers
  );
  console.log("currency",GlAccountData);
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
            'PRIMARY_ACCOUNT' : null,
            'SET_OF_BOOKS_ID': null,
            'SEGMENT1': null,
            'SEGMENT2': null,
            'SEGMENT3': null,
            'SEGMENT4': null,
            'SEGMENT5': null,
            'SEGMENT6':null,
            'SEGMENT7': null,
            'CURRENCY': null,
            'CREATE_ID': null,
            'CREATE_DATETIME': "",           
          }  
          console.log(reorder)     
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

  useEffect(() => {
    if (GlAccountData.isError) {
      setIsError(true)
    }else if(GlAccountData.isSuccess){
      console.log("gla",GlAccountData)
      setIsSuccess(true);
    }else {
      setIsError(false)
      setTabledata("")
    }
  }, [GlAccountData])

  useEffect(() => { 
    if(isSubmit){ 
      setTimeout(() => {dispatch(getGlAccountRequest([searchData]))},50)
      // console.log("t",searchData)     
      // dispatch(getGlAccountRequest([searchData]))       
    }
},[isSubmit]);

useEffect(() => {
  if(isSearch){
    console.log("qt",searchData)
    dispatch(getGlAccountRequest([searchData])) 
  }
},[isSearch])

useEffect(() => {
  
    dispatch(getGlcurrencyRequest()) 
  
},[''])


  useEffect(() => {
        if(GlAccountData?.data?.Data && Array.isArray(GlAccountData?.data?.Data)){
          setTabledata(serializedata(GlAccountData?.data?.Data));
          setAllData(serializedata(GlAccountData?.data?.Data));
          setLoading(false);
          setSubmit(false);
          setSearch(false);
        }else if(GlAccountData?.data?.CURRENCYDATA && Array.isArray(GlAccountData?.data?.CURRENCYDATA)){
          setItemData(GlAccountData?.data?.CURRENCYDATA);
          //setOrigItemData(GlAccountData?.data?.CURRENCYDATA);
          setLoading(false);
          
        // }else if(GlAccountData?.data?.locationData && Array.isArray(GlAccountData?.data?.locationData)){
        //   setLocationData(GlAccountData?.data?.locationData);
          setLoading(false);
        }else {
          setSearch(false)
        }
        
  },[GlAccountData?.data])


console.log("effectit",itemData)
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
    console.log("ROW",updateRow);
    if(Object.keys(updateRow).length > 0){    
      console.log("ps",Object.keys(updateRow))  
    setLoading(true); 
    dispatch(postGlAccountRequest(Object.values(updateRow)));
    initialsearch.PRIMARY_ACCOUNT = [];
     
    setSubmit(true);
    seteditRows([]);
    }else{
      setOpen(true)
    }
     setOpen(false)
  };
const handleSubmit = (event) => {
  event.preventDefault();
    setSearch(true);
    setState({ ...state, 'right': open });
    console.log("state",state);
}

// const handleMsgClose = () => {
//   setIsError(false)
//   setIsSuccess(false)
// }
const onChange = (e) => {
  setSearchData((prev) => {
    return {
      ...prev,
      [e.target.name]: e.target.value,
    };
  });
}

// const handleMsgClose = () => {
//   setIsError(false)
//   setIsSuccess(false)
// }

const onReset = (event) => {

    initialsearch.PRIMARY_ACCOUNT = [];
    initialsearch.CURRENCY = [];

    setValCurr([])
    console.log('datainitial',initialsearch);
      setSearchData(initialsearch)
      setFilterClass([]);
      setsubFilterClass([]);
      setFilterItem([]);

      
      console.log('data',searchData);
      setSearch(false);
      setTabledata("");

}

// const selectPRIMARY_ACCOUNT = (event, value) => {
//   let selectPRIMARY_ACCOUNT = [];
//   if(value.length > 0){
//     console.log(itemData);
//   const filterClass = itemData.filter((item) => { return value.some((val) => { return item.PRIMARY_ACCOUNT === val.PRIMARY_ACCOUNT})});
//     console.log(filterClass);
//     const classFilter = (filterClass.length > 0 )?[...new Set(filterClass.map(item => item.HIER2))]:[];
//     setFilterClass(filterClass);

//     value.map(
//       (item) => {
//         selectPRIMARY_ACCOUNT.push(item.PRIMARY_ACCOUNT);
//       }
//     )
//     setSearchData((prev) => {
//       return {
//         ...prev,
//         PRIMARY_ACCOUNT : selectPRIMARY_ACCOUNT
//       };
//     });
//   }
// }

const selectCURRENCY = (event, value) => {
  let selectCURRENCY = [];
  if(value.length > 0){
    console.log(itemData);
  const filterClass = itemData.filter((item) => { return value.some((val) => { return item.CURRENCY === val.CURRENCY})});
    console.log(filterClass);
    const classFilter = (filterClass.length > 0 )?[...new Set(filterClass.map(item => item.HIER2))]:[];
    setFilterClass(filterClass);

    value.map(
      (item) => {
        selectCURRENCY.push(item.CURRENCY);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        CURRENCY : selectCURRENCY
      };
    });
  }
}
const handleCURRENCY=(e,value) =>
{
  console.log("HC",value)
  let selectedCURRENCY= [];
  if (value.option) {
    valCurr.push(value.option)

  }else if (value.removedValue) {
      //if (valCurr.includes(value.removedValue.CURRENCY)){
          let index = valCurr.indexOf(value.removedValue.CURRENCY);
          valCurr.splice(index,1);
          console.log("345",valCurr)
          //}
  }else if(value.action="clear"){
    valCurr.splice(0,valCurr.length);
  }
console.log("valCurr",valCurr)
 if (valCurr.length >0) {
  valCurr.map((item) => {
    selectedCURRENCY.push(item.CURRENCY);
    });
    setSearchData((prev) => {
        return {
          ...prev,
          CURRENCY: selectedCURRENCY,
        };
      });
  }else {
      setSearchData((prev) => {
      return {
        ...prev,
        CURRENCY:[],
      };
      });
  }
  console.log("item",itemData)
}
console.log("currrrr",searchData["CURRENCY"]);
const searchPanel = () => (
  <Box
    sx={{ width: 350, marginTop: '80px'}}
    role="presentation"
    component="form"
    onSubmit={handleSubmit}
  > <Grid item xs={12} sx={{display:'flex', justifyContent:'center', marginTop: '15px'}}>
         <Stack spacing={2} sx={{ width: 250 }}>
         
            <TextField
              className={GlAccountClasses.textField}              
              margin="normal"
              size="small"
              variant="standard" 
              name="PRIMARY_ACCOUNT"
              label="PRIMARY_ACCOUNT"
              type="text"
              sx={{ width: 250 }}
              onChange={onChange}
              value={searchData.PRIMARY_ACCOUNT}
            />
            
            
        <Select
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                 getOptionLabel={option =>
                  `${option.CURRENCY.toString()}`}
                getOptionValue={option => option.CURRENCY}
                options={itemData}
                isSearchable={true}
                onChange={handleCURRENCY}
                placeholder={"CURRENCY"}
                styles={styleSelect}
                components={animatedComponents}
                value={itemData.filter(obj => searchData?.CURRENCY.includes(obj.CURRENCY))}
                isMulti
                />
            
            <div>
            <Button
              className={GlAccountClasses.textField}
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
    <Box className={GlAccountClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={GlAccountClasses.boxDiv}>
            <div className={GlAccountClasses.uploaddiv}>
              <h4>GLAccount Data</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
        <Box display="flex"
              justifyContent="flex-end"
              alignItems="flex-end" className={GlAccountClasses.boxDiv}>
            <div className={GlAccountClasses.uploaddiv}>
              {(Object.keys(updateRow).length > 0) && 
            <Button variant="contained" sx={{marginTop: '15px'}} onClick={handleClickOpen} startIcon={<SendIcon />}>
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
        />
      )}

      <div>
                  <Dialog
                      fullScreen={fullScreen}
                      open={open}
                      onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                    className={GlAccountClasses.popUp}
                      PaperProps={{
                      style: {
                      backgroundColor: '#D3D3D3',
                      borderRadius: '20px',
                      },
                      }}
                    >
                      <DialogTitle id="responsive-dialog-title">
                      {"Do you want to update this Account!"}
                  </DialogTitle>
                    <DialogContent>                    
                    </DialogContent>
                  <DialogActions>
                    <Button autoFocus onClick={handleCancel}>
                      NO
                      </Button>
                      <Button onClick={SubmitList} autoFocus>
                        YES
                      </Button>
                  </DialogActions>
                    </Dialog>
                </div>
                {/* <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError || isSuccess} autoHideDuration={3000} onClose={handleMsgClose} sx={{height: "100%"
            }} anchorOrigin={{
          vertical: "top",
          horizontal: "center"          
        }}>
      
          <Alert
            onClose={handleMsgClose}
            severity={GlAccountData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          { GlAccountData?.message}
          </Alert>
          </Snackbar>
      </Stack> */}
    </Box>
  );
};

export default GlAccount;
