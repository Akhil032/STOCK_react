import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import Table from "../../Components/Table/indexFI";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { makeStyles } from "@mui/styles";
import {getDailyViewRequest} from "../../Redux/Action/DailyView"
import CircularProgress from "@mui/material/CircularProgress";
//import { headCells } from "./tableHead";
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
          //   '& td:nth-child(28)':{
          //         display: 'none'
          //   },
          //   '& td:nth-child(29)':{
          //     display: 'none'
          //  },
          //  '& td:nth-child(30)':{
          //    display: 'none'
          // }
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
const headCells=[]
const DailyView = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] =  useState([]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmit, setSubmit] = useState(false);
  const [open, setOpen] = useState(false);
  const [freeze, setFreeze] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  
  var headColumns=[]

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const DailyViewClasses = useStyles();
  const DailyViewData = useSelector(
    (state) => state.DailyViewReducers
  );
  // console.log("128",DailyViewData);
  const dispatch = useDispatch();

  const serializedata = (datatable) => {
     //console.log("dt",datatable)
     headColumns=Object.keys(datatable[0])
     //console.log("columns",headColumns)
     let newTabledata = [];
     var headcell={id: '', 
           numeric: true, disablePadding: false, label: '', 
           width: '100%'}
           headCells.splice(0,headCells.length);     
     for(let i= 0; i< headColumns.length;i++)
           {
            headcell.id=headColumns[i];
            headcell.label=headColumns[i];
            console.log("headcell",JSON.stringify(headcell))
            //jString=(JSON.stringify(headcell)).replace("/","").replace('"id"',"id").replace('"numeric"',"numeric").replace('"disablePadding"',"disablePadding").replace('"label"',"label").replace('"width"',"width")
            headCells.push(JSON.parse(JSON.stringify(headcell)))
            console.log("column",headCells)
           }

     if(datatable.length > 0){
      
       datatable.map( item => {
           const reorder = {
            
           }
             let test = Object.assign(reorder,item);
             newTabledata.push(test); 
             console.log("tabledata",newTabledata)
          
     })
     return datatable;
   } 
   setLoading(true);
   }
   
  useEffect(() => {
    if (inputValue  && freeze === false) {
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
    if (DailyViewData.isError) {
      
      setIsError(true);
      swal(
        <div>     
          <p>{DailyViewData["message"]}</p>
        </div>
      )
      //DailyViewData.isError=false;
    }else if(DailyViewData.isSuccess){
     
      setIsSuccess(true);
      swal(
        <div>     
          <p>{DailyViewData["message"]}</p>
        </div>
      )
    }else {
      //console.log("hello1",DailyViewData)
      setIsError(false)
      setTabledata("")
    }
  }, [DailyViewData])

  useEffect(() => { 
    if(isSubmit){
      setTimeout(() => {
        // console.log("194 SD", searchData)
        dispatch(getDailyViewRequest()) 
      },1000)
    }
},[isSubmit]);

useEffect(() => {
  if(isSearch){
    dispatch(getDailyViewRequest()) 
  }
},[isSearch])

  useEffect(() => {
        if(DailyViewData?.data?.Data && Array.isArray(DailyViewData?.data?.Data)){
          //console.log("rtd",DailyViewData)
          setTabledata(serializedata(DailyViewData?.data?.Data));
          setAllData(serializedata(DailyViewData?.data?.Data));
          setLoading(false);
          setSubmit(false);
          setSearch(false);
          //console.log("rtd",DailyViewData)
          //console.log("rt",allData)
        }
      
        else {
          setSearch(false)
        }
        //console.log(tabledata)
  },[DailyViewData?.data])



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

const handleSubmit = (event) => {
  console.log(123)
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


  return (
    <Box className={DailyViewClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={DailyViewClasses.boxDiv}>
            <div className={DailyViewClasses.uploaddiv}>
              <h4>Stock Ledger View</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
        <Box display="flex"
              justifyContent="flex-end"
              alignItems="flex-end" className={DailyViewClasses.boxDiv}>
            <div className={DailyViewClasses.uploaddiv}>
              

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
        />
      )}
    </Box>
  );
};

export default DailyView;
