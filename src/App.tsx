import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

import Header from '#shared/components/Header';
import { AppProvider } from '#shared/hooks';

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <AppProvider>
          <Header />
        </AppProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
