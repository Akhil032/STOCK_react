import { stageHeaders } from "../Constants/headers";
import { exceltoJsdate } from "./exceltojsdate";

export const formattedExcelData = (data) => {  
const updateDate = (array, index, newValue) => {
  array[index] = newValue;
}
  const excelData = [...data];
  excelData.shift();
  const mappedData = excelData.map((value, i) => {
    updateDate(value, 3, exceltoJsdate(value[3]));
    
    return stageHeaders.reduce((previousValue, currentValue, index) => {
      return {
        ...previousValue,
        [currentValue]: value[index] != "NULL" ? value[index] : "",
      };
    }, {});
  });
  return mappedData;
};
