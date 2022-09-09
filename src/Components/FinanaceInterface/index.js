import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/indexFI";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { getFinanceInterfaceRequest } from "../../Redux/Action/financeInterface";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import RefreshIcon from '@mui/icons-material/Refresh';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
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
 
});

// const initialsearch = {
//   HIER1: [],
//   HIER2: [],
//   HIER3: [],
//   ITEM: [],
//   LOCATION: [],
// }

// const initialItemData = {
//   HIER1: "",
//   HIER2: "",
//   HIER3: "",
//   ITEM: ""
// }


const CostChange = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const FinanceInterfaceClasses = useStyles();
  const FinanceInterfaceData = useSelector(
    (state) => state.FinanceInterfaceReducers
  );
  // console.log("128",FinanceInterfaceData);
  const dispatch = useDispatch();



  const serializedata = (datatable) => {
     //console.log("dt",datatable)
     //console.log("ad",allData)
    
     let newTabledata = [];
     if(datatable.length > 0){
       datatable.map( item => {
           const reorder = {
          'SET_OF_BOOKS_ID' :null,
          'ACCOUNTING_DATE' :"", 
          'CURRENCY' :"", 
          'TRN_DATE' :"", 
          'EXCHANGE_RATE' :null,
          'DEBIT_AMOUNT' :null, 
          'CREDIT_AMOUNT' :null, 
          'REF_NO_1' :null,
          'REF_NO_2' :null,
          'REF_NO_3' :null, 
          'REF_NO_4' :null,
          'PRIMARY_ACCOUNT' :null,
          'PRIMARY_CURR_CODE' :"", 
          'PRIMARY_DEBIT_AMT' :null, 
          'PRIMARY_CREDIT_AMT' :null,

           }
                  
             let test = Object.assign(reorder,item);
             newTabledata.push(test); 
         
     })
     return newTabledata;
   } 
   setLoading(true);
   }

  useEffect(() => {
    if (inputValue && freeze === false) {
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
    if (FinanceInterfaceData.isError) {
      //console.log("hello",FinanceInterfaceData["messgae"])

      setIsError(true);
      swal(
        <div>     
          <p>{FinanceInterfaceClasses["messgae"]}</p>
        </div>
      )
      FinanceInterfaceData.isError=false;
    }else if(FinanceInterfaceData.isSuccess){
     
      setIsSuccess(true);
      swal(
        <div>     
           <p>{FinanceInterfaceClasses["messgae"]}</p>
        </div>
      )
    }else {
      //console.log("hello1",FinanceInterfaceData)
      setIsError(false)
      setTabledata("")
    }
  }, [FinanceInterfaceData])

  useEffect(() => { 
    if(isSubmit){
      setTimeout(() => {
       // console.log("194 SD", searchData)
        dispatch(getFinanceInterfaceRequest()) 
      },1000)
    }
},[isSubmit]);

useEffect(() => {
  if(isSearch){
    dispatch(getFinanceInterfaceRequest()) 
  }
},[isSearch])



  useEffect(() => {
        if(FinanceInterfaceData?.data?.Data && Array.isArray(FinanceInterfaceData?.data?.Data)){
          //console.log("rtd",FinanceInterfaceData)
          setTabledata(serializedata(FinanceInterfaceData?.data?.Data));
          setAllData(serializedata(FinanceInterfaceData?.data?.Data));
          setLoading(false);
          setSubmit(false);
          setSearch(false);
          //console.log("rtd",FinanceInterfaceData)
          //console.log("rt",allData)
        }
      
        else {
          setSearch(false)
        }
        
  },[FinanceInterfaceData?.data])

  console.log("infilter:",inputValue)
  console.log("tabledata:",tabledata)
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log("filter:",value)
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

const handleSubmit = (event) => {

  event.preventDefault();
    setSearch(true);
    setState({ ...state, 'right': open });
}


const handleMsgClose = () => {
  setIsError(false)
  setIsSuccess(false)
}
const handleSearchColumn = (e) => {
  //console.log("Handle Search Column",e);

  console.log(inputValue);
  setFreeze(true);

}
// const selectError = (event, value) => {
//   let selectedError = [];
//   if(value.length > 0){
//     value.map(
//       (item) => {
//           selectedError.push(item);
//       }
//     )
//     setSearchData((prev) => {
//       return {
//         ...prev,
//         ERR_MSG : selectedError
//       };
//     });
//   }else{
//     setSearchData((prev) => {
//       return {
//         ...prev,
//         ERR_MSG : []
//       };
//     });
//   }
// }


  return (
    <Box className={FinanceInterfaceClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={FinanceInterfaceClasses.boxDiv}>
            <div className={FinanceInterfaceClasses.uploaddiv}>
              <h4>Finance Interface</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
        <Box display="flex"
              justifyContent="flex-end"
              alignItems="flex-end" className={FinanceInterfaceClasses.boxDiv}>
            <div className={FinanceInterfaceClasses.uploaddiv}>
              

          <Button variant="contained" sx={{ marginTop: '15px', textAlign:'right' }} onClick={handleSubmit} startIcon={<RefreshIcon />}>Refresh</Button>
          
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
          handleSearchClick={handleSearchColumn}
          //handleCopyDown={handleCopyDown}
          freeze={freeze}
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

      {/* <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError || isSuccess} autoHideDuration={3000} onClose={handleMsgClose} sx={{height: "100%"
            }} anchorOrigin={{
          vertical: "top",
          horizontal: "center"          
        }}>
      
          <Alert
            onClose={handleMsgClose}
            severity={FinanceInterfaceData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          { FinanceInterfaceData?.message}
          </Alert>
          </Snackbar>
      </Stack> */}
    </Box>
  );
};

export default CostChange;
