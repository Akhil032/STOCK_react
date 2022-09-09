import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "../Table/indexglaccount";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import Autocomplete from "@mui/material/Autocomplete";
import IconButton from "@mui/material/IconButton";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import {
  getGlAccountRequest,
  postGlAccountRequest,
  getGlcurrencyRequest,
} from "../../Redux/Action/glaccount";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import SendIcon from "@mui/icons-material/Send";
//import { trnType } from "./transType.js";
//import { errorList } from "./errorType.js";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import swal from '@sweetalert/with-react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
//import "./index.css";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
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

const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 0px)",
    "& table": {
      "& tr": {
        "& td:nth-child(28)": {
          display: "none",
        },
        "& td:nth-child(29)": {
          display: "none",
        },
        "& td:nth-child(30)": {
          display: "none",
        },
      },
    },
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
  textField: {
    marginRight: "10px !important",
  },
  dateField: {
    "& .MuiInput-input": {
      color: "rgba(102,102,102,1)",
    },
  },
  popUp: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    padding: "20px 20px 20px 20px",
  },
});

const initialsearch = {
  PRIMARY_ACCOUNT: "",
  CURRENCY:"",
};

const initialItemData = {
  PRIMARY_ACCOUNT: "",
  CURRENCY:"",
};

const GlAccount = () => {
  const [inputCurr, setInputCurr] = useState("");
  const [load, setLoad] = useState(0);
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] = useState([]);
  const [itemData, setItemData] = useState([{}]);
  const [origItemData, setOrigItemData] = useState({});
  const [filterClass, setFilterClass] = useState([]);
  const [subfilterClass, setsubFilterClass] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  //const [locationData, setLocationData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [valCurr,setValCurr]=useState([]);
  const [freeze, setFreeze] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
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
  console.log(GlAccountData?.data?.Data);
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  const serializedata = (datatable) => {
    let newTabledata = [];
    if (datatable.length > 0) {
      datatable.map((item) => {
        const reorder = {
          PRIMARY_ACCOUNT: null,
          SET_OF_BOOKS_ID: null,
          SEGMENT1: null,
          SEGMENT2: null,
          SEGMENT3: null,
          SEGMENT4: null,
          SEGMENT5: null,
          SEGMENT6: null,
          SEGMENT7: null,
          CURRENCY: null,
          CREATE_ID: "",
          CREATE_DATETIME: "",
        };
        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      });
      return newTabledata;
    }
  };

  useEffect(() => {
    if (inputValue && freeze === false) {
      const filteredTable = tabledata.filter((props) =>
        Object.entries(inputValue).every(
          ([key, val]) =>
            !val.length ||
            props[key]
              ?.toString()
              .toLowerCase()
              .includes(val?.toString().toLowerCase())
        )
      );
      setTabledata(filteredTable);
    }
  }, [inputValue]);

  // useEffect(() => {
  //   if (GlAccountData.isError) {
  //     setIsError(true);
  //   } else if (GlAccountData.isSuccess) {
  //     setIsSuccess(true);
  //   } else {
  //     setIsError(false);
  //     setTabledata("");
  //   }
  // }, [GlAccountData]);

  useEffect(() => {
    if (GlAccountData.isError) {
        setIsError(true)
        swal(
          <div>     
            <p>{GlAccountData["message"]}</p>
          </div>
        )  
        GlAccountData.isError=false;
    }else if(GlAccountData.isSuccess){
      setIsSuccess(true);
      swal(
        <div>     
           <p>{GlAccountData["message"]}</p>
        </div>
      )
      setLoading(true);
    }else {
      setIsError(false)
      setTabledata("")
    }
  }, [GlAccountData])

  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
        dispatch(getGlAccountRequest([searchData]));
      }, 500);
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isSearch) {
      dispatch(getGlAccountRequest([searchData]));
    }
  }, [isSearch]);

  useEffect(() => {
    setLoading(true);
    dispatch(getGlcurrencyRequest([{}]));
  }, [""]);

  useEffect(() => {
    if (GlAccountData?.data?.Data && Array.isArray(GlAccountData?.data?.Data)) {
      if (load===0){
        setTabledata(serializedata(GlAccountData?.data?.Data));
        setAllData(serializedata(GlAccountData?.data?.Data));
      }
      setLoading(false);
      setSubmit(false);
      setSearch(false);
      setLoad(0);
    } else if(GlAccountData?.data?.CURRENCYDATA && Array.isArray(GlAccountData?.data?.CURRENCYDATA)){
      setItemData(GlAccountData?.data?.CURRENCYDATA);
      setOrigItemData(GlAccountData?.data?.CURRENCYDATA);
      setLoading(false);
    } else {
      setSearch(false);
    }
  }, [GlAccountData?.data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value == "") {
      setInputValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
      setTabledata(allData);
    } else {
      setInputValue((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };
console.log("test",tabledata)
  const confirmSubmit = () => {
    setOpen(true);
  };

  const SubmitList = () => {
    console.log(updateRow);
    if (Object.keys(updateRow).length > 0) {
      let sendRow = Object.values(updateRow);
      sendRow.map((item) => {
        item['CREATE_ID'] = JSON.parse(localStorage.getItem("userData"))?.username;
      });
      console.log("admin",sendRow);
      setLoading(true);
      dispatch(postGlAccountRequest(Object.values(updateRow)));
      setSearchData(initialsearch);
      setFilterClass([]);
      setsubFilterClass([]);
      setFilterItem([]);
      setSubmit(true);
      seteditRows([]);
      setOpen(false);
    }else{
      setOpen(true)
    }
  };
  const handleSubmit = (event) => {
    var check=0;
  if( inputCurr.length>0){
    for(var i = 0; i < itemData.length; i++) {
      check=1
      if ((itemData[i].CURRENCY).toUpperCase() === inputCurr.toUpperCase()) {
        selectCurrency(0,itemData[i])
          setInputCurr("");
          check=2;
          break;
      }
    } 
  }
  if (check===1){
    swal(
      <div>     
        <p>{"No Data Found"}</p>
      </div>
    )
    event.preventDefault();
    setState({ ...state, 'right': open });
    setLoad(1)
  }else{ 
      setLoad(0);
      event.preventDefault();
      setSearch(true);
      setState({ ...state, 'right': open });
    }
  
  };

  const onChange = (e) => {
    setSearchData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleMsgClose = () => {
  //   setIsError(false);
  //   setIsSuccess(false);
  // };

  const onReset = (event) => {
    initialsearch.PRIMARY_ACCOUNT = [];
    initialsearch.CURRENCY = [];
    console.log("datainitial", initialsearch);
    setInputCurr("");
    setSearchData(initialsearch);
    setFilterClass([]);
    setsubFilterClass([]);
    setFilterItem([]);
    setValCurr([]);
    console.log("data", searchData);
    setSearch(false);
    setTabledata("");
  };

  const handleSearchColumn = (e) => {
    //console.log("Handle Search Column",e);
  
    console.log(inputValue);
    setFreeze(true);
  
  }
  
  const handleCopyDown = (e) => {
    //console.log("Handle Copy Down",e);
    //console.log("EditR",editRows);
    //console.log("update",inputValue);
  
    // Filter object by single key
    // const test = Object.keys(inputValue).
    // filter((key) => key.includes(e)).
    // reduce((cur, key) => { return Object.assign(cur, { [key]: inputValue[key] })}, {});
  
    for(const key in inputValue){
        if(inputValue[key] === ''){
          delete inputValue[key];
          console.log("k",key);
        }
        if(inputValue.hasOwnProperty('PRIMARY_ACCOUNT')){
          delete inputValue['PRIMARY_ACCOUNT'];
        }
    }
    //console.log("inVal",inputValue);
    if(editRows.length > 0){
    const editData = tabledata.filter((item) => {
      return editRows.some((val) => {
        return item.PRIMARY_ACCOUNT === val;
      }); 
    });
    //console.log("tt",editData);
  
    const copyUpdate = editData.map(item => {
      Object.assign(item,inputValue);
       return item;
  })
  //console.log("updatedRecord",copyUpdate);
  setTabledata(copyUpdate);
  setUpdateRow(copyUpdate);
  seteditRows([]);
  setInputValue("");
    setFreeze(false);
  }else{
    setFreeze(false);
  }
  
  }



  const selectCurrency = (event, value) => {

    let selectedCurrency = [];
    if (value.option) {     
          valCurr.push(value.option)
          if ((value.option.CURRENCY).toUpperCase().includes(inputCurr.toUpperCase())){
            setInputCurr("");
          }
      }else if (value.removedValue) {
          let index = valCurr.indexOf(value.removedValue.CURRENCY);
          valCurr.splice(index,1);
      }else if(value.action==="clear"){ 
        valCurr.splice(0,valCurr.length);
      }
      if(event===0){
        valCurr.push(value)
      }
    if(valCurr.length > 0 && typeof valCurr[0]['CURRENCY'] !== "undefined"){
      valCurr.map(
        (item) => {
          selectedCurrency.push(item.CURRENCY);
        }
      )
      //console.log(value);
      setSearchData((prev) => {
        return {
          ...prev,
          CURRENCY : selectedCurrency,
        };
      });
    }else if(value.length > 0){
          //console.log(value);
          swal(
            <div>     
              <p>{"Please Choose valid CURRENCY"}</p>
            </div>
          )  
    }else {
      initialsearch.CURRENCY = "";
      setSearchData((prev) => {
        return {
          ...prev,
          CURRENCY : [],
        };
      });
    }
   }

   
  let UniqDept =
    itemData.length > 0
      ? [...new Map(itemData.map((item) => [item["HIER1"], item])).values()]
      : [];

  const handleCancel = () => {
    setOpen(false);
  };

  const searchPanel = () => (
    <Box
      sx={{ width: 350, marginTop: "80px" }}
      role="presentation"
      component="form"
      onSubmit={handleSubmit}
    >
      {" "}
      <Grid
        item
        xs={12}
        sx={{ display: "flex", justifyContent: "center", marginTop: "15px" }}
      >
        <Stack spacing={2} sx={{ width: 250 }}>
          {/* <Autocomplete
              multiple
              size="small"
              id="combo-box-dept"
              options={itemData}
              //value={(searchData?.HIER1.length > 0)?searchData?.HIER1:[]}
              sx={{ width: 250 }}
              onChange={selectDept} 
              renderInput={(params) => <TextField {...params} label="HIER1" variant="standard" />}
            />
           
            <Autocomplete
              multiple
              size="small"
              id="combo-box-class"
              options={(filterClass.length > 0)?filterClass:[]}
             // value={(searchData?.HIER2.length > 0)?searchData?.HIER2:[]}
              sx={{ width: 250 }}
              onChange={selectClass} 
              renderInput={(params) => <TextField {...params} label="HIER2" variant="standard" />}
            />
         
            <Autocomplete
              multiple
              size="small"
              id="combo-box-subclass"
              options={(subfilterClass.length > 0)?subfilterClass:[]}
             // value={(searchData?.HIER3.length > 0)?searchData?.HIER3:[]}
              sx={{ width: 250 }}
              onChange={selectSubClass} 
              renderInput={(params) => <TextField {...params} label="HIER3" variant="standard" />}
            /> */}
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
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputCurr(value);
                }}
                inputValue={inputCurr}
                onChange={selectCurrency}
                placeholder={"Choose a Currency"}
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
              sx={{ width: "120px" }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            <Button
              variant="contained"
              sx={{ width: "120px" }}
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
  const handleClickOpen = () => setOpen(true);
  return (
    <Box className={GlAccountClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={GlAccountClasses.boxDiv}>
            <div className={GlAccountClasses.uploaddiv}>
              <h4>GL Account Data</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            className={GlAccountClasses.boxDiv}
          >
            <div className={GlAccountClasses.uploaddiv}>
              {Object.keys(updateRow).length > 0 && (
                <Button
                  variant="contained"
                  sx={{ marginTop: "15px" }}
                  onClick={handleClickOpen}
                  startIcon={<SendIcon />}
                >
                  Submit
                </Button>
              )}

              <Button
                disableRipple
                variant="contained"
                sx={{ marginTop: "15px", textAlign: "right" }}
                onClick={toggleDrawer("right", true)}
                startIcon={<SearchIcon />}
              >
                Search
              </Button>
              <Drawer
                anchor={"right"}
                open={state["right"]}
                onClose={toggleDrawer("right", false)}
                transitionDuration={700}
              >
                {searchPanel("right")}
              </Drawer>
            </div>
          </Box>
        </Grid>
      </Grid>

      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        tabledata && (
          <Table
            tableData={tabledata}
            //handleDelete={handleDelete}
            handleSearch={handleChange}
            handleSearchClick={handleSearchColumn}
          handleCopyDown={handleCopyDown}
            searchText={inputValue}
            handleEdit={true}
            editRows={editRows}
            seteditRows={seteditRows}
            setUpdateRow={setUpdateRow}
            headCells={headCells}
            setTabledata={setTabledata}
            allData={allData}
            freeze={freeze}
            pageName="gl_account"
          />
        )
      )}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          className={GlAccountData.popUp}
          PaperProps={{
            style: {
              backgroundColor: "#D3D3D3",
              borderRadius: "10px",
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

export default GlAccount;
