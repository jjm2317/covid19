const schedule = require('node-schedule');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json

let covidData = null;

let countries = null;

schedule.scheduleJob('*/30 * * * *', () => {
  console.log('fetching...');
  fetchData();
});
const fetchData = () => {
  axios
    .get(
      'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json',
    )
    .then((data) => {
      covidData = data.data;
      countries = Object.keys(data.data).map((key, i) => ({
        id: i,
        country: data.data[key].location,
        countryCode: key,
      }));
    });
};
fetchData();

app.get('/countries', (req, res) => {
  res.send(countries);
});

app.get('/covid/:countryCode', (req, res) => {
  const { countryCode } = req.params;
  res.send(covidData[countryCode]);
});

app.get(`/covid/restriction/:countryCode`, (req, res) => {
  const { countryCode } = req.params;
  axios
    .get(
      `http://apis.data.go.kr/1262000/CountryOverseasArrivalsService/getCountryOverseasArrivalsList`,
      {
        params: {
          serviceKey:
            'hzXdKzz625I/7XDwW7b/k4+nJZix8uBLyjDuC37Rha62TnR2u2MelELZTi9uig5CHI1QDP9xvzq113JBDE7xlw==',
          returnType: 'JSON',
          'cond[country_iso_alp2::EQ]': countryCode,
        },
      },
    )
    .then((response) => {
      console.log(response);
      res.send(response.data.data);
    });
});

app.listen('7000', () => {
  console.log('Server is listening on http://localhost:7000');
});
