import axios from "axios";


axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';
const apicall = async () => {
    axios("https://data.cotrip.org/api/v1/incidents?apiKey=E05N15S-Q754ZG9-HFGKVHR-HJCASDJ",
      {
      headers: {
        "apiKey": "E05N15S-Q754ZG9-HFGKVHR-HJCASDJ",
        "Access-Control-Allow-Origin": "*"
      }
      }
    )
  .then(function (response) {
    console.log(response.data);
    console.log(response.status);
    console.log(response.statusText);
    console.log(response.headers);
    console.log(response.config);
  });
      //@ts-ignore

    // let result = await axios("https://data.cotrip.org/api/v1/incidents?apiKey=E05N15S-Q754ZG9-HFGKVHR-HJCASDJ", {crossdomain: true});
    // return result;
};

export default apicall;