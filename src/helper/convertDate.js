import moment from 'moment';

// Convert the date number to a JavaScript Date object
const convertDateNumberToDate = (dateNumber) => {
    // Check if the dateNumber is a valid number
    if (isNaN(dateNumber) || dateNumber < 1) {
        return null; // or you can return a specific invalid date representation
    }
    const baseDate = new Date(1900, 0, 1);
    const convertedDate = new Date(baseDate.getTime() + (dateNumber - 1) * 24 * 60 * 60 * 1000);
    return convertedDate;
};

export default convertDateNumberToDate;


export const convertDateNumberToDateUTC = (dateInput) => {
    // Parse the date input using moment and check if it is valid
    if (!moment(dateInput).isValid()) {
        return null; // Handle invalid date format
    }

    // Format the date to 'DD/MMM/YYYY'
    return moment.utc(dateInput).format('DD/MMM/YYYY');
};

export const  convertToISO = (dateString) =>{
    // Parse the date string using moment.js (MM/DD/YYYY)
    const date = moment(dateString, 'MM/DD/YYYY');
  
    // Ensure the full year is used (e.g., 2026 instead of 26)
    const isoDateString = date.format('YYYY-MM-DD');
  
    // Get the current time (hour, minute, second) to make it dynamic
    const now = moment();
    const time = now.format('HH:mm:ss');
  
    // Construct the full ISO string with dynamic time (using the current time)
    const dynamicISOString = `${isoDateString}T${time}.000Z`;
  
    return dynamicISOString;
  }
  
  
  

