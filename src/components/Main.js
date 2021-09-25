import axios from 'axios';
import { useEffect, useState } from 'react';

const Main = ({ countryCode }) => {
  const [covidData, setCovidData] = useState(null);
  console.log(covidData);
  useEffect(() => {
    axios.get(`/covid/${countryCode}`).then((res) => setCovidData(res.data));
  }, []);
  return <div></div>;
};

export default Main;
