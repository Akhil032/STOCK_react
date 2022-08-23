import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from "@mui/material/Box";
import Grid from '@mui/material/Grid';
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  stagemaindiv: {
    position: "relative",
    width: "calc(95vw - 64px)",
    '& table':{
        '& tr':{
              '& td:nth-child(14)':{
                    display: 'none'
              },
              '& td:nth-child(15)':{
                display: 'none'
          }
        }
    }
  },
  boxDiv: {
    textAlign: "initial",
    position: "relative",
    maxWidth: "1400px",
  },
  uploaddiv: {
    display: "flex",
    alignItems: "center",
    marginTop: "60px",
    textAlign: "start",
    gap: 20,
  },
  GobackDiv: {
    cursor: "pointer",
  },
  resetBtn: {
    marginTop: "40px !important",
  }
});

const Download = () => {

  const[template, setTemplate] = useState("");
  const [selectedFile, setSelectedFile] = useState(0);
  const Inventoryfile = require("../../Assets/templates/STAGE_PROCESSING_INV_TRAN_TEMPLATE.xlsx");
  const Non_Inventoryfile = require("../../Assets/templates/STAGE_PROCESSING_NON_INV_TRAN_TEMPLATE.xlsx");
  const StageProceesClasses = useStyles();


  const selectTemplate = (event) => {
  let templateFile = event.target.value;
     if(templateFile === 2){
      console.log("Second");
      setTemplate(Non_Inventoryfile);
      setSelectedFile(templateFile);
    }else if(templateFile === 1){
        console.log("First");
        setTemplate(Inventoryfile);
        setSelectedFile(templateFile);
    }else{
      setSelectedFile(templateFile);
    }
  }

  const DownloadFiles = () => {
        console.log("Download Files");
        const link = document.createElement("a");
        link.download = (selectedFile == 1)?"STAGE_PROCESSING_INV_TRAN_TEMPLATE.xlsx":"STAGE_PROCESSING_NON_INV_TRAN_TEMPLATE.xlsx";
        link.href = template;
        link.click();
        console.log("link",link);
  }

      return(
        <Box className={StageProceesClasses.stagemaindiv}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Box className={StageProceesClasses.boxDiv}>
              <div className={StageProceesClasses.uploaddiv}>
                <h4>Download Templates</h4>

          <FormControl >
              <InputLabel id="demo-simple-select-label" style={{width: "200px"}}>Download</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedFile}
                label="Download"
                size="small"
                onChange={selectTemplate}
                sx={{ width:"200px"}}
              >
                <MenuItem value={0}>Select File</MenuItem>
                <MenuItem value={1}>Inventory</MenuItem>
                <MenuItem value={2}>Non Inventory</MenuItem>
              </Select>
            </FormControl>
          {selectedFile !== 0 &&
          <div>
          <Button variant="contained"  onClick={DownloadFiles}>Download</Button>
          </div>
          }
          </div>
            </Box>
          </Grid> 
          <Grid item xs={4}>
            <Box className={StageProceesClasses.boxDiv}>
              
          </Box>
          </Grid>
          </Grid>
          </Box>
          )

}

export default Download;

