import axios from "axios";


axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const apicall = async () => {
    axios.get('/user/12345')
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
      //@ts-ignore

    let result = await axios("https://data.cotrip.org/api/v1/incidents?apiKey=E05N15S-Q754ZG9-HFGKVHR-HJCASDJ", {crossdomain: true});
    return result;
};

export default apicall;