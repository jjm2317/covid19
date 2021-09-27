import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import Board from './Board';
import getISO2 from 'country-iso-3-to-2';
// import flags from '../asset/flags/png';
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return images;
}
const images = importAll(
  require.context('../asset/flags/png', false, /\.(png|jpe?g|svg)$/),
);

const Wrapper = styled.div`
  margin-top: 15px;
  padding: 0 5%;
  font-family: NanumSquare;
`;

const Header = styled.header`
  height: 80px;
  border-radius: 40px;
  background-color: #1a4556;
  padding: 20px 30px;
  position: relative;
  z-index: 1;
`;

const Flag = styled.div`
  background-image: url('${({ countryName }) =>
    images[`${countryName}.png`]?.default}');
  background-repeat: no-repeat;
  background-size: contain;
  height: 20px;
  width: 20px;
  padding-left: 30px;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 800;

  color: #fff;
`;

const UpdateDate = styled.div`
  color: #fff;
  font-size: 12px;
  font-weight: 700;
  margin: 15px 0 0 15px;
`;

const CloseButton = styled.div`
    width: 15px;
    height: 15px;
    position: absolute;
    top: 50%;
    right: 5%;
  transform: translateY( -50%);
  &:after {
      content: '';
      height: 15px;
      border-left: 2px solid #bbb;
      position: absolute;
      transform: rotate(45deg);
      left: 5px;
  }

  &:before {
      content: '';
      height: 15px;
      border-left: 2px solid #bbb;
      position: absolute;
      transform: rotate(-45deg);
      left: 5px;
  }
}
`;

const Main = ({ countryCode, setCountryCode }) => {
  const [covidData, setCovidData] = useState(null);
  const [restriction, setRestriction] = useState(null);
  console.log('covid', covidData);
  useEffect(() => {
    axios.get(`/covid/${countryCode}`).then((res) => setCovidData(res.data));
    axios
      .get(`/covid/restriction/${getISO2(countryCode)}`)
      .then((res) => setRestriction(res.data || []))
      .catch((e) => {
        setRestriction([]);
      });
  }, [countryCode]);

  if (!covidData || !restriction) return null;
  const updateDateSplit = new Date(
    covidData.data[covidData.data.length - 1].date,
  )
    .toDateString()
    .split(' ');
  return (
    <Wrapper>
      <Header>
        <Flag countryName={covidData.location.toLowerCase()}>
          {covidData.location}
        </Flag>
        <UpdateDate>
          Updated :
          {` ${updateDateSplit[2]} ${updateDateSplit[1].toUpperCase()} ${
            updateDateSplit[3]
          }`}
        </UpdateDate>
        <CloseButton onClick={() => setCountryCode(null)} />
      </Header>
      <Board covidData={covidData} restriction={restriction} />
    </Wrapper>
  );
};

export default Main;
