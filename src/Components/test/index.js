import React,{useState} from "react";
import Select from 'react-select';

function ErrorProcessing()
{

    var Countryname=[
        {
            value:1,
            label:"ak"

        },
        {
            value:2,
            label:"react"
            
        },
        {
            value:3,
            label:"dom"
            
        },
        {
            value:4,
            label:"screen"
            
        }
    ]
    var [Displayvalue,getvalue]=useState();
    var Ddlhandle=(e) =>
    {
        getvalue(Array.isArray(e)?e.map(x=>x.label):[]);
    }
    return(
            <div><center>
                <select isMulti options={Countryname} onChange={Ddlhandle}></select></center>
                <center>
        <b></b><h3>{Displayvalue}</h3>
                </center>
            </div>)
}export default ErrorProcessing;