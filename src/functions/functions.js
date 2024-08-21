
//Function to convert values with comma's
export const convertMillion = (number) =>{
  const f = new Intl.NumberFormat("en-us")
  const output = f.format(number?.toFixed())
   return output;
}

//Function to convert time stamp to UTC
export function timestampToUTC(timestamp) {
  try {
      // Convert timestamp to milliseconds
      var milliseconds = timestamp * 1000;
      // Create a new Date object with the milliseconds
      var date = new Date(milliseconds);
      // Get the UTC components
      var utcYear = date.getUTCFullYear();
      var utcMonth = date.getUTCMonth() + 1; // Add 1 because getUTCMonth() returns zero-based month
      var utcDay = date.getUTCDate();
      var utcHours = date.getUTCHours();
      var utcMinutes = date.getUTCMinutes();
      var utcSeconds = date.getUTCSeconds();
      
      //Format the UTC components as a string
      var utcTimeStr = utcYear + '-' + (utcMonth) + '-' + (utcDay) + ' ' +
                       (utcHours) + ':' + (utcMinutes) + ':' + (utcSeconds) + ' UTC';
      return utcTimeStr;
  } catch(error) {
      return "Error:" + error.message;
  }
}

