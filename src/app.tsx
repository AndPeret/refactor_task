import ThemeProvider from '@mui/material/styles/ThemeProvider';
import * as React from 'react';

import DataVizualizer from './modules/data-visualizer/components/data-visualizer';
import theme from './theme';

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <DataVizualizer />
    </ThemeProvider>
  );
};

export default App;
