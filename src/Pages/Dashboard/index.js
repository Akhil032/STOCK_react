import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { getDailyCountRequest, getStageCountRequest, getErrorCountRequest } from "../../Redux/Action/dashBoard";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RefreshIcon from '@mui/icons-material/Refresh';
import CircularProgress from "@mui/material/CircularProgress";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#d9d9d9",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "left",
  color: theme.palette.text.secondary,
}));

const Dashboard = () => {
  const [dailyCountData, setDailyCountData] = useState("");
  const [stageCountData, setStageCountData] = useState("");
  const [errorCountData, setErrorCountData] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const DashBoardData = useSelector(
    (state) => state.DashboardReducers
  );
  console.log(DashBoardData);
  useEffect(() => {
      let promise1 = dispatch(getDailyCountRequest())
      let promise2 = dispatch(getStageCountRequest())
      let promise3 = dispatch(getErrorCountRequest()) 

      const fetchAsyncData = async () => {
        setLoading(true);
        const res = await Promise.all([promise1, promise2, promise3]);
        console.log("promise",res);
      };
      fetchAsyncData();
  },[''])

  useEffect(() => {
    let promise1 = dispatch(getDailyCountRequest())
    let promise2 = dispatch(getStageCountRequest())
    let promise3 = dispatch(getErrorCountRequest()) 

    const fetchAsyncData = async () => {
      setLoading(true);
      const res = await Promise.all([promise1, promise2, promise3]);
      console.log("refresh",res);
      setRefresh(false);
    };
    fetchAsyncData();
},[refresh])


  useEffect(() => {
    if(DashBoardData?.data?.DailyCount){
      setDailyCountData(DashBoardData?.data?.DailyCount);
    }else if(DashBoardData?.data?.StageCount){
      setStageCountData(DashBoardData?.data?.StageCount);
    }else if(DashBoardData?.data?.TranCount){
      setErrorCountData(DashBoardData?.data?.TranCount);
      setLoading(false);
    }else {
    }
    
},[DashBoardData?.data])
console.log(dailyCountData,stageCountData,errorCountData);
  return (
      <>
      <Box sx={{ flexGrow: 1, marginTop: "70px" }}>
       <Grid container columns={{ xs: 4, sm: 8, md: 12 }} >
       <Grid item xs={6}>  <h4 style={{ margin: '0px'}}>Dashboard</h4> </Grid>
          <Grid xs={6} sx={{ textAlign: 'right'}}>  <Button size="small" variant="contained" onClick={() => setRefresh(true)}startIcon={<RefreshIcon />}>Refresh</Button>
       </Grid>
      </Grid>
      </Box>
  
      {loading ? (
        <Box sx={{ flexGrow: 1 }}>
        <CircularProgress color="inherit" />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1, marginTop: "20px" }}>
        <Grid container spacing={{ xs: 3, md: 4 }} columns={{ xs: 4, sm: 8, md: 12 }} sx={{ marginTop: "100px" }}>
             <Grid item  xs={2} sm={4} md={4}>    
                <Item style={{background:"#ededb2"}}>
                <h3>Pending Count</h3>
                {Object.entries(dailyCountData).map(([key,value])=>{
                     return <div>{key} : {value.toString()}</div>
                      }
                   )}
                </Item>
           </Grid>
         <Grid item  xs={2} sm={4} md={4}>
                <Item style={{background:"#b2e3ed"}}>
                <h3>Stage Count</h3>
                {Object.entries(stageCountData).map(([key,value])=>{
                     return <div>{key} : {value.toString()}</div>
                      }
                   )}
                  </Item>
           </Grid>
           <Grid item  xs={2} sm={4} md={4}>
                <Item style={{background:"#dab0eb"}}>
                <h3>Tran Count</h3>
                {Object.entries(errorCountData).map(([key,value])=>{
                     return <div>{key} : {value.toString()}</div>
                      }
                   )}</Item>
           </Grid>
           </Grid>
     </Box>
      )}
      {/* <Stack spacing={2} sx={{ width: "100%" }}>
        <Snackbar open={isError || isSuccess} autoHideDuration={3000} onClose={handleMsgClose}>
          <Alert
            onClose={handleMsgClose}
            severity={ErrorProcessingData?.isSuccess ? "success" : "error"}
            sx={{ width: "100%" }}
          >
          {ErrorProcessingData?.messgae?ErrorProcessingData?.messgae:'Data Successfully Fetched'}
          </Alert>
          </Snackbar>
      </Stack> */}
    </>
  );
}
export default Dashboard;

