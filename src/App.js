import axios from 'axios';

import { useState, useEffect } from 'react';

import styled, { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import Header from './components/Header';
import Main from './components/Main';

const GlobalStyles = createGlobalStyle` 
${reset}; 
*,
*::before,
*::after {
  box-sizing: border-box;
}
`;

const Wrapper = styled.main`
  /* background-color: #f7f1e7; */
  min-height: 100vh;
  max-width: 400px;
  font-family: Ubuntu;
  margin: 0 auto;
`;

const App = () => {
  const [countries, setCountires] = useState(null);
  const [countryCode, setCountryCode] = useState(null);
  console.log(countryCode);

  useEffect(() => {
    axios.get('/countries').then((data) => setCountires(data.data));
  }, []);
  if (!countries) return 'loading';
  return (
    <Wrapper>
      <GlobalStyles />
      <Header locations={countries} setCountryCode={setCountryCode} />
      {countryCode && (
        <Main countryCode={countryCode} setCountryCode={setCountryCode} />
      )}
    </Wrapper>
  );
};

export default App;
