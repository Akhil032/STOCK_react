export const exceltoJsdate = (date) => {
  let converted_date = new Date(Math.round((date - 25569) * 864e5));
  converted_date = String(converted_date).slice(4, 15)
  date = converted_date.split(" ")
  let day = date[1];
  let month = date[0];
  month = "JanFebMarAprMayJunJulAugSepOctNovDec".indexOf(month) / 3 + 1
  if (month.toString().length <= 1)
      month = '0' + month
  let year = date[2];
  return String(year.slice(0, 4) + '-' + month + '-' + day)
}