const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json()); // for parsing application/json

app.get('/covid', (req, res) => {
  axios
    .get(
      'https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.json',
    )
    .then((data) => res.send(data.data));

  //   res.send(todos);
});

app.listen('7000', () => {
  console.log('Server is listening on http://localhost:7000');
});
