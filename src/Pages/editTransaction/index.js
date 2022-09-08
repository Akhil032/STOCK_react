import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Table from "../../Components/Table/index";
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
  getTransactionReversalRequest,
  postTransactionReversalRequest,
  getClassDataRequest,
  getLocationDataRequest,
} from "../../Redux/Action/transactionReversal";
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
import TrnTypeList from "../../Components/TRNTYPE";
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
        "& td:nth-child(30)": {
          display: "none",
        },
        "& td:nth-child(31)": {
          display: "none",
        },
        "& td:nth-child(32)": {
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
  HIER1: [],
  HIER2: [],
  HIER3: [],
  ITEM: [],
  LOCATION: [],
  TRN_TYPE: [],
  AREF: [],
  TRN_NAME:[],
  CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
  TRN_DATE: "",
};

const initialItemData = {
  HIER1: "",
  HIER2: "",
  HIER3: "",
  ITEM: "",
};


const EditTransaction = () => {
  const [input, setInput] = useState("");
  const [inputH2, setInputH2] = useState("");
  const [inputH3, setInputH3] = useState("");
  const [inputItem, setInputItem] = useState("");
  const [inputLoc, setInputLoc] = useState("");
  const [inputTrn,setInputTrn] = useState("");
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] = useState([]);
  const [itemData, setItemData] = useState(initialItemData);
  const [origItemData, setOrigItemData] = useState({});
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
  const [valH1,setValH1]=useState([]);
  const [valH2,setValH2]=useState([]);
  const [valH3,setValH3]=useState([]);
  const [valItem,setValItem]=useState([]);
  const [valLoc,setValLoc]=useState([]);
  const [valTrnType,setValTrnType]=useState([]);
  const [freeze, setFreeze] = useState(false);
  const [load, setLoad] = useState(0);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const editTransactionClasses = useStyles();
  const editTransactionData = useSelector(
    (state) => state.TransactionReversalReducers
  );
  //console.log(editTransactionData?.data?.Data);
  const dispatch = useDispatch();

  var trnTypeValue = TrnTypeList();

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
          ITEM: null,
          ITEM_DESC: null,
          HIER1: null,
          HIER1_DESC: null,
          HIER2: null,
          HIER2_DESC: null,
          HIER3: null,
          HIER3_DESC: null,
          LOCATION_TYPE: null,
          LOCATION: null,
          LOCATION_NAME: "",
          TRN_DATE: "",
          TRN_NAME: "",
          TRN_TYPE: "",
          QTY: "",
          UNIT_COST: "",
          UNIT_RETAIL: "",
          TOTAL_COST: "",
          TOTAL_RETAIL: "",
          REF_NO1: "",
          REF_NO2: "",
          REF_NO3: "",
          REF_NO4: "",
          CURRENCY: "",
          CREATE_ID: "",
          TRAN_SEQ_NO: null,
          AREF: null,
        };
        parseFloat(item.LOCATION?.toFixed(1));
        delete item?.PROCESS_IND;
        delete item?.SELLING_UOM;
        delete item?.TRN_POST_DATE;
        delete item?.REF_ITEM;
        delete item?.REF_ITEM_TYPE;
        delete item?.PACK_QTY;
        delete item?.PACK_COST;
        delete item?.PACK_RETAIL;
        //delete item?.CREATE_ID;
        delete item?.CREATE_DATETIME;
        delete item?.REV_NO;
        delete item?.REV_TRN_NO;
        delete item?.ARCHIEVE_DATETIME;
        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      });
      return newTabledata;
    }
  };

  useEffect(() => {
    if (inputValue  && freeze === false) {
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
  //   if (editTransactionData.isError) {
  //     setIsError(true);
  //   } else if (editTransactionData.isSuccess) {
  //     setIsSuccess(true);
  //   } else {
  //     setIsError(false);
  //     setTabledata("");
  //   }
  // }, [editTransactionData]);

  useEffect(() => {
    if (editTransactionData.isError) {
        setIsError(true)
        swal(
          <div>     
            <p>{editTransactionData["messgae"]}</p>
          </div>
        )  
    }else if(editTransactionData.isSuccess){
      setIsSuccess(true);
      swal(
        <div>     
           <p>{editTransactionData["messgae"]}</p>
        </div>
      )
      setLoading(true);
    }else {
      setIsError(false)
      setTabledata("")
    }
  }, [editTransactionData])

  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
        dispatch(getTransactionReversalRequest([searchData]));
      }, 500);
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isSearch) {
      dispatch(getTransactionReversalRequest([searchData]));
    }
  }, [isSearch]);

  useEffect(() => {
    setLoading(true);
    dispatch(getClassDataRequest([{}]));
    dispatch(getLocationDataRequest([{}]));
  }, [""]);

  useEffect(() => {
    if (editTransactionData?.data?.Data && Array.isArray(editTransactionData?.data?.Data)) {
      if (load===0){
        setTabledata(serializedata(editTransactionData?.data?.Data));
        setAllData(serializedata(editTransactionData?.data?.Data))
      }
      setLoading(false);
      setSubmit(false);
      setSearch(false);
      setLoad(0);
    } else if (
      editTransactionData?.data?.itemData &&
      Array.isArray(editTransactionData?.data?.itemData)
    ) {
      setItemData(editTransactionData?.data?.itemData);
      setOrigItemData(editTransactionData?.data?.itemData);
      setLoading(false);
    } else if (
      editTransactionData?.data?.locationData &&
      Array.isArray(editTransactionData?.data?.locationData)
    ) {
      setLocationData(editTransactionData?.data?.locationData);
      setLoading(false);
    } else {
      setSearch(false);
    }
  }, [editTransactionData?.data]);

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
//console.log("test",tabledata)
  const confirmSubmit = () => {
    setOpen(true);
  };

  const SubmitList = () => {
    //console.log(updateRow);
    if (Object.keys(updateRow).length > 0) {
      let sendRow = Object.values(updateRow);
      sendRow.map((item) => {
        delete item?.ITEM_DESC;
        delete item?.HIER1_DESC;
        delete item?.HIER2_DESC;
        delete item?.HIER3_DESC;
        delete item?.TRN_NAME;
        delete item?.LOCATION_NAME;
        delete item?.undefined;
        item['CREATE_ID'] = JSON.parse(localStorage.getItem("userData"))?.username;
      });
      //console.log("admin",sendRow);
      setLoading(true);
      dispatch(postTransactionReversalRequest(sendRow));
      initialsearch.HIER1 = [];
      initialsearch.HIER2 = [];
      initialsearch.HIER3 = [];
      initialsearch.ITEM = [];
      initialsearch.LOCATION = [];
      initialsearch.TRN_TYPE = [];
      initialsearch.TRN_DATE = [];
      initialsearch.TRN_NAME = [];
      initialsearch.AREF = [];
      initialsearch.CREATE_ID = [];
      if((searchData).length===0){
        setSearchData(initialsearch);
    }
      setFilterClass([]);
      setsubFilterClass([]);
      setFilterItem([]);
      setSubmit(true);
      seteditRows([]);
      setOpen(false);
    }
  };
