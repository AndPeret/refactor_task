import { Button, Box, Container, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { startOfToday, startOfYesterday, sub } from "date-fns";
import * as React from "react";

import { ChartDataItem } from '../models';

import Graph from './graph';

const ChartWrapper = styled(Container)(() => ({
  height: '100vh',
  paddingTop: '10vh'
}));

const TotalViews = styled(Typography)(() => ({
  color: '#BCC5CC',
  fontWeight: 'bold',
}))

const ViewsNumber = styled('span')(() => ({
  color: '#000000',
  fontWeight: 'bold',
})) 

const PeriodButton = styled(Button)(({ active }: { active: boolean }) => ({
  color: active ? '#FFFFFF' : '#000000',
  fontWeight: 'bold',
  backgroundColor: active ? '#000000' : 'transparent',
  borderRadius: 12,
  marginRight: 20,
  '&:hover': {
    backgroundColor: '#EEEEEE',
    color: '#000000'
  }
}))
​
interface ChartProps {
  data: ChartDataItem[];
  changePeriod: (startDate: Date | null) => void;
}
​
const Chart = ({ data, changePeriod }: ChartProps) => {
  const [is1D, set1D] = React.useState<boolean>(false);
  const [is1W, set1W] = React.useState<boolean>(false);
  const [is1M, set1M] = React.useState<boolean>(false);
  const [is1Y, set1Y] = React.useState<boolean>(false);
  const [isAll, setAll] = React.useState<boolean>(true);
​
  const today = startOfToday();
​
  const on1DClick = () => {
    changePeriod(startOfYesterday());
    set1D(true);
    set1W(false);
    set1M(false);
    set1Y(false);
    setAll(false);
  };
​
  const on1WClick = () => {
    const weekAgo = sub(today, { weeks: 1 });
    changePeriod(weekAgo);
    set1D(false);
    set1W(true);
    set1M(false);
    set1Y(false);
    setAll(false);
  };
​
  const on1MClick = () => {
    const monthAgo = sub(today, { months: 1 });
    changePeriod(monthAgo);
    set1D(false);
    set1W(false);
    set1M(true);
    set1Y(false);
    setAll(false);
  };
​
  const on1YClick = () => {
    const yearAgo = sub(today, { years: 1 });
    changePeriod(yearAgo);
    set1D(false);
    set1W(false);
    set1M(false);
    set1Y(true);
    setAll(false);
  };
​
  const onAllClick = () => {
    changePeriod(null);
    set1D(false);
    set1W(false);
    set1M(false);
    set1Y(false);
    setAll(true);
  };
​
  const totalViews = data.reduce((acc, datum) => acc += datum.views, 0);
​
  return (
    <ChartWrapper>
      <TotalViews>
        <ViewsNumber>{totalViews}</ViewsNumber> page views
      </TotalViews>
      <Graph data={data} />
      <Box>
        <PeriodButton active={is1D} onClick={on1DClick}>
          1D
        </PeriodButton>
        <PeriodButton active={is1W} onClick={on1WClick}>
          1W
        </PeriodButton>
        <PeriodButton active={is1M} onClick={on1MClick}>
          1M
        </PeriodButton>
        <PeriodButton active={is1Y} onClick={on1YClick}>
          1Y
        </PeriodButton>
        <PeriodButton active={isAll} onClick={onAllClick}>
          ALL
        </PeriodButton>
      </Box>
    </ChartWrapper>
  );
};
​
export default Chart;
