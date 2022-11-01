import { Line, LineChart } from 'recharts';
import * as React from 'react';

import { ChartDataItem } from '../models';

interface GraphProps {
  data: ChartDataItem[];
}

const Graph = ({ data }: GraphProps) => {
  return (
    <LineChart width={400} height={400} data={data}>
      <Line type="monotone" dataKey="views" stroke="#000000" />
    </LineChart>
  );
};

export default Graph;
