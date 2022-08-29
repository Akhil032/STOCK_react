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
    '& table': {
      '& tr': {
        '& td:nth-child(28)': {
          display: 'none'
        },
        '& td:nth-child(29)': {
          display: 'none'
        },
        '& td:nth-child(30)': {
          display: 'none'
        }
      }
    }
  }, boxDiv: {
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
  dateField: {
    '& .MuiInput-input': {
      color: "rgba(102,102,102,1)",
    }
  },
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
  const [valLoc, setValLoc] = useState([]);
  const [valH1,setValH1]=useState([]);
  const [valH2,setValH2]=useState([]);
  const [valH3,setValH3]=useState([]);
  const [valItem,setValItem]=useState([]);
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
  const dispatch = useDispatch();

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };
  const serializedata = (datatable) => {
    let newTabledata = [];
    if (datatable.length > 0) {
      datatable.map(item => {
        const reorder = {
          'ITEM': null,
          'ITEM_DESC': null,
          'LOCATION': null,
          'LOCATION_NAME': "",
          'ITEM_SOH': "",
          'UNIT_COST': "",
        }
        let test = Object.assign(reorder, item);
        newTabledata.push(test);
        // initialsearch.HIER1 = [];
        // initialsearch.HIER2 = [];
        // initialsearch.HIER3 = [];
        // initialsearch.ITEM = [];
        // initialsearch.LOCATION = [];
        // setSearchData(initialsearch)
      })
      return newTabledata;
    }
  }

  useEffect(() => {
    if (inputValue) {
      const filteredTable = tabledata.filter(props =>
        Object
          .entries(inputValue)
          .every(([key, val]) =>
            !val.length ||
            props[key]?.toString().toLowerCase().includes(val?.toString().toLowerCase()))
      )
      setTabledata(filteredTable);

    }
  }, [inputValue]);

  useEffect(() => {
    if (CostChangeData.isError) {
      if ((CostChangeData["message"]).length > 0 ) {
        setIsError(true);
        swal(
        <div>     
          <p>{CostChangeData?.message}</p>
        </div>
      )
        
         setSearch(false);
      }
    } else if (CostChangeData.isSuccess) {
      if ((CostChangeData["message"]).length > 0) {
      setIsSuccess(true);
      //setLoading(() => window.location.reload(), 500)
      //setTimeout(() => window.location.reload(), 500)
      swal(
        <div>     
          <p>{CostChangeData?.message}</p>
        </div>
      )
     
    }
    } 
    else {
      setIsError(false);
      setIsSuccess(false);
      setTabledata("");
    }
  }, [CostChangeData])

  useEffect(() => {
    if (isSubmit) {
      setTimeout(() => {
         console.log("194 SD", searchData)
        
        dispatch(getCostChangeRequest([searchData]))
      }, 1000)
    }
  }, [isSubmit]);

  useEffect(() => {
    if (isSearch) {
      console.log("278 SD", searchData)
      dispatch(getCostChangeRequest([searchData]))

    }
  }, [isSearch])

  useEffect(() => {
    setLoading(true);
    dispatch(getClassDataRequest([{}]));
    dispatch(getLocationDataRequest([{}]));

  }, [''])

  useEffect(() => {
    if (CostChangeData?.data?.Data && Array.isArray(CostChangeData?.data?.Data)) {
      setTabledata(serializedata(CostChangeData?.data?.Data));
      setAllData(serializedata(CostChangeData?.data?.Data));
      setLoading(false);
      setSubmit(false);
      setSearch(false);
    } else if (CostChangeData?.data?.itemData && Array.isArray(CostChangeData?.data?.itemData)) {
      setItemData(CostChangeData?.data?.itemData);
      setOrigItemData(CostChangeData?.data?.itemData);
      setLoading(false);
    } else if (CostChangeData?.data?.locationData && Array.isArray(CostChangeData?.data?.locationData)) {
      setLocationData(CostChangeData?.data?.locationData);
      setLoading(false);
    } else {
      setSearch(false)
    }
  }, [CostChangeData?.data])

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

  let UniqDept =
  itemData.length > 0
    ? [...new Map(itemData.map((item) => [item["HIER1"], item])).values()]
    : [];

  const SubmitList = () => {
    for (let i = 0; i < Object.values(updateRow).length; i++) {
      Object.values(updateRow)[i]["CREATE_ID"] = JSON.parse(localStorage.getItem("userData"))?.username;
    }
    console.log("251 cc", Object.values(updateRow));
    if (Object.keys(updateRow).length > 0) {
      let sendRow = Object.values(updateRow);
      sendRow.map((item) => {
        delete item?.ITEM_DESC;
        delete item?.ITEM_SOH;
        delete item?.LOCATION_NAME;
        delete item?.undefined;
      })
      console.log("post:", sendRow);
      dispatch(postCostChangeRequest(sendRow));
      setLoading(true);
      // initialsearch.HIER1 = [];
      // initialsearch.HIER2 = [];
      // initialsearch.HIER3 = [];
      // initialsearch.ITEM = [];
      // initialsearch.LOCATION = [];
      // setSearchData(initialsearch);
      // setFilterClass([]);
      // setsubFilterClass([]);
      // setFilterItem([]);
      setSubmit(true);
      seteditRows([]);
      setOpen(false)
    } else {
      setOpen(true)
    }

  };
  const handleSubmit = (event) => {
    console.log("search",searchData)
    event.preventDefault();
    setSearch(true);
    setState({ ...state, 'right': open });
  }

  const onReset = (event) => {
    initialsearch.HIER1 = [];
    initialsearch.HIER2 = [];
    initialsearch.HIER3 = [];
    initialsearch.ITEM = [];
    initialsearch.LOCATION = [];
    console.log("Ini",initialsearch);
    setSearchData(initialsearch);
    console.log("Sdata",searchData);
    setValH1([]);
    setValH2([]);
    setValH3([]);
    setFilterClass([]);
    setsubFilterClass([]);
    setFilterItem([]);
    setSearch(false);
    setTabledata("");
  }

  const handleHier1=(e,value) =>
  {
      console.log("h1",value);
      console.log("srch1",searchData);
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
  console.log("V1",valH1);
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

const handleLocation=(e,value) =>
  {
    let selectedLocation = [];
    if (value.option) {
      valLoc.push(value.option)
      
    }else if (value.removedValue) {
       
            let index = valLoc.indexOf(value.removedValue.LOCATION);
            valLoc.splice(index,1);
           
    }else if(value.action="clear"){      
      valLoc.splice(0,valLoc.length);
    }
console.log("Sdsdddf",valLoc)
   if (valLoc.length >0) {
      valLoc.map((item) => {
        selectedLocation.push(item.LOCATION);
      });
      setSearchData((prev) => {
          return {
            ...prev,
            LOCATION: selectedLocation,
          };
        });    
    }else {
        setSearchData((prev) => {
        return {
          ...prev,
          LOCATION: selectedLocation,
        };
        });
    }
}
console.log("src",searchData);
  const searchPanel = () => (
    <Box
      sx={{ width: 350, marginTop: '80px' }}
      role="presentation"
      component="form"
      onSubmit={handleSubmit}
    > <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
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
                options={locationData}
                isSearchable={true}
                onChange={handleLocation}
                placeholder={"Choose a Location"}
                styles={styleSelect}
                components={animatedComponents} 
                value={locationData.filter(obj => searchData?.LOCATION.includes(obj.LOCATION))}  
                isMulti 
                />
          <div>
            <Button
              className={CostChangeClasses.textField}
              type="submit"
              variant="contained"
              sx={{ width: '120px' }}
              startIcon={<SearchIcon />}
            >
              Search
            </Button>
            <Button
              variant="contained"
              sx={{ width: '120px' }}
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
                <Button variant="contained" sx={{ marginTop: '15px' }} onClick={handleClickOpen} startIcon={<SendIcon />}>
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


              <Button variant="contained" sx={{ marginTop: '15px', textAlign: 'right' }} onClick={toggleDrawer('right', true)} startIcon={<SearchIcon />}>Search</Button>
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
          pageName="cost_maintenance"
        />
      )}
     
    </Box>
  );
};

export default CostChange;
