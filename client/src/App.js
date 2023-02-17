import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import { themeSettings } from './theme';
import Layout from './scenes/layout/Layout';
import Dashboard from './scenes/dashboard/Dashboard';

function App() {
  const mode = useSelector(state => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={<Navigate to="/dashboard" />}
                replace
              ></Route>
              <Route path="/dashboard" element={<Dashboard />} replace></Route>
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
