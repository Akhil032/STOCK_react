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
  CREATE_ID: JSON.parse(localStorage.getItem("userData"))?.username,
  TRN_DATE: "",
};

const initialItemData = {
  HIER1: "",
  HIER2: "",
  HIER3: "",
  ITEM: "",
};

const initialTRName={
  TRN_NAME:[]
}
const EditTransaction = () => {
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
      setTabledata(serializedata(editTransactionData?.data?.Data));
      setAllData(serializedata(editTransactionData?.data?.Data));
      setLoading(false);
      setSubmit(false);
      setSearch(false);
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
    event.preventDefault();
    setSearch(true);
    setState({ ...state, right: open });
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
    initialsearch.TRN_DATE = [];
    initialsearch.AREF = [];
    initialsearch.CREATE_ID = [];
    //console.log("datainitial", initialsearch);
    setSearchData(initialsearch);
    setValH1([]);
    setValH2([]);
    setValH3([]);
    setValLoc([]);
    setValItem([]);
    setValTrnType([]);
    initialTRName.TRN_NAME=[];
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
    }else if (value.removedValue) {
        let index = valH1.indexOf(value.removedValue.HIER1);
        valH1.splice(index,1);
    //}
    }else if(value.action==="clear"){ 
        valH1.splice(0,valH1.length);
    }
  //console.log("V1",valH1);
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
    }else {
      setFilterClass([])
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
    let selectedHier2 = [];
    if (value.option) {
      valH2.push(value.option)
    }else if (value.removedValue) {
        let index = valH2.indexOf(value.removedValue.HIER2);
        valH2.splice(index,1);
   
    }else if(value.action==="clear"){      
      valH2.splice(0,valH2.length);
    }
//Filtering HIER2 based on HIER1
  if (valH2.length >0) {
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
    }else {
      setsubFilterClass([]);
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
    let selectedHier3 = [];
    if (value.option) {
      valH3.push(value.option)
    }else if (value.removedValue) {
        let index = valH3.indexOf(value.removedValue.HIER3);
        valH3.splice(index,1);
    
    }else if(value.action==="clear"){      
      valH3.splice(0,valH3.length);
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
  }else if (value.removedValue) {
      let index = valItem.indexOf(value.removedValue.ITEM);
      valItem.splice(index,1);
   
  }else if(value.action==="clear"){      
    valItem.splice(0,valItem.length);
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
          valLoc.push(value.option)
      }else if (value.removedValue) {
          let index = valLoc.indexOf(value.removedValue.LOCATION);
          valLoc.splice(index,1);
      }else if(value.action==="clear"){ 
        valLoc.splice(0,valLoc.length);
      }
   
    if(valLoc.length > 0 && typeof valLoc[0]['LOCATION'] !== "undefined"){
      valLoc.map(
        (item) => {
          selectedLocation.push(item.LOCATION);
        }
      )
      //console.log(value);
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION : selectedLocation,
        };
      });
    }else if(value.length > 0){
          //console.log(value);
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
    }else if (value.removedValue) {
      let index=0;      
      for(var i=0;i<valTrnType.length;i++) {
        if(valTrnType[i]["TRN_TYPE"]===value.removedValue.TRN_TYPE && valTrnType[i]["AREF"]===value.removedValue.AREF ){
          index=i;        
          break;
        }
      }
      valTrnType.splice(index,1);
    }else if(value.action="clear"){
      valTrnType.splice(0,valTrnType.length);
    }
    if (valTrnType.length >0) {
      valTrnType.map((item) => {
        selectedTrantype.push(item.TRN_TYPE);
        selectedAref.push(item.AREF)
        selectedTranName.push(item.TRN_NAME)
      });
      initialTRName.TRN_NAME=(selectedTranName);
      setSearchData((prev) => {
          return {
            ...prev,
            TRN_TYPE: selectedTrantype,
            AREF:selectedAref
          };
        });
    }else {
        initialTRName.TRN_NAME=[];
        setSearchData((prev) => {
        return {
          ...prev,
          TRN_TYPE : [],
          AREF: []
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
          <Select 
                closeMenuOnSelect={true}
                className="basic-multi-select"
                classNamePrefix="select"
                getOptionLabel={option =>
                  `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`}
                getOptionValue={option => option.HIER1}
                options={UniqDept.length > 0 ? UniqDept : []}
                isSearchable={true}
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
                onChange={selectTrantype}
                placeholder={"Choose a Trn Type"}
                styles={styleSelect}
                components={animatedComponents} 
                value={trnTypeValue.filter(obj => initialTRName?.TRN_NAME.includes(obj.TRN_NAME))}  
                isMulti 
                />

          {/* <Autocomplete
            multiple
            disablePortal
            size="small"
            id="combo-box-err-type"
            //  value={(searchData?.ERR_MSG.length > 0)?searchData?.ERR_MSG:[]}
            options={errorList.length > 0 ? errorList : []}
            sx={{ width: 250 }}
            onChange={selectError}
            renderInput={(params) => (
              <TextField {...params} label="ERR MESSAGE" variant="standard" />
            )}
          /> */}
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
