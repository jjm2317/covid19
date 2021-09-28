import styled from 'styled-components';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Covid from '../asset/background/3670269.jpg';
import Location from '../asset/location.png';
import TooltipButton from '../asset/tooltipbutton.png';
import { useState } from 'react';
const HeaderWrapper = styled.header`
  display: flex;
  flex-direction: column;
  min-height: 350px;
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
  position: relative;
  /* height: 300px; */
  /* flex-basis: 150px; */
  flex-shrink: 0;
  padding: 0 3%;
  z-index: 99;
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

export const Tooltip = styled.div`
  text-align: center;
  position: absolute;
  width: 95%;
  height: 350px;
  left: 2.5%;
  top: 15px;
  color: #fff;
  padding: 30px 20px 0;
  line-height: 1.1;
  border-radius: 30px;
  box-shadow: 0 0 10px #333;
  background: #a6a6a6;
  border-radius: 30px;
  z-index: 10;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 70%;
    width: 0;
    height: 0;
    border: 29px solid transparent;
    border-bottom-color: #a6a6a6;
    z-index: 9;
    border-top: 0;
    border-right: 0;
    margin-left: 39.5px;
    margin-top: -29px;
  }
`;

const Header = ({ locations, setCountryCode }) => {
  const [isTooltipShown, setIsTooltipShown] = useState(false);
  const handleOnSearch = (string, results) => {
    // onSearch will have as the first callback parameter
    // the string searched and for the second the results.
  };

  const handleOnHover = (result) => {
    // the item hovered
    // console.log(result);
  };

  const handleOnSelect = (item) => {
    // the item selected
    console.log(item);
    setCountryCode(item.countryCode);
  };

  const handleOnFocus = () => {
    console.log('Focused');
  };

  const formatResult = (item) => {
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
        <img
          src={TooltipButton}
          width={15}
          height={15}
          style={{ position: 'absolute', top: '-25px', right: '25px' }}
          onClick={() => setIsTooltipShown((prev) => !prev)}
        />
        {isTooltipShown && (
          <Tooltip>
            The information on this website is compiled by a dedicated team of
            researchers who liaise with immigration authorities, government
            departments and health agencies worldwide in order to ensure the
            information presented here is verified and correct at the time of
            publication.* However, COVICO cannot guarantee this information is
            accurate as the ongoing COVID-19 pandemic means that travel
            regulations are subject to rapid change. By clicking on Start, you
            agree to the Privacy Policy and Terms and Conditions. <br />
            If you would like to know more about the terms and conditions,
            should you email 1909355@buckingham.ac.uk
            <br />
            <br />{' '}
            <span
              style={{ fontWeight: 700 }}
              onClick={() => setIsTooltipShown(false)}
            >
              Click to Close
            </span>
          </Tooltip>
        )}
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
            borderRadius: '10px',
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
