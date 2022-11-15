const API_HOST = '/api';
export const Building_HOST = API_HOST+"/buildings";
export const Room_HOST = API_HOST+"/rooms";
export const Window_HOST = API_HOST+"/windows";
export const Heater_HOST = API_HOST+"/heaters";
export const API_Header = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Authorization': 'Basic ' + btoa('Admin:adminpwd'),
    'Content-Type': 'application/json'
  }