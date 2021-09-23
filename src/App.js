import axios from 'axios';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Home from './page/home/Home';
import Covid from '../src/asset/background/3670269.jpg';

const Wrapper = styled.div`
  background-color: #f7f1e7;
  height: 100vh;
`;

const Header = styled.header`
  display: flex;
  flex-direction: column;
  height: 40vh;
`;

const Logo = styled.h1`
  flex-basis: 50px;
  flex-shrink: 1;
  padding: 5%;
`;

const LogoImg = styled.img`
  max-width: 100%;
  max-height: 100%;
`;

const Search = styled.input`
  height: 300px;
  flex-basis: 150px;
  flex-shrink: 0;
`;

const App = () => {
  axios.get('/covid').then((data) => console.log(data.data));
  return (
    <Wrapper>
      <Header>
        <Logo>
          <LogoImg src={Covid} />
        </Logo>
        <Search />
      </Header>
      <Route path="/" component={Home} />;
    </Wrapper>
  );
};

export default App;