const handleSubmit = (event) => {
  var check=0;
  if( input.length>0){
    for(var i = 0; i < UniqDept.length; i++) {
      check=1
      if ((UniqDept[i].HIER1).toUpperCase() === input.toUpperCase()) {
          handleHier1(0,UniqDept[i])
          setInput("");
          check=2;
          break;
      }
    } 
  }if ( inputH2.length>0 && (check===0 || check===2)){
    if(filterClass.length>0){      
      for(var i = 0; i < filterClass.length; i++) {      
        if ((filterClass[i].HIER2).toUpperCase() === inputH2.toUpperCase()) {
            handleHier2(0,filterClass[i])
            setInputH2("");
            check=2;
            break;
        }
        else{
          check=1
        }
      }
    }
    else{
      check=1
    }
  }if ( inputH3.length>0 && (check===0 || check===2)){
    if(subfilterClass.length>0){      
      for(var i = 0; i < subfilterClass.length; i++) {      
        if ((subfilterClass[i].HIER3).toUpperCase() === inputH3.toUpperCase()) {
            handleHier3(0,subfilterClass[i]);
            setInputH3("");
            check=2;
            break;
        }
        else{
          check=1;
        }
      }
    }
    else{
      check=1
    }
  }if ( inputItem.length>0 && (check===0 || check===2)){
    if(filterItem.length>0){      
      for(var i = 0; i < filterItem.length; i++) {      
        if ((filterItem[i].ITEM).toUpperCase() === inputItem.toUpperCase()) {
            handleItem(0,filterItem[i]);
            setInputItem("");
            check=2;
            break;
        }
        else{
          check=1;
        }
      }
    }
    else{
      check=1
    }
  }if ( inputLoc.length>0 && (check===0 || check===2)){
    if(locationData.length>0){      
      for(var i = 0; i < locationData.length; i++) {  
        if (locationData[i].LOCATION=== parseInt(inputLoc)) {
            selectLocation(0,locationData[i]);
            setInputLoc("");
            check=2;
            break;
        }else{
          check=1; }
      }
    }
    else{
      check=1;
    }
  }if ( inputTrn.length>0 && (check===0 || check===2)){
    console.log("inputTrn",inputTrn)
    if(trnTypeValue.length>0){      
      for(var i = 0; i < trnTypeValue.length; i++) {  
        if (trnTypeValue[i].TRN_NAME.toUpperCase()=== inputTrn.toUpperCase()) {
           // selectLocation(0,locationData[i]);
           console.log("inputTrn4343",trnTypeValue[i].TRN_NAME)
           selectTrantype(0,trnTypeValue[i])
            // searchData.TRN_NAME.push(trnTypeValue[i].TRN_NAME)
            // searchData.TRN_TYPE=trnTypeValue[i].TRN_TYPE
            // searchData.AREF=trnTypeValue[i].AREF
            setInputTrn("");
            check=2;
            break;
        }else{
          check=1; }
      }
    }
    else{
      check=1;
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
        if(inputValue.hasOwnProperty('TRAN_SEQ_NO')){
          delete inputValue['TRAN_SEQ_NO'];
        }
    }
    //console.log("inVal",inputValue);
    if(editRows.length > 0){
    const editData = tabledata.filter((item) => {
      return editRows.some((val) => {
        return item.TRAN_SEQ_NO === val;
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


  // const handleMsgClose = () => {
  //   setIsError(false);
  //   setIsSuccess(false);
  // };
  const currentDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    return yyyy + '-' + mm + '-' + dd;
  }

  const onReset = (event) => {
    initialsearch.HIER1 = [];
    initialsearch.HIER2 = [];
    initialsearch.HIER3 = [];
    initialsearch.ITEM = [];
    initialsearch.LOCATION = [];
    initialsearch.TRN_TYPE = [];
    initialsearch.TRN_NAME = [];
    initialsearch.TRN_DATE = [];
    initialsearch.AREF = [];
    initialsearch.CREATE_ID = [];
    //console.log("datainitial", initialsearch);
    setSearchData(initialsearch);
    setLoad(0);
    setInput("");
    setInputH2("");
    setInputH3("");
    setInputItem("");
    setInputLoc("");
    setInputTrn("");
    setValH1([]);
    setValH2([]);
    setValH3([]);
    setValLoc([]);
    setValItem([]);
    setValTrnType([]);
    setFilterClass([]);
    setsubFilterClass([]);
    setFilterItem([]);

    //console.log("data", searchData);
    setSearch(false);
    setTabledata("");
  };

  const handleHier1=(e,value) =>
  {
    let selectedDept = [];
    if (value.option) {     
        valH1.push(value.option)
        // if (value.option.HIER1===input){ 
        //   setInput("");
        // }
        if ((value.option.HIER1).includes(input)){
          setInput("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valH1.length;i++)
      {
        if(valH1[i]["HIER1"]===value.removedValue.HIER1){
          index=i;
          break;
        }
      }
     valH1.splice(index,1);
    }else if(value.action==="clear"){ 
        valH1.splice(0,valH1.length);
    }
//manual input handle input and filter itemdata
  if(e===0){
    valH1.push(value);}
  //Filtering HIER2 based on HIER1
 if (valH1.length >0) {
      const filterClass = itemData.filter((item) => {      
        return (valH1).some((val) => {
          return item.HIER1 === val.HIER1;
        });     
      });
      let UniqClass =
          filterClass.length > 0
            ? [
                ...new Map(
                  filterClass.map((item) => [item["HIER2"], item])
                ).values(),
              ]
            : []; 
            setFilterClass(UniqClass);
            valH1.map((item) => {
              selectedDept.push(item.HIER1);
            });
            setSearchData((prev) => {
              return {
                ...prev,
                HIER1: selectedDept,
              };
              
            });     
      if(value.removedValue){
        handleHier2("Filter",UniqClass)
      }
    }else {
      setFilterClass([])
      setsubFilterClass([]);
      setFilterItem([]);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER1: []
        };
      });
    }
}
const handleHier2=(e,value) =>
  {
    if (e==="Filter"){
       valH2.splice(0,valH2.length);
       valH2.push(...value);
    }
    let selectedHier2 = [];
    if (value){
      if (value.option) {
        valH2.push(value.option)
        if ((value.option.HIER2).includes(inputH2)){
          setInputH2("");
        } 
      }else if (value.removedValue) {
        let index=0        
        for(var i=0;i<valH2.length;i++)
        {
          if(valH2[i]["HIER2"]===value.removedValue.HIER2){
            index=i;
            break;
          }
        }
       valH2.splice(index,1);
     
    
      }else if(value.action==="clear"){      
        valH2.splice(0,valH2.length);
      }
    }
//manual input handle input and filter itemdata
  if(e===0){
    valH2.push(value);   
  }
  console.log("filter",valH2)
//Filtering HIER2 based on HIER1
  if (valH2.length >0) {
    console.log(1232)
    const filterSubClass = itemData.filter((item) => {      
      return (valH2).some((val) => {
        return item.HIER2 === val.HIER2;
      });     
    });
    let UniqClass =
    filterSubClass.length > 0
          ? [
              ...new Map(
                filterSubClass.map((item) => [item["HIER3"], item])
              ).values(),
            ]
          : []; 
          setsubFilterClass(UniqClass);
          valH2.map((item) => {
            selectedHier2.push(item.HIER2);
          });
          setSearchData((prev) => {
            return {
              ...prev,
              HIER2: selectedHier2,
            };
          });    
          if(e==="Filter" ||value.removedValue) {
            handleHier3("Filter",UniqClass)
          }    
    }else {
      setsubFilterClass([]);
      setFilterItem([]);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER2: []
        };
      });
  }
}
const handleHier3=(e,value) =>
  {
    if (e==="Filter"){
      valH3.splice(0,valH3.length);
      valH3.push(...value);
   }

    let selectedHier3 = [];
    if (value.option) {
      valH3.push(value.option)
      if ((value.option.HIER3).includes(inputH3)){
        setInputH3("");
      } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valH3.length;i++)
      {
        if(valH3[i]["HIER3"]===value.removedValue.HIER3){
          index=i;
          break;
        }
      }
      valH3.splice(index,1);
    
    }else if(value.action==="clear"){      
      valH3.splice(0,valH3.length);
    }
//manual input handle input and filter itemdata
if(e===0){
  valH3.push(value)
}
//Filtering HIER3 based on HIER2
    if (valH3.length >0) {
      const filterItem = itemData.filter((item) => {      
        return (valH3).some((val) => {
          return item.HIER3 === val.HIER3;
        });     
      }); 
      setFilterItem(filterItem);
            valH3.map((item) => {
              selectedHier3.push(item.HIER3);
            });
            setSearchData((prev) => {
              return {
                ...prev,
                HIER3: selectedHier3,
              };
            });            
      }else {
        setFilterItem([]);
        setSearchData((prev) => {
          return {
            ...prev,
            HIER3: []
          };
        });
      }
}
const handleItem=(e,value) =>
  {
    let selectedItem = [];
    if (value.option) {
      valItem.push(value.option)
      if ((value.option.ITEM).includes(inputItem)){
        setInputItem("");
      } 
  }else if (value.removedValue) {
    let index=0        
    for(var i=0;i<valItem.length;i++)
    {
      if(valItem[i]["ITEM"]===value.removedValue.ITEM){
        index=i;
        break;
      }
    }
    valItem.splice(index,1);
   
  }else if(value.action==="clear"){      
    valItem.splice(0,valItem.length);
   }
   //manual input handle input and filter itemdata
  if(e===0){
    valItem.push(value);
  }
//Filtering ITEM based on HIER3
if (valItem.length >0) {
  
        valItem.map((item) => {
          selectedItem.push(item.ITEM);
        });
        setSearchData((prev) => {
          return {
            ...prev,
            ITEM: selectedItem,
          };
        });        
}else {
  setSearchData((prev) => {
    return {
      ...prev,
      ITEM: selectedItem,
    };
  });
}
}
const selectLocation = (event, value) => {
  let selectedLocation = [];
  if (value.option) {     
        valLoc.push(value.option);
        // if (value.option.LOCATION===parseInt(inputLoc)){ 
        //   console.log(1234)
        //   setInputLoc("");
        // }
        if (String(value.option.LOCATION).includes(inputLoc)){
          setInputLoc("");
        } 
    }else if (value.removedValue) {
      let index=0        
      for(var i=0;i<valLoc.length;i++)
      {
        if(valLoc[i]["LOCATION"]===value.removedValue.LOCATION){
          index=i;
          break;
        }
      }
      valLoc.splice(index,1);
    }else if(value.action==="clear"){ 
      valLoc.splice(0,valLoc.length);
    }
    if(event===0){
      valLoc.push(value)
    }
  if(valLoc.length > 0 && typeof valLoc[0]['LOCATION'] !== "undefined"){
    valLoc.map(
      (item) => {
        selectedLocation.push(item.LOCATION);
      }
    )
    setSearchData((prev) => {
      return {
        ...prev,
        LOCATION : selectedLocation,
      };
    });
  }else if(value.length > 0){
        swal(
          <div>     
            <p>{"Please Choose valid LOCATION"}</p>
          </div>
        )  
  }else {
    initialsearch.LOCATION = "";
    setSearchData((prev) => {
      return {
        ...prev,
        LOCATION : [],
      };
    });
  }
 }


 const selectTrantype=(e,value) =>{
  let selectedTrantype = [];
  let selectedAref = [];
  let selectedTranName=[]
  if (value.option) {
    valTrnType.push(value.option)
    if ((value.option.TRN_NAME).toUpperCase().includes(inputTrn.toUpperCase())){
      setInputTrn("");
    } 
  }else if (value.removedValue) {
    let index=0;      
    for(var i=0;i<valTrnType.length;i++) {
      if(valTrnType[i]["TRN_TYPE"]===value.removedValue.TRN_TYPE && valTrnType[i]["AREF"]===value.removedValue.AREF ){
        index=i;        
        break;
      }
    }
    valTrnType.splice(index,1);
  }else if(value.action==="clear"){
    valTrnType.splice(0,valTrnType.length);
  }

  if(e===0){
    valTrnType.push(value)
  }

  if (valTrnType.length >0) {
    valTrnType.map((item) => {
      selectedTrantype.push(item.TRN_TYPE);
      selectedAref.push(item.AREF)
      selectedTranName.push(item.TRN_NAME)
    });
    setSearchData((prev) => {
        return {
          ...prev,
          TRN_TYPE: selectedTrantype,
          AREF:selectedAref,
          TRN_NAME:selectedTranName,
        };
      });
  }else {
      setSearchData((prev) => {
      return {
        ...prev,
        TRN_TYPE : [],
        AREF: [],
        TRN_NAME:[],
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
          <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
                getOptionValue={option => option.HIER1}
                options={UniqDept.length > 0 ? UniqDept : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  // only set the input when the action that caused the
                  // change equals to "input-change" and ignore the other
                  // ones like: "set-value", "input-blur", and "menu-close"
                  if (action.action === "input-change") setInput(value); // <---
                }}
                inputValue={input}
                onChange={handleHier1}
                placeholder={"Choose HIER1"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                isClearable={true}
               value={UniqDept.filter(obj => searchData?.HIER1.includes(obj.HIER1))} 
                />

        <Select 
          
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`}
                getOptionValue={option => option.HIER2}
                options={(filterClass.length > 0) ? filterClass : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputH2(value);
                }}
                inputValue={inputH2}
                onChange={handleHier2}
                placeholder={"Choose a HIER2"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                value={filterClass.filter(obj => searchData?.HIER2.includes(obj.HIER2))} 
                
                />

        <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`}
                getOptionValue={option => option.HIER2}
                options={(subfilterClass.length > 0) ? subfilterClass : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputH3(value);
                }}
                inputValue={inputH3}
                onChange={handleHier3}
                placeholder={"Choose a HIER3"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                value={subfilterClass.filter(obj => searchData?.HIER3.includes(obj.HIER3))} 
                />
              
          <Select 
               //disabled={filterItem.length > 0 ?false:true}
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.ITEM.toString()}`}
                getOptionValue={option => option.ITEM}
                options={(filterItem.length > 0) ? filterItem : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputItem(value);
                }}
                inputValue={inputItem}
                onChange={handleItem}
                placeholder={"Choose a ITEM"}
                styles={styleSelect}
                components={animatedComponents}  
                isMulti 
                value={filterItem.filter(obj => searchData?.ITEM.includes(obj.ITEM))} 
                isDisabled={filterItem.length > 0 ?false:true}
                />
          <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.LOCATION.toString()}-(${option.LOCATION_NAME.toString()})`}
                getOptionValue={option => option.LOCATION}
                options={locationData.length > 0 ? locationData : []}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputLoc(value);
                }}
                inputValue={inputLoc}
                onChange={selectLocation}
                placeholder={"Choose a Location"}
                styles={styleSelect}
                components={animatedComponents} 
                value={locationData.filter(obj => searchData?.LOCATION.includes(obj.LOCATION))}  
                isMulti 
                />

          <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                `${option.TRN_NAME.toString()}`}
                getOptionValue={option => option.TRN_NAME}
                options={trnTypeValue}
                isSearchable={true}
                onInputChange={(value, action) => {
                  if (action.action === "input-change") setInputTrn(value);
                }}
                inputValue={inputTrn}
                onChange={selectTrantype}
                placeholder={"Choose a Trn Type"}
                styles={styleSelect}
                components={animatedComponents} 
                value={trnTypeValue.filter(obj => searchData?.TRN_NAME.includes(obj.TRN_NAME))}
                isMulti 
                />
          <TextField
            className={editTransactionClasses.textField}
            //disabled
            margin="normal"
            size="small"
            variant="standard"
            name="CREATE_ID"
            label="USER"
            type="text"
            sx={{ width: 250 }}
            onChange={onChange}
            value={searchData.USER}
            //value={JSON.parse(localStorage.getItem("userData"))?.username}
          />
          <TextField
            className={editTransactionClasses.dateField}
            margin="normal"
            size="small"
            variant="standard"
            name="TRN_DATE"
            label="TRN DATE"
            type="date"
            inputProps={{ max: currentDate() }}
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
              className={editTransactionClasses.textField}
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

  return (
    <Box className={editTransactionClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={editTransactionClasses.boxDiv}>
            <div className={editTransactionClasses.uploaddiv}>
              <h4>Edit Transactions</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            className={editTransactionClasses.boxDiv}
          >
            <div className={editTransactionClasses.uploaddiv}>
              {Object.keys(updateRow).length > 0 && (
                <Button
                  variant="contained"
                  sx={{ marginTop: "15px" }}
                  onClick={confirmSubmit}
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
            handleSearchClick={handleSearchColumn}
          handleCopyDown={handleCopyDown}
            handleSearch={handleChange}
            searchText={inputValue}
            handleEdit={true}
            editRows={editRows}
            seteditRows={seteditRows}
            setUpdateRow={setUpdateRow}
            headCells={headCells}
            setTabledata={setTabledata}
            allData={allData}
            freeze={freeze}
            pageName="edit_Transaction"
          />
        )
      )}
      <div>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          className={editTransactionData.popUp}
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

export default EditTransaction;
