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
import Typography from "@mui/material/Typography";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Drawer from "@mui/material/Drawer";
import { makeStyles } from "@mui/styles";
import { getInquiryDataRequest,getClassDataRequest,resetInquiry } from "../../Redux/Action/inquiry";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { trnType } from "../../Components/ErrorProcessing/transType.js";
import swal from '@sweetalert/with-react';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const useStyles = makeStyles({
  maindiv: {
    position: "relative",
    width: "calc(95vw - 0px)",
    "& table": {
      "& thead": {
        "& th:nth-child(1)": {
          display: "none",
        },
      },
      "& tr": {
        "& td:nth-child(1)": {
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
  HIER1: [],
  HIER2: [],
  HIER3: [],
  ITEM: [],
  TRN_TYPE: [],
  AREF: [],
  USER: "",
  DATE: "",
};

const initialItemData = {
  HIER1: "",
  HIER2: "",
  HIER3: "",
  ITEM: "",
};

const InquryScreen = () => {
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
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const ErrorProceesClasses = useStyles();
  const InquiryData = useSelector((state) => state.InquiryReducers);
  //console.log(ErrorProcessingData);

  console.log("Inq", InquiryData);
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
          ITEM: null,
          ITEM_DESC: "",
          ERR_MSG: null,
          HIER1: null,
          HIER1_DESC: "",
          HIER2: null,
          HIER2_DESC: "",
          HIER3: null,
          HIER3_DESC: "",
          LOCATION_TYPE: null,
          LOCATION: null,
          LOCATION_NAME: "",
          TRN_NAME: "",
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
          ERR_SEQ_NO: null,
          TRAN_SEQ_NO: null,
        };
        delete item?.PROCESS_IND;
        delete item?.SELLING_UOM;
        delete item?.TRN_POST_DATE;
        delete item?.TRN_DATE;
        delete item?.REF_ITEM;
        delete item?.REF_ITEM_TYPE;
        delete item?.PACK_QTY;
        delete item?.PACK_COST;
        delete item?.PACK_RETAIL;
        delete item?.CREATE_ID;
        delete item?.CREATE_DATETIME;
        delete item?.REV_NO;
        delete item?.REV_TRN_NO;
        delete item?.AREF;
        delete item?.TRN_TYPE;
        let test = Object.assign(reorder, item);
        newTabledata.push(test);
      });
      return newTabledata;
    }
  };

  useEffect(() => {
    if (inputValue) {
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
  //   if (ErrorProcessingData.isError) {
  //     setIsError(true);
  //   } else if (ErrorProcessingData.isSuccess) {
  //     setIsSuccess(true);
  //   } else {
  //     setIsError(false);
  //     setTabledata("");
  //   }
  // }, [ErrorProcessingData]);

  useEffect(() => {
    if (InquiryData.isError) {
        setIsError(true)
        console.log("inerror");
        swal(
          <div>     
            <p>{InquiryData["messgae"]}</p>
          </div>
        )  
        setSearch(false);
    }else if(InquiryData.isSuccess ){
      setIsSuccess(true);
      swal(
        <div>     
           <p>{InquiryData["messgae"]}</p>
        </div>
      )
      setLoading(true);
    }else {
      setIsError(false)
      setTabledata("")
    }
  }, [InquiryData])

  useEffect(() => {
    if (isSearch) {
      dispatch(getInquiryDataRequest([searchData]));
    }
    // return () => {
    //   dispatch(resetInquiry());
    // }
  }, [isSearch]);

  useEffect(() => {
    dispatch(getClassDataRequest([{}]));
  }, [""]);

  useEffect(() => {
    if (InquiryData?.data?.Data && Array.isArray(InquiryData?.data?.Data)) {
      setTabledata(serializedata(InquiryData?.data?.Data));
      setAllData(serializedata(InquiryData?.data?.Data));
      setLoading(false);
      setSearch(false);
    } if (InquiryData?.data?.itemData && Array.isArray(InquiryData?.data?.itemData)) {
      setItemData(InquiryData?.data?.itemData);
      setOrigItemData(InquiryData?.data?.itemData);
      setLoading(false);
    }else {
      setSearch(false);
    }
  }, [InquiryData?.data]);

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

  const handleMsgClose = () => {
    setIsError(false);
    setIsSuccess(false);
  };

  const onReset = (event) => {
    initialsearch.USER = "";
    initialsearch.DATE = "";

    setSearchData(initialsearch);
    setSearch(false);
    setTabledata("");
    setInputValue("");
    setAllData("");
    dispatch(resetInquiry());
  };

  const selectDept = (event, value) => {
    let selectedDept = [];
    if (value.length > 0) {
      console.log(itemData);
      const filterClass = itemData.filter((item) => {
        return value.some((val) => {
          return item.HIER1 === val.HIER1;
        });
      });
      console.log(filterClass);
      let UniqClass =
        filterClass.length > 0
          ? [
              ...new Map(
                filterClass.map((item) => [item["HIER2"], item])
              ).values(),
            ]
          : [];
      //const classFilter = (filterClass.length > 0 )?[...new Set(filterClass.map(item => item.HIER2))]:[];
      setFilterClass(UniqClass);

      value.map((item) => {
        selectedDept.push(item.HIER1);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          HIER1: selectedDept,
        };
      });
    } else {
      setFilterClass([]);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER1: [],
        };
      });
    }
  };


  const selectClass = (event, value) => {
    console.log(value);
    let selectedClass = [];
    if (value.length > 0) {
      //const subclassFilter = (filterSubClass.length > 0 )?[...new Set(filterSubClass.map(item => item.HIER3))]:[];
      const filterSubClass = itemData.filter((item) => {
        return value.some((val) => {
          return item.HIER2 === val.HIER2;
        });
      });
      let UniqSubClass =
        filterSubClass.length > 0
          ? [
              ...new Map(
                filterSubClass.map((item) => [item["HIER3"], item])
              ).values(),
            ]
          : [];

      console.log(UniqSubClass);
      setsubFilterClass(UniqSubClass);
      value.map((item) => {
        selectedClass.push(item.HIER2);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          HIER2: selectedClass,
        };
      });
    } else {
      setsubFilterClass([]);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER2: [],
        };
      });
    }
  };
  const selectSubClass = (event, value) => {
    let selectedSubclass = [];
    if (value.length > 0) {
      //const itemFilter = (filterItem.length > 0 )?[...new Set(filterItem.map(item => item.ITEM))]:[];
      // console.log(itemFilter);
      const filterItem = itemData.filter((item) => {
        return value.some((val) => {
          return item.HIER3 === val.HIER3;
        });
      });
      setFilterItem(filterItem);
      value.map((item) => {
        selectedSubclass.push(item.HIER3);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          HIER3: selectedSubclass,
        };
      });
    } else {
      setFilterItem([]);
      setSearchData((prev) => {
        return {
          ...prev,
          HIER3: [],
        };
      });
    }
  };

  const selectItem = (event, value) => {
    let selectedItem = [];
    if (value.length > 0) {
      value.map((item) => {
        selectedItem.push(item.ITEM);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM: selectedItem,
        };
      });
    } else {
      setSearchData((prev) => {
        return {
          ...prev,
          ITEM: selectedItem,
        };
      });
    }
  };

  const selectTrantype = (event, value) => {
    console.log(value);
    let selectedTrantype = [];
    let selectedAref = [];
    if (value.length > 0) {
      value.map((item) => {
        selectedTrantype.push(item.TRN_TYPE);
        selectedAref.push(item.AREF);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          TRN_TYPE: selectedTrantype,
          AREF: selectedAref,
        };
      });
    } else {
      setSearchData((prev) => {
        return {
          ...prev,
          TRN_TYPE: [],
          AREF: [],
        };
      });
    }
  };

  let UniqDept =
    itemData.length > 0
      ? [...new Map(itemData.map((item) => [item["HIER1"], item])).values()]
      : [];
  console.log(searchData);
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
          <Autocomplete
            multiple
            size="small"
            id="combo-box-item"
            sx={{ width: 250 }}
            options={UniqDept.length > 0 ? UniqDept : []}
            //value={searchData?.HIER1}
            isOptionEqualToValue={(option, value) =>
              option.HIER1 === value.HIER1
            }
            autoHighlight
            onChange={selectDept}
            getOptionLabel={(option) =>
              `${option.HIER1.toString()}-${option.HIER1_DESC.toString()}`
            }
            renderOption={(props, option) => (
              <Box component="li" {...props}>
                {option.HIER1}-{option.HIER1_DESC}
              </Box>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Choose a HIER1"
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />

          <Autocomplete
            multiple
            size="small"
            id="combo-box-class"
            sx={{ width: 250 }}
            options={filterClass.length > 0 ? filterClass : []}
            //value={(searchData?.ITEM.length > 0)?searchData?.ITEM:[]}
            isOptionEqualToValue={(option, value) =>
              option.HIER2 === value.HIER2
            }
            autoHighlight
            onChange={selectClass}
            getOptionLabel={(option) =>
              `${option.HIER2.toString()}-${option.HIER2_DESC.toString()}`
            }
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
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />

          <Autocomplete
            multiple
            size="small"
            id="combo-box-subclass"
            sx={{ width: 250 }}
            options={subfilterClass.length > 0 ? subfilterClass : []}
            //value={(searchData?.ITEM.length > 0)?searchData?.ITEM:[]}
            isOptionEqualToValue={(option, value) =>
              option.HIER3 === value.HIER3
            }
            autoHighlight
            onChange={selectSubClass}
            getOptionLabel={(option) =>
              `${option.HIER3.toString()}-${option.HIER3_DESC.toString()}`
            }
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
                  autoComplete: "new-password", // disable autocomplete and autofill
                }}
              />
            )}
          />

          <Autocomplete
            disabled={filterItem.length > 0 ?false:true}
            multiple
            size="small"
            id="combo-box-item"
            sx={{ width: 250 }}
            options={filterItem.length > 0 ? filterItem : []}
            //value={(searchData?.ITEM.length > 0)?searchData?.ITEM:[]}
            isOptionEqualToValue={(option, value) => option.ITEM === value.ITEM}
            autoHighlight
            onChange={selectItem}
            getOptionLabel={(option) =>
              `${option.ITEM.toString()}-${option.ITEM_DESC.toString()}`
            }
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
                  autoComplete: "new-password", // disable autocomplete and autofill
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
            renderInput={(params) => (
              <TextField {...params} label="TRN TYPE" variant="standard" />
            )}
          />

          <TextField
            className={ErrorProceesClasses.textField}
            margin="normal"
            size="small"
            variant="standard"
            name="USER"
            label="User"
            type="text"
            onChange={onChange}
            value={searchData.USER}
            sx={{ width: 250 }}
          />
          <TextField
            className={ErrorProceesClasses.dateField}
            margin="normal"
            size="small"
            variant="standard"
            name="DATE"
            label="DATE"
            type="date"
            inputProps={{ max: "2022-08-01" }}
            value={searchData.DATE}
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
    <Box className={ErrorProceesClasses.maindiv}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Box className={ErrorProceesClasses.boxDiv}>
            <div className={ErrorProceesClasses.uploaddiv}>
              <h4>Inquiry</h4>
            </div>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            display="flex"
            justifyContent="flex-end"
            alignItems="flex-end"
            className={ErrorProceesClasses.boxDiv}
          >
            <div className={ErrorProceesClasses.uploaddiv}>
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
            searchText={inputValue}
            handleEdit={true}
            editRows={editRows}
            seteditRows={seteditRows}
            setUpdateRow={setUpdateRow}
            headCells={headCells}
            setTabledata={setTabledata}
            allData={allData}
            pageName="inquiry"
          />
        )
      )}

      {/* <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={isError || isSuccess}
          autoHideDuration={3000}
          onClose={handleMsgClose}
        >
          <Alert
            onClose={handleMsgClose}
            severity={ErrorProcessingData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
            {isSuccess === true
              ? ErrorProcessingData?.messgae
                ? ErrorProcessingData?.messgae
                : "Data Successfully Fetched"
              : ""}
            {isError === true
              ? ErrorProcessingData?.messgae
                ? ErrorProcessingData?.messgae
                : "Data Not Found"
              : ""}
          </Alert>
        </Snackbar>
      </Stack> */}
    </Box>
  );
};

export default InquryScreen;
