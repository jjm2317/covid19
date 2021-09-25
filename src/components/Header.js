import styled from 'styled-components';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Covid from '../asset/background/3670269.jpg';
import Location from '../asset/location.png';
const HeaderWrapper = styled.header`
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

const SearchWrapper = styled.div`
  height: 300px;
  flex-basis: 150px;
  flex-shrink: 0;
  padding: 0 3%;

  & .wrapper {
    background-color: unset;
  }

  & > div > div > div:nth-child(1) {
    background-color: #fff;
    &:hover {
      box-shadow: rgba(32, 33, 36, 0.28) 0px 1px 6px 0px;
    }
    border: 1px solid #dfe1e5;
  }
  & > div > div > div:nth-child(2) {
    border: 1px solid #dfe1e5;
    box-shadow: rgba(32, 33, 36, 0.28) 0px 1px 6px 0px;
    margin-top: 10px;

    background-color: #fff;
    max-height: 250px;
    overflow-y: scroll;
    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-thumb {
      background: #eea069;
      border-radius: 5px;
    }
    ::-webkit-scrollbar-track {
      border-radius: 10px;
    }
  }
`;
const Header = ({ locations, setCountryCode }) => {
  console.log(locations);
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
    console.log(string, results);
  };

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    setCountryCode(item.countryCode);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => {
    console.log(item, 'res');
    return (
      <div
        style={{
          display: 'flex',
          // height: '100%',
          alignItems: 'center',
          // '&:hover': { backgroundColor: '#eea069' },
          // cursor: 'pointer',
        }}
      >
        <img src={Location} width={35} height={35} />
        <span style={{ color: '#000' }}>{item}</span>
      </div>
    );
    // return (<p dangerouslySetInnerHTML={{__html: '<strong>'+item+'</strong>'}}></p>); //To format result as html
  };
  return (
    <HeaderWrapper>
      <Logo>
        <LogoImg src={Covid} />
      </Logo>
      <SearchWrapper>
        <ReactSearchAutocomplete
          items={locations}
          onSearch={handleOnSearch}
          onHover={handleOnHover}
          onSelect={handleOnSelect}
          onFocus={handleOnFocus}
          autoFocus
          formatResult={formatResult}
          styling={{
            height: '60px',
            // border: '1px solid #dfe1e5',
            border: 'none',
            borderRadius: '5px',
            backgroundColor: 'white',
            // boxShadow: 'rgba(32, 33, 36, 0.28) 0px 1px 6px 0px',
            boxShadow: 'none',
            hoverBackgroundColor: '#eee',
            color: '#8DCBB7',
            fontSize: '22px',
            fontFamily: 'Arial',
            iconColor: '#8DCBB7',
            lineColor: 'rgb(232, 234, 237)',
            placeholderColor: 'grey',
            clearIconMargin: '3px 14px 0 0',
            searchIconMargin: '0 0 0 16px',
          }}
          fuseOptions={{ threshold: 0, keys: ['country'] }}
          resultStringKeyName="country"
          showIcon={false}
          maxResults={30}
        />
      </SearchWrapper>
    </HeaderWrapper>
  );
};

export default Header;
