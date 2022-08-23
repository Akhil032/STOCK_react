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
import { getDailySkuRollupDataRequest } from "../../Redux/Action/reconciliation";
import {
  getClassDataRequest,
  getLocationDataRequest,
} from "../../Redux/Action/errorProcessing";
import CircularProgress from "@mui/material/CircularProgress";
import { headCells } from "./tableHead";
import SearchIcon from "@mui/icons-material/Search";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { trnType } from "../../Components/ErrorProcessing/transType";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CSVLink } from "react-csv";
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
        "& th:nth-child(1)": {
          display: "none",
        },
        "& td:nth-child(1)": {
          display: "none",
        },
      },
    },
  },
  boxDiv: {
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
    "& .MuiInput-input": {
      color: "rgba(102,102,102,1)",
    },
  },
  downloadBtn: {
    color: "white",
    textDecoration: "none",
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
  LOCATION: [],
  TRN_TYPE: [],
  AREF: [],
  TRN_POST_DATE: "",
};

const initialItemData = {
  HIER1: "",
  HIER2: "",
  HIER3: "",
  ITEM: "",
};

const Reconciliation = () => {
  const [tabledata, setTabledata] = useState("");
  const [inputValue, setInputValue] = useState();
  const [allData, setAllData] = useState("");
  const [editRows, seteditRows] = useState([]);
  const [updateRow, setUpdateRow] = useState([]);
  const [itemData, setItemData] = useState(initialItemData);
  const [locationData, setLocationData] = useState([{}]);
  const [loading, setLoading] = useState(false);
  const [isSearch, setSearch] = useState(false);
  const [searchData, setSearchData] = useState(initialsearch);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [sort, setSort] = useState(1);
  const [open, setOpen] = useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const ErrorProceesClasses = useStyles();
  const DailySkuRollupData = useSelector(
    (state) => state.ReconciliationReducers
  );

  const SearchItemData = useSelector((state) => state.ErrorProcessingReducers);

  console.log(SearchItemData, DailySkuRollupData);
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
          HIER1: null,
          LOCATION: null,
          TRN_NAME: "",
          TRN_POST_DATE: "",
          QTY: "",
          COST: "",
          RETAIL: "",
          ROLLED_QTY: "",
          ROLLED_COST: "",
          ROLLED_RETAIL: "",
          QTY_MATCHED: "",
          COST_MATCHED: "",
          RETAIL_MATCHED: "",
        };
        parseFloat(item.LOCATION?.toFixed(1));
        parseFloat(item.QTY?.toFixed(1));
        parseFloat(item.COST?.toFixed(1));
        parseFloat(item.RETAIL?.toFixed(1));
        parseFloat(item.ROLLED_QTY?.toFixed(1));
        parseFloat(item.ROLLED_COST?.toFixed(1));
        parseFloat(item.ROLLED_RETAIL?.toFixed(1));
        delete item.HIER1_DESC;
        delete item.LOCATION_NAME;
        delete item.AREF;
        delete item.TRN_TYPE;

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
  //   if (DailySkuRollupData.isError) {
  //     setIsError(true);
  //     setSearch(false);
  //   } else if (DailySkuRollupData.isSuccess) {
  //     setIsSuccess(true);
  //   } else {
  //     setIsError(false);
  //     setTabledata("");
  //   }
  // }, [DailySkuRollupData]);

  useEffect(() => {
    if (DailySkuRollupData.isError) {
        setIsError(true)
        swal(
          <div>     
            <p>{DailySkuRollupData["messgae"]}</p>
          </div>
        )  
    // }else if(DailySkuRollupData.isSuccess ){
    //   setIsSuccess(true);
    //   swal(
    //     <div>     
    //        <p>{DailySkuRollupData["messgae"]}</p>
    //     </div>
    //   )
    //   setLoading(true);
    }else {
      setIsError(false)
      setTabledata("")
    }
  }, [DailySkuRollupData])

  useEffect(() => {
    if (isSearch) {
      dispatch(getDailySkuRollupDataRequest([searchData]));
    }
  }, [isSearch]);

  useEffect(() => {
    setLoading(true);
    dispatch(getClassDataRequest([{}]));
    dispatch(getLocationDataRequest([{}]));

    // return () =>{
    //   setAllData([]);
    //   setTabledata([]);
    //   setSearchData({});
    //   console.log("unmount",allData);
    // }
  }, [""]);

  useEffect(() => {
    if (
      DailySkuRollupData?.data?.Data &&
      Array.isArray(DailySkuRollupData?.data?.Data)
    ) {
      setTabledata(serializedata(DailySkuRollupData?.data?.Data));
      setAllData(serializedata(DailySkuRollupData?.data?.Data));
      setLoading(false);
      setSearch(false);
    } else {
      setSearch(false);
    }
  }, [DailySkuRollupData?.data]);

  useEffect(() => {
    if (
      SearchItemData?.data?.itemData &&
      Array.isArray(SearchItemData?.data?.itemData)
    ) {
      setItemData(SearchItemData?.data?.itemData);
      setLoading(false);
    } else if (
      SearchItemData?.data?.locationData &&
      Array.isArray(SearchItemData?.data?.locationData)
    ) {
      setLocationData(SearchItemData?.data?.locationData);
      setLoading(false);
    } else {
      setSearch(false);
    }
  }, [SearchItemData?.data]);

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
    setSort(1);
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
    initialsearch.HIER1 = [];
    initialsearch.LOCATION = [];
    initialsearch.TRN_TYPE = [];
    initialsearch.TRN_POST_DATE = [];
    initialsearch.AREF = [];
    setSearchData(initialsearch);
    setSearch(false);
    setSort(1);
    setTabledata("");
    setInputValue("");
    setAllData("");
  };

  const selectDept = (event, value) => {
    let selectedDept = [];
    if (value.length > 0) {
      const filterClass = itemData.filter((item) => {
        return value.some((val) => {
          return item.HIER1 === val.HIER1;
        });
      });

      console.log(filterClass);

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
      setSearchData((prev) => {
        return {
          ...prev,
          HIER1: [],
        };
      });
    }
  };

  const selectLocation = (event, value) => {
    console.log(value);
    let selectedLocation = [];
    if (value.length > 0) {
      value.map((item) => {
        selectedLocation.push(item.LOCATION);
      });
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION: selectedLocation,
        };
      });
    } else {
      initialsearch.LOCATION = "";
      setSearchData((prev) => {
        return {
          ...prev,
          LOCATION: [],
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
  console.log(searchData, tabledata);

  const headers = [
    { label: "HIER1", key: "HIER1" },
    { label: "LOCATION", key: "LOCATION" },
    { label: "TRN TYPE", key: "TRN_NAME" },
    { label: "END OF PERIOD", key: "TRN_POST_DATE" },
    { label: "QTY", key: "QTY" },
    { label: "COST", key: "COST" },
    { label: "RETAIL", key: "RETAIL" },
    { label: "ROLLED QTY", key: "ROLLED_QTY" },
    { label: "ROLLED COST", key: "ROLLED_COST" },
    { label: "ROLLED RETAIL", key: "ROLLED_RETAIL" },
    { label: "QTY MATCHED", key: "QTY_MATCHED" },
    { label: "COST MATCHED", key: "COST_MATCHED" },
    { label: "RETAIL MATCHED", key: "RETAIL_MATCHED" },
  ];

  const data = tabledata;

  const csvReport = {
    data: data,
    headers: headers,
    filename: "ReconciliationReport.csv",
  };

  const handleSort = (event) => {
    setSort(event.target.value);
    let sortval = event.target.value;
    let sortData = [];
    if (allData.length > 0) {
      if (sortval == 2) {
        sortData = allData.filter((item) => {
          return (
            item.QTY_MATCHED == "Y" &&
            item.COST_MATCHED == "Y" &&
            item.RETAIL_MATCHED == "Y"
          );
        });
        console.log("matched", sortData);
        setTabledata(sortData);
        setSort(sortval);
      } else if (sortval == 3) {
        sortData = allData.filter((item) => {
          return (
            item.QTY_MATCHED == "N" ||
            item.COST_MATCHED == "N" ||
            item.RETAIL_MATCHED == "N"
          );
        });
        setTabledata(sortData);
        setSort(sortval);
      } else {
        console.log("Test");
        setTabledata(allData);
        setSort(1);
      }
    }
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
                value={searchData?.ITEM}
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
            id="combo-box-location"
            sx={{ width: 250 }}
            options={locationData.length > 0 ? locationData : []}
            // value={searchData.LOCATION}
            autoHighlight
            isOptionEqualToValue={(option, value) =>
              option.LOCATION === value.LOCATION
            }
            onChange={selectLocation}
            getOptionLabel={(option) =>
              `${option.LOCATION.toString()}-(${option.LOCATION_NAME.toString()})`
            }
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
            className={ErrorProceesClasses.dateField}
            margin="normal"
            size="small"
            variant="standard"
            name="TRN_POST_DATE"
            label="TRN POST DATE"
            type="date"
            inputProps={{ max: "2022-07-31" }}
            value={searchData.TRN_POST_DATE}
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
              <h4>Reconciliation SKU to ROLLUP</h4>
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
              {allData.length > 0 && (
                <>
                  <div>
                    <Button
                      variant="contained"
                      sx={{ marginTop: "15px", textAlign: "right" }}
                    >
                      <CSVLink
                        {...csvReport}
                        className={ErrorProceesClasses.downloadBtn}
                      >
                        Export to CSV
                      </CSVLink>
                    </Button>
                  </div>

                  <div style={{ marginTop: "20px" }}>
                    <FormControl>
                      <InputLabel
                        id="demo-simple-select-label"
                        style={{ width: "100px" }}
                      >
                        Sort
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={sort}
                        label="Sort"
                        size="small"
                        onChange={handleSort}
                        sx={{ width: "160px" }}
                      >
                        <MenuItem value={1}>All</MenuItem>
                        <MenuItem value={2}>All Matched</MenuItem>
                        <MenuItem value={3}>All Unmatched</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                </>
              )}

              <div>
                <Button
                  disableRipple
                  variant="contained"
                  sx={{ marginTop: "15px", textAlign: "right" }}
                  onClick={toggleDrawer("right", true)}
                  startIcon={<SearchIcon />}
                >
                  Search
                </Button>
              </div>
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
            pageName="reconciliation"
          />
        )
      )}

      {/* <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar
          open={isError}
          autoHideDuration={3000}
          onClose={handleMsgClose}
        >
          <Alert
            onClose={handleMsgClose}
            severity={DailySkuRollupData?.isError ? "error" : ""}
            sx={{ width: "100%" }}
          >
            {DailySkuRollupData?.messgae ? DailySkuRollupData?.messgae : ""}
          </Alert>
        </Snackbar>
      </Stack> */}
    </Box>
  );
};

export default Reconciliation;
