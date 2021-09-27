import styled, { css } from 'styled-components';
import Cases from '../asset/Cases.png';
import Vaccination from '../asset/Vaccination.png';
import Death from '../asset/Death.png';
import Isolation from '../asset/Isolation.png';
import Prohibition from '../asset/Prohibition.png';
import Travel from '../asset/Travel.png';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useState } from 'react';

const headingStyle = css`
  font-size: 18px;
  color: #1a4556;
  font-weight: 700;
`;

const descStyle = css`
  font-size: 10px;
  color: #555;
`;

const Wrapper = styled.section`
  margin-top: -40px;
  min-height: 600px;
  border: 2px solid #1a4556;
  border-radius: 20px;
  background-color: #fff;
  padding: 0 5%;
`;

const DailyList = styled.ul`
  display: flex;
  flex-direction: row;
  height: 170px;
  justify-content: space-around;
  align-items: center;
`;

const DashedLine = styled.div`
  border: none;
  border-top: 1px dashed #ccc;
  color: #fff;
  background-color: #fff;
  height: 1px;

  margin-top: 25px;
  margin-bottom: 18px;
`;

const RestrictionStatus = {
  OPENED: 'Opened Border Crossing',
  LIMETED: 'Limited Border Crossing',
  PROHIBITED: 'Prohibited Border Crossing',
};

const Board = ({ covidData, restriction }) => {
  const newestData = covidData.data[covidData.data.length - 1];
  // console.log(newestData);

  console.log(restriction);
  const resolveStatus = (txt) => {
    let result = RestrictionStatus.OPENED;
    if (txt.includes('중지') || txt.includes('금지')) {
      result = RestrictionStatus.PROHIBITED;
      if (txt.includes('가능') || txt.includes('허용'))
        result = RestrictionStatus.LIMETED;
    }
    return result;
  };
  return (
    <Wrapper>
      <DailyList>
        {[
          {
            type: 'case',
            imgSrc: Cases,
            perDay: newestData.new_cases,
            description: 'Cases per day',
          },
          {
            type: 'vaccination',
            imgSrc: Vaccination,
            perDay: newestData.new_vaccinations,
            description: 'Vaccination per day',
          },
          {
            type: 'death',
            imgSrc: Death,
            perDay: newestData.new_deaths,
            description: 'Death per day',
          },
        ].map(({ type, imgSrc, perDay, description }) => {
          return (
            <DailyFigure
              key={type}
              type={type}
              imgSrc={imgSrc}
              perDay={perDay}
              description={description}
            />
          );
        })}
      </DailyList>
      <Details
        type="chart"
        description="COVID-19 Details"
        covidDataArray={covidData.data}
      />
      <DashedLine />
      <Limited
        restrictionStatus={
          restriction[0]?.txt_origin_cn
            ? resolveStatus(restriction[0].txt_origin_cn)
            : RestrictionStatus.LIMETED
        }
        restriction={restriction}
      />
      <Details
        type="text"
        description="Restrictions Details"
        restrictionStatus={
          restriction[0].txt_origin_cn
            ? resolveStatus(restriction[0].txt_origin_cn)
            : RestrictionStatus.LIMETED
        }
        restriction={restriction}
      />
    </Wrapper>
  );
};

const FigureWrapper = styled.li`
  width: 80px;
  height: 50px;
  text-align: center;
`;

const Change = styled.span`
  display: block;
  ${headingStyle}
  margin-top: 5px;
`;

const Description = styled.span`
  display: block;
  ${descStyle}
  white-space: nowrap;
  text-align: center;
`;

const DailyFigure = ({ type, imgSrc, perDay, description }) => {
  return (
    <FigureWrapper>
      <img src={imgSrc} width={40} height={40} alt={type} />
      <Change>{perDay || '-'}</Change>
      <Description>{description}</Description>
    </FigureWrapper>
  );
};

const DetailWrapper = styled.div`
  padding-left: 5px;
  min-height: 65px;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 18px 0 0 7px;
`;
const HeadingWrapper = styled.div`
  width: 95%;
  height: 30px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
`;
const DetailHeading = styled.h2`
  ${headingStyle}
  align-self: center;
`;
const DownArrow = styled.a`
  /* display: block; */
  border: solid black;
  border-width: 0 1.5px 1.5px 0;
  display: inline-block;
  height: 0;
  padding: 4px;
  transform: rotate(45deg);
  align-self: center;
  /* -webkit-transform: rotate(45deg); */
`;

const UnderLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: #1a4556;
`;

const ChartHeading = styled.h3`
  margin-top: 20px;
  ${headingStyle}
  color: #000;
`;

const ChartSubtext = styled.span`
  ${descStyle}
  display:block;
  margin: 10px 0 20px;
`;

const Details = ({ type, description, covidDataArray, restriction }) => {
  const [isShown, setIsShown] = useState(false);
  const handleClick = () => {
    setIsShown((prev) => !prev);
  };
  return (
    <DetailWrapper>
      <HeadingWrapper>
        <DetailHeading>{description}</DetailHeading>
        <DownArrow onClick={handleClick} />
        <UnderLine />
      </HeadingWrapper>

      {isShown &&
        type === 'chart' &&
        [
          {
            chartName: 'Cases',
            dataKey: 'new_cases_per_million',
            description:
              'Daily new confirmed COVID-19 cases per million people',
          },
          {
            chartName: 'Vaccination',
            dataKey: 'people_vaccinated_per_hundred',
            description:
              'Share of people who received at least one dose of COVID-19 vaccine',
          },
          {
            chartName: 'Deaths',
            dataKey: 'new_deaths_per_million',
            description:
              'Daily new confirmed COVID-19 deaths per million people',
          },
        ].map(({ chartName, dataKey, description }) => (
          <>
            <ChartHeading>{chartName}</ChartHeading>
            <ChartSubtext>{description}</ChartSubtext>
            <LineChart
              width={300}
              height={250}
              data={covidDataArray}
              margin={{ top: 5, right: 20, left: -30, bottom: 5 }}
            >
              {/* <CartesianGrid strokeDasharray=" 3" /> */}
              <XAxis
                dataKey="date"
                tickFormatter={(tick) => {
                  const split = new Date(tick).toDateString().split(' ');

                  return ` ${split[1].toUpperCase()} ${split[2]}, ${split[3]}`;
                }}
                tick={{ fontSize: 7 }}
              />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line
                type="basic"
                dataKey={dataKey}
                stroke="#C7467F"
                strokeWidth={1}
                dot={false}
              />
            </LineChart>
          </>
        ))}

      {isShown && type === 'text' && (
        <div
          dangerouslySetInnerHTML={{ __html: restriction[0]?.html_origin_cn }}
        />
      )}
    </DetailWrapper>
  );
};

const LimitedWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 15px;
`;

const LimitedHeading = styled.h2`
  margin: 7px 0;
  ${headingStyle}
`;

const CheckText = styled.span`
  ${descStyle}
`;

const Limited = ({ restrictionStatus, restriction }) => {
  return (
    <LimitedWrapper>
      <img
        src={
          restrictionStatus === RestrictionStatus.LIMETED
            ? Isolation
            : restrictionStatus === RestrictionStatus.OPENED
            ? Travel
            : Prohibition
        }
        width={40}
        height={40}
        alt="restriction"
      />
      <LimitedHeading>{restrictionStatus}</LimitedHeading>
      <CheckText>Please check your details</CheckText>
      <p style={{ fontWeight: 600, textAlign: 'center', marginTop: '7px' }}>
        {restriction[0]?.txt_origin_cn.split('*')[0]}
      </p>
    </LimitedWrapper>
  );
};

export default Board;
