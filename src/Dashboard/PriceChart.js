import React from 'react';
import HighchartsConfig from './HighchartsConfig';
import { AppContext } from '../App/AppProvider';
import ReactHighCharts from 'react-highcharts';
// import { theme } from './HighchartsTheme';
import styled from 'styled-components';
import ChartSelect from './ChartSelect';
// ReactHighCharts.Highcharts.setOptions(theme);

const ChartBox = styled.div`
  height: 530px;
  background: white;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

export default function() {
  return (
    <AppContext.Consumer>
      {({ historical, changeChartSelect }) => (
        <ChartBox>
          <ChartSelect
            defaultValue="months"
            onChange={e => changeChartSelect(e.target.value)}
          >
            <option value="days">Days</option>
            <option value="weeks">Weeks</option>
            <option value="months">Months</option>
          </ChartSelect>
          {historical ? (
            <ReactHighCharts config={HighchartsConfig(historical)} />
          ) : (
            <div>Loading...</div>
          )}
        </ChartBox>
      )}
    </AppContext.Consumer>
  );
}
