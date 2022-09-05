import React, { useEffect, useState} from "react";
import axiosCall from "../services/index";
import { API } from "../services/api";


const TrnType = () => {
  const [trnTypeData, setTrnTypeData] = useState([{}]);
  useEffect(() => {
    axiosCall("POST",API.FETCHTRNTYPE,[{}]).then(res => {
          //console.log("dt",res.data);
          setTrnTypeData(res.data);
    })
  }, [""]);


  useEffect(() => {
      const listcall = setInterval(() => {
         axiosCall("POST",API.FETCHTRNTYPELIST,[{}]).then(res => {
          //console.log("sdt",res.data);
          setTrnTypeData(res.data);
         })
        },  3600000);
        return ()=>{
          clearInterval(listcall)  //whenever the component removes it will executes
        }
      }, []);

  //console.log("trbn:",trnTypeData)

  return(
    trnTypeData
  )
  };

const TrnTypeList = ((trnTypeData) => {
    const [trnTypeValue, setTrnTypeValue] = useState([{}]);
    if(trnTypeData.length>0){
        setTrnTypeValue(trnTypeData)
    }
    return(
        trnTypeValue
      )
});

export default TrnType;
export {TrnTypeList};
