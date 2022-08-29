import React, { useEffect, useState } from "react";
//import './Forms.css';
//import { useForm } from "react-hook-form";
import { Box } from '@mui/system';
import { Alert, TextField } from '@mui/material';
import { makeStyles } from "@mui/styles";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import { useDispatch, useSelector } from "react-redux";
import { postGlcreationRequest, getGlcurrencyRequest } from "../../Redux/Action/glaccountcreation";
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const useStyles = makeStyles({
    maindiv: {
        position: "relative",
        width: "calc(90vw - 10px)",
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
        display:"flex",
        justifyContent:"space-between",
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
    //   popUp: {
    //     position: 'absolute',
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     width: 400,
    //     backgroundColor: 'white',
    //     border: '2px solid #000',
    //     boxShadow: 24,
    //     padding: '20px 20px 20px 20px',
    //   }
});
const animatedComponents = makeAnimated();
const styleSelect = {
  control: base => ({
    ...base,
    border: 0,
    //border: "5px solid black",
    // This line disable the blue border
    boxShadow: 'none',
    borderBottom: "1px solid black",
  })
};

const initialsearch = {
    CURRENCY: [],
}

const initialItemData = {
    CURRENCY: [],
}


const sendGLData = {
    PRIMARY_ACCOUNT: "",
    SET_OF_BOOKS_ID: "",
    SEGMENT1: "",
    SEGMENT2: "",
    SEGMENT3: "",
    SEGMENT4: "",
    SEGMENT5: "",
    SEGMENT6: "",
    SEGMENT7: "",
    CURRENCY: "",
}

console.log("valus:", sendGLData)
const Forms = () => {
    // we're using react-hook-form library 
    //const { register, handleSubmit } = useForm();
     const [valCurr, setValCurr] = useState([]);
    const [itemData, setItemData] = useState([{}]);
    const [filterClass, setFilterClass] = useState([]);
    const [searchData, setSearchData] = useState(initialsearch);
    const [origItemData, setOrigItemData] = useState({});
    const [sendData, setSendData] = useState(sendGLData);
    const [isSubmit, setSubmit] = useState(false);
    const dispatch = useDispatch();
    const GLCreateClasses = useStyles();
    const theme = useTheme();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const GlAccountData = useSelector(
        (state) => state.glaccountReducers
    );
    const [validatePrimaryAccount, setValidatePrimaryAccount] = useState(false)
    const [validateSetOfBooksId, setValidateSetOfBooksId] = useState(false)

    //   const handleSubmit = (event) => {
    //     event.preventDefault();
    //       setSearch(true);
    //       setState({ ...state, 'right': open });
    //       console.log("state",state);
    //   }
    const handleSubmit = () => {
        sendData["CURRENCY"] = searchData["CURRENCY"];
        sendData["CREATE_ID"] = JSON.parse(localStorage.getItem("userData"))?.username;
        console.log("ta", searchData)
        console.log("ROW", sendData);

        sendData.PRIMARY_ACCOUNT.length <= 0 ? setValidatePrimaryAccount(true) :
        setValidatePrimaryAccount(false);
        sendData.SET_OF_BOOKS_ID.length <= 0 ? setValidateSetOfBooksId(true) :
        setValidateSetOfBooksId(false);

        if (Object.keys(sendData).length > 0) {
            // console.log("ps",updateRow)

            if (sendData.PRIMARY_ACCOUNT.length >= 1 && sendData.SET_OF_BOOKS_ID.length >= 1) {
                dispatch(postGlcreationRequest([sendData]));
                setOpen(true);
                setLoading(true); 
                initialsearch.PRIMARY_ACCOUNT = [];
                setTimeout(() => window.location.reload(), 500)
            }

            //setSubmit(true);
            //seteditRows([]);
        } else {
            setOpen(true);
            setLoading(false);
        }

        setOpen(false);
        setLoading(true);
    };


    //const Forms = () => {
    // we're using react-hook-form library 
    //const { register, handleSubmit } = useForm();


    const onChange = (sendData) => {
        console.log("at", sendData)
        setSendData((prev) => {
            return {
                ...prev,
                [sendData.target.name]: sendData.target.value,
            };
        });
    }
    const onSubmit = (data) => {
        console.log("kty", data);
    };

    useEffect(() => {
        dispatch(getGlcurrencyRequest([{}]))

    }, [''])
    useEffect(() => {
        // if(GlAccountData?.data?.Data && Array.isArray(GlAccountData?.data?.Data)){
        //   setTabledata(serializedata(GlAccountData?.data?.Data));
        //   setAllData(serializedata(GlAccountData?.data?.Data));
        //   setLoading(false);
        //   setSubmit(false);
        //   setSearch(false);
        //}
        if (GlAccountData?.data?.CURRENCYDATA && Array.isArray(GlAccountData?.data?.CURRENCYDATA)) {
            setItemData(GlAccountData?.data?.CURRENCYDATA);
            setOrigItemData(GlAccountData?.data?.CURRENCYDATA);


            //setLoading(false);
            // }else if(GlAccountData?.data?.locationData && Array.isArray(GlAccountData?.data?.locationData)){
            //   setLocationData(GlAccountData?.data?.locationData);
            //setLoading(false);
        } else {
            //setSearch(false)
        }

    }, [GlAccountData?.data])

    // const handleSubmit = (evt) => {
    //     evt.preventDefault();
    //     //var a={itemData,sendData}
    //     //a.push({})
    //     //console.log("sdsd",a)
    //     console.log("abc",sendData);   
    //    // console.log(itemData)
    //      Alert("stop") 
    //   };
    const selectCURRENCY = (event, value) => {
        let selectedCURRENCY = [];
        if (value.length > 0) {
            console.log(itemData);
            const filterClass = itemData.filter((item) => { return value.some((val) => { return item.CURRENCY === val.CURRENCY }) });
            console.log(filterClass);
            const classFilter = (filterClass.length > 0) ? [...new Set(filterClass.map(item => item.HIER2))] : [];
            setFilterClass(filterClass);

            value.map(
                (item) => {
                    selectedCURRENCY.push(item.CURRENCY);
                }
            )
            setSearchData((prev) => {
                return {
                    ...prev,
                    CURRENCY: selectedCURRENCY
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
         
              let index = valCurr.indexOf(value.removedValue.CURRENCY);
              valCurr.splice(index,1);
      
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
    }
    const handleCancel = () => {
        setOpen(false)
    }
    const handleClose = () => {
        //setIsValidExcel(true);
        setOpen(false);
    };
    const handleClickOpen = () => setOpen(true);
    return (
        <Box className={GLCreateClasses.maindiv}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                <Grid item xs={12}>
                    <Box className={GLCreateClasses.boxDiv}>
                        <div className={GLCreateClasses.uploaddiv}>
                            <h4>GL Account</h4>
                        </div>
                        <div className={GLCreateClasses.uploaddiv}>
                            {/* <div style={{ marginLeft: '16px', padding: '16px' }}> */}
                            <Button variant="contained" sx={{ marginTop: '15px', textAlign: 'right' }} onClick={handleClickOpen} startIcon={<SendIcon />}>
                                Submit
                            </Button>
                        </div>
                    </Box>
                </Grid>
                <div>
                    <Dialog
                        fullScreen={fullScreen}
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="responsive-dialog-title"
                        className={GLCreateClasses.popUp}
                        PaperProps={{
                            style: {
                                backgroundColor: '#D3D3D3',
                                borderRadius: '20px',
                            },
                        }}
                    >
                        <DialogTitle id="responsive-dialog-title">
                            {"Do you want to submit this Account!"}
                        </DialogTitle>
                        <DialogContent>                            
                        </DialogContent>
                        <DialogActions>
                            <Button autoFocus onClick={handleCancel}>
                                NO
                            </Button>
                            <Button onClick={handleSubmit} autoFocus>
                                YES
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Grid>
            <div className="container">
                {/* <h4 className="title">GL Account</h4> */}
                <div className="form-container">

                    <Box

                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '35ch' },
                        }}
                        autoComplete="off"

                    >
                        <form>
                            <TextField
                                error={validatePrimaryAccount}
                                helperText={validatePrimaryAccount === true ? "*Required" : null}
                                name="PRIMARY_ACCOUNT"
                                label="PRIMARY ACCOUNT"
                                id="PRIMARY ACCOUNT"
                                onChange={onChange}
                                required
                                
                            //value={searchData.PRIMARY_ACCOUNT}
                            //{...register('PRIMARY ACCOUNT', { required: true })}
                            />

                            <TextField
                                error={validateSetOfBooksId}
                                helperText={validateSetOfBooksId === true ? "*Required" : null}
                                name="SET_OF_BOOKS_ID"
                                label="SET OF BOOKS ID"
                                id="SET OF BOOKS ID"
                                onChange={onChange}
                                required
                            // {...register('SET OF BOOKS ID', { required: true })}
                            />

                            <TextField
                                name="SEGMENT1"
                                label="SEGMENT1"
                                id="SEGMENT1"
                                onChange={onChange}

                            //    {...register('SEGMENT1', { required: false })}
                            />
                            <TextField
                                name="SEGMENT2"
                                label="SEGMENT2"
                                id="SEGMENT2"
                                onChange={onChange}

                            //   {...register('SEGMENT2', { required: false })}
                            />
                            <TextField
                                name="SEGMENT3"
                                label="SEGMENT3"
                                id="SEGMENT3"
                                onChange={onChange}

                            //    {...register('SEGMENT3', { required: false })}
                            />
                            <TextField
                                name="SEGMENT4"
                                label="SEGMENT4"
                                id="SEGMENT4"
                                onChange={onChange}

                            //   {...register('SEGMENT4', { required: false })}
                            />
                            <TextField
                                name="SEGMENT5"
                                label="SEGMENT5"
                                id="SEGMENT5"
                                onChange={onChange}

                            //   {...register('SEGMENT5', { required: false })}
                            />
                            <TextField
                                name="SEGMENT6"
                                label="SEGMENT6"
                                id="SEGMENT6"
                                onChange={onChange}

                            //   {...register('SEGMENT6', { required: false })}
                            />
                            <TextField
                                name="SEGMENT7"
                                label="SEGMENT7"
                                id="SEGMENT7"
                                onChange={onChange}

                            //   {...register('SEGMENT7', { required: false })}
                            />
                            {/* <Autocomplete
                                multiple
                                size="small"
                                id="combo-box-item"
                                sx={{ width: 250 }}
                                options={(itemData.length > 0) ? itemData : []}
                                //value={searchData?.HIER1}
                                isOptionEqualToValue={(option, value) => option.CURRENCY === value.CURRENCY}
                                autoHighlight
                                onChange={selectCURRENCY}
                                getOptionLabel={(option) => `${option.CURRENCY.toString()}`}
                                renderOption={(props, option) => (
                                    <Box component="li" {...props}>
                                        {option.CURRENCY}
                                    </Box>
                                )}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        value={searchData?.CURRENCY}
                                        variant="standard"
                                        label="CURRENCY"
                                        inputProps={{
                                            ...params.inputProps,
                                            autoComplete: 'new-password', // disable autocomplete and autofill
                                        }}
                                    />
                                )}
                            /> */}
                            <div style={{width: '300px'}}>
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
                            </div>
                            <Grid item xs={6}>
                                <Box display="flex"
                                    justifyContent="flex-end"
                                    alignItems="flex-end" className={GLCreateClasses.boxDiv}>

                                </Box>
                            </Grid>


                            {/* <Button variant="contained" sx={{marginTop: '15px'}} type="Submit"    startIcon={<SendIcon />}>Submit</Button> */}
                            {/* </div> */}
                        </form>
                    </Box>

                </div>
            </div>
        </Box>
    );
};

export default Forms;