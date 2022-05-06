import axios from "axios";

const apicall = () => {
    let result = axios("https://data.cotrip.org/api/v1/incidents?apiKey=E05N15S-Q754ZG9-HFGKVHR-HJCASDJ");
    return result;
};

export default apicall;